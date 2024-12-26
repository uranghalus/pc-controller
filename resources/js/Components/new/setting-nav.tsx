import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import React from 'react';
import { buttonVariants } from '../ui/button';

interface SettingNavProps extends React.HTMLAttributes<HTMLElement> {
    items: {
        href: string;
        title: string;
    }[];
}

const SettingNav: React.FC<SettingNavProps> = ({
    className,
    items,
    ...props
}) => {
    const { url } = usePage(); // Menggunakan usePage untuk mendapatkan URL aktif

    return (
        <nav
            className={cn(
                'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1',
                className,
            )}
            {...props}
        >
            {items.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        buttonVariants({ variant: 'ghost' }),
                        url === item.href
                            ? 'bg-muted hover:bg-muted'
                            : 'hover:bg-transparent hover:underline',
                        'justify-start',
                    )}
                >
                    {item.title}
                </Link>
            ))}
        </nav>
    );
};

export default SettingNav;
