import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import React from 'react';

interface NavProps extends React.HTMLAttributes<HTMLElement> {
    className?: string; // className opsional
}
const menu = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Jadwal PC',
        href: '/jadwal-pc',
    },
    {
        title: 'Setting',
        href: '/settings',
    },
];
const MainNav: React.FC<NavProps> = ({ className, ...props }) => {
    const { url } = usePage();
    return (
        <nav
            className={cn(
                'flex items-center space-x-4 lg:space-x-6',
                className,
            )}
            {...props}
        >
            {menu.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        'text-sm font-medium transition-colors hover:text-primary',
                        url === item.href ? null : 'text-muted-foreground',
                    )}
                >
                    {item.title}
                </Link>
            ))}
        </nav>
    );
};

export default MainNav;
