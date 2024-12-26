import MainNav from '@/Components/new/main-nav';
import UserNav from '@/Components/new/user-nav';
import { Link, usePage } from '@inertiajs/react';
import { GalleryVerticalEnd } from 'lucide-react';
import { PropsWithChildren, ReactNode } from 'react';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;

    // const [showingNavigationDropdown, setShowingNavigationDropdown] =
    //     useState(false);

    return (
        <div className="hidden flex-col md:flex">
            <div className="border-b">
                <div className="flex h-16 items-center px-4">
                    <Link href="#" className="mr-4 flex items-center gap-4">
                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                            <GalleryVerticalEnd className="size-4" />
                        </div>
                        <div className="flex flex-col gap-0.5 leading-none">
                            <span className="font-semibold">Documentation</span>
                            <span className="">v1.0.0</span>
                        </div>
                    </Link>
                    <MainNav className="mx-6" />
                    <div className="ml-auto flex items-center space-x-4">
                        <UserNav user={user} />
                    </div>
                </div>
            </div>
            <div className="flex-1 space-y-4 p-8 pt-6">
                {header && (
                    <header className="bg-white shadow">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}
                {children}
            </div>
        </div>
    );
}
