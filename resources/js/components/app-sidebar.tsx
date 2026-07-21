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
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Pengelola Konten Web',
        icon: Globe,
        items: [
            {
                title: 'Profil & Hero Banner',
                href: '/dashboard?tab=profil',
                icon: Settings,
            },
            {
                title: 'Perangkat Desa',
                href: '/dashboard?tab=aparatur',
                icon: Users,
            },
            {
                title: 'Kelola Halaman Sub-Menu',
                href: '/dashboard?tab=halaman',
                icon: FileText,
            },
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
