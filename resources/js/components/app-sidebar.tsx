import { Link } from '@inertiajs/react';
import {
    LayoutGrid,
    Globe,
    Home,
    Settings,
    Users,
    Newspaper,
    Wallet,
    Database,
    FileText,
    Info,
    Target,
    History,
    Map,
    PieChart,
    Landmark,
    Network,
    ScrollText,
    ShieldCheck,
    Building2,
    Building,
    HeartHandshake,
    Award,
    Activity,
    Store,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard, home } from '@/routes';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Halaman Utama (Web)',
        href: home(),
        icon: Home,
    },
    {
        title: 'Dashboard Admin',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Profil Desa',
        icon: Info,
        items: [
            {
                title: 'Tentang Kami',
                href: '/admin/halaman/profil-tentang-kami',
                icon: FileText,
            },
            {
                title: 'Visi & Misi',
                href: '/admin/halaman/profil-visi-misi',
                icon: Target,
            },
            {
                title: 'Sejarah Desa',
                href: '/admin/halaman/profil-sejarah-desa',
                icon: History,
            },
            {
                title: 'Geografis Desa',
                href: '/admin/halaman/profil-geografis-desa',
                icon: Map,
            },
            {
                title: 'Demografi Desa',
                href: '/admin/halaman/profil-demografi-desa',
                icon: PieChart,
            },
            {
                title: 'Hero Banner & Pengaturan',
                href: '/dashboard?tab=profil',
                icon: Settings,
            },
            {
                title: 'Destinasi Wisata',
                href: '/dashboard?tab=wisata',
                icon: Map,
            },
        ],
    },
    {
        title: 'Pemerintahan',
        icon: Landmark,
        items: [
            {
                title: 'Data Perangkat Desa',
                href: '/dashboard?tab=aparatur',
                icon: Users,
            },
            {
                title: 'Struktur Organisasi',
                href: '/admin/halaman/pemerintahan-struktur-organisasi',
                icon: Network,
            },
            {
                title: 'RPJMDes',
                href: '/admin/halaman/pemerintahan-rpjmdes',
                icon: ScrollText,
            },
            {
                title: 'Tata Kelola',
                href: '/admin/halaman/pemerintahan-tata-kelola',
                icon: ShieldCheck,
            },
        ],
    },
    {
        title: 'Lembaga Desa',
        icon: Building2,
        items: [
            {
                title: 'BPD',
                href: '/admin/halaman/lembaga-bpd',
                icon: Building,
            },
            {
                title: 'Tim Penggerak PKK',
                href: '/admin/halaman/lembaga-pkk',
                icon: HeartHandshake,
            },
            {
                title: 'Karang Taruna',
                href: '/admin/halaman/lembaga-karang-taruna',
                icon: Award,
            },
            {
                title: 'RT & RW',
                href: '/admin/halaman/lembaga-rt-rw',
                icon: Users,
            },
            {
                title: 'Posyandu',
                href: '/admin/halaman/lembaga-posyandu',
                icon: Activity,
            },
            {
                title: 'BUMDes',
                href: '/admin/halaman/lembaga-bumdes',
                icon: Store,
            },
        ],
    },
    {
        title: 'Kabar & Keuangan',
        icon: Globe,
        items: [
            {
                title: 'Berita & Kabar Desa',
                href: '/dashboard?tab=berita',
                icon: Newspaper,
            },
            {
                title: 'Keuangan APBDesa',
                href: '/dashboard?tab=apbdes',
                icon: Wallet,
            },
            {
                title: 'Pasar Maya (UMKM)',
                href: '/dashboard?tab=pasar-maya',
                icon: Store,
            },
        ],
    },
    {
        title: 'DB Inspector',
        href: '/debug/database',
        icon: Database,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={home()} title="Ke Halaman Utama Website Desa" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
