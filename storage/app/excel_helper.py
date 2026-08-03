import sys
import os
import pandas as pd
import json
import re
from datetime import datetime

def clean_string(val):
    if pd.isna(val):
        return ""
    val_str = str(val).strip()
    val_str = re.sub(r'^_+', '', val_str)
    if val_str.endswith(".0"):
        val_str = val_str[:-2]
    return val_str

def parse_date(date_val):
    if pd.isna(date_val):
        return None
    date_str = str(date_val).strip()
    for fmt in ("%d/%m/%Y", "%Y-%m-%d %H:%M:%S", "%Y-%m-%d"):
        try:
            return datetime.strptime(date_str, fmt).strftime("%Y-%m-%d")
        except ValueError:
            continue
    return None

def map_gender(val):
    if pd.isna(val):
        return "L"
    val_str = str(val).strip().upper()
    if "PEREMPUAN" in val_str or val_str == "P":
        return "P"
    return "L"

def map_status(val):
    if pd.isna(val):
        return "belum_kawin"
    val_str = str(val).strip().lower()
    if "belum" in val_str:
        return "belum_kawin"
    elif "cerai hidup" in val_str:
        return "cerai_hidup"
    elif "cerai mati" in val_str:
        return "cerai_mati"
    elif "janda" in val_str or "duda" in val_str:
        return "janda_duda"
    elif "kawin" in val_str:
        return "kawin"
    return "belum_kawin"

def map_blood(val):
    if pd.isna(val):
        return "-"
    val_str = str(val).strip().upper()
    if val_str in ("A", "B", "AB", "O", "-"):
        return val_str
    return "-"

def run_import(input_file, output_file):
    try:
        # Load sheets
        df = pd.read_excel(input_file, sheet_name=0)
        
        # Normalize column names to lowercase/no space for easy mapping
        df.columns = [str(c).strip().lower().replace(" ", "").replace("_", "") for c in df.columns]
        
        # Helper to find column name
        def get_col_value(row, aliases):
            for alias in aliases:
                if alias in df.columns:
                    return row[alias]
            return None

        records = []
        for idx, row in df.iterrows():
            rw = clean_string(get_col_value(row, ["rw"]))
            rt = clean_string(get_col_value(row, ["rt"]))
            dusun = clean_string(get_col_value(row, ["dusun"]))
            alamat = clean_string(get_col_value(row, ["alamat"]))
            no_kk = clean_string(get_col_value(row, ["kodekeluarga", "nokk", "kk"]))
            nama_kepala = clean_string(get_col_value(row, ["namakepalakeluarga", "kepalakeluarga"]))
            nik = clean_string(get_col_value(row, ["nik"]))
            nama = clean_string(get_col_value(row, ["namaanggotakeluarga", "nama"]))
            jk = map_gender(get_col_value(row, ["jeniskelamin", "jk"]))
            hubungan = clean_string(get_col_value(row, ["hubungan", "hubfamilial"]))
            tempat_lahir = clean_string(get_col_value(row, ["tempatlahir"]))
            tanggal_lahir = parse_date(get_col_value(row, ["tanggallahir"]))
            status = map_status(get_col_value(row, ["status", "statusperkawinan"]))
            agama = clean_string(get_col_value(row, ["agama"]))
            gol_darah = map_blood(get_col_value(row, ["gdarah", "golongandarah"]))
            kewarganegaraan = clean_string(get_col_value(row, ["kewarganegaraan"]))
            suku = clean_string(get_col_value(row, ["etnis/suku", "ethnissuku", "suku", "etnis"]))
            pendidikan = clean_string(get_col_value(row, ["pendidikan"]))
            pekerjaan = clean_string(get_col_value(row, ["pekerjaan"]))
            
            if not nik or not nama:
                continue
                
            records.append({
                "rw": rw.zfill(3) if rw.isdigit() else (rw or "000"),
                "rt": rt.zfill(3) if rt.isdigit() else (rt or "000"),
                "dusun": dusun or "JEPPARA",
                "alamat": alamat or "-",
                "no_kk": no_kk,
                "nama_kepala": nama_kepala,
                "nik": nik,
                "nama": nama,
                "jenis_kelamin": jk,
                "hubungan": hubungan or "Anggota Keluarga",
                "tempat_lahir": tempat_lahir or "-",
                "tanggal_lahir": tanggal_lahir or "1970-01-01",
                "status_perkawinan": status,
                "agama": agama or "Islam",
                "golongan_darah": gol_darah,
                "kewarganegaraan": kewarganegaraan or "WNI",
                "suku": suku or "-",
                "pendidikan": pendidikan or "-",
                "pekerjaan": pekerjaan or "-"
            })
            
        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(records, f, ensure_ascii=False, indent=2)
        print("SUCCESS")
        
    except Exception as e:
        import traceback
        print("ERROR:", str(e))
        print(traceback.format_exc())
        sys.exit(1)

def run_export(input_file, output_file):
    try:
        with open(input_file, "r", encoding="utf-8") as f:
            data = json.load(f)
            
        df = pd.DataFrame(data)
        
        # Rename columns to friendly indonesian titles
        column_mapping = {
            "rw": "RW",
            "rt": "RT",
            "dusun_nama": "Dusun",
            "alamat": "Alamat",
            "no_kk": "Kode Keluarga",
            "nama_kepala": "Nama Kepala Keluarga",
            "nik": "NIK",
            "nama": "Nama Anggota Keluarga",
            "jenis_kelamin": "Jenis Kelamin",
            "hubungan": "Hubungan",
            "tempat_lahir": "Tempat Lahir",
            "tanggal_lahir": "Tanggal Lahir",
            "status_perkawinan": "Status",
            "agama": "Agama",
            "golongan_darah": "GDarah",
            "kewarganegaraan": "Kewarganegaraan",
            "suku": "Etnis / Suku",
            "pendidikan": "Pendidikan",
            "pekerjaan": "Pekerjaan"
        }
        
        # Ensure only columns in mapping are exported and in correct order
        available_cols = [c for c in column_mapping.keys() if c in df.columns]
        df = df[available_cols]
        df = df.rename(columns=column_mapping)
        
        # Convert date to standard indonesian format for convenience
        if "Tanggal Lahir" in df.columns:
            def format_date_cell(val):
                if pd.isna(val) or not val:
                    return ""
                try:
                    # Input is yyyy-mm-dd (sometimes has T00:00:00.000000Z or similar)
                    clean_date = str(val).split("T")[0].split(" ")[0]
                    dt = datetime.strptime(clean_date, "%Y-%m-%d")
                    return dt.strftime("%d/%m/%Y")
                except:
                    return str(val)
            df["Tanggal Lahir"] = df["Tanggal Lahir"].apply(format_date_cell)
            
        # Clean Jenis Kelamin
        if "Jenis Kelamin" in df.columns:
            df["Jenis Kelamin"] = df["Jenis Kelamin"].map(lambda x: "LAKI-LAKI" if str(x).upper() == "L" else ("PEREMPUAN" if str(x).upper() == "P" else x))
            
        # Clean Status Perkawinan
        if "Status" in df.columns:
            status_map = {
                "belum_kawin": "Belum Kawin",
                "kawin": "Kawin",
                "cerai_hidup": "Cerai Hidup",
                "cerai_mati": "Cerai Mati",
                "janda_duda": "Janda / Duda"
            }
            df["Status"] = df["Status"].map(lambda x: status_map.get(str(x).lower(), str(x).title()))
            
        # Prefix NIK and Kode Keluarga with single quote or space to prevent excel formatting as float
        if "NIK" in df.columns:
            df["NIK"] = df["NIK"].apply(lambda x: f"_{x}" if x else "")
        if "Kode Keluarga" in df.columns:
            df["Kode Keluarga"] = df["Kode Keluarga"].apply(lambda x: f"_{x}" if x else "")
            
        df.to_excel(output_file, index=False)
        print("SUCCESS")
        
    except Exception as e:
        import traceback
        print("ERROR:", str(e))
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("ERROR: Missing arguments. Usage: python excel_helper.py [import|export] [input_file] [output_file]")
        sys.exit(1)
        
    cmd = sys.argv[1]
    in_file = sys.argv[2]
    out_file = sys.argv[3]
    
    if cmd == "import":
        run_import(in_file, out_file)
    elif cmd == "export":
        run_export(in_file, out_file)
    else:
        print(f"ERROR: Unknown command {cmd}")
        sys.exit(1)
