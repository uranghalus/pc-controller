import SettingNav from '@/Components/new/setting-nav';
import { Separator } from '@/Components/ui/separator';

const settingItem = [
    {
        title: 'Pengaturan Controller',
        href: '/settings',
    },
    {
        title: 'Profile',
        href: '/profile',
    },
    // {
    //     title: 'Appearance',
    //     href: '/examples/forms/appearance',
    // },
    // {
    //     title: 'Notifications',
    //     href: '/examples/forms/notifications',
    // },
    // {
    //     title: 'Display',
    //     href: '/examples/forms/display',
    // },
];
interface SettingsLayoutProps {
    children: React.ReactNode;
}
const SettingLayout: React.FC<SettingsLayoutProps> = ({ children }) => {
    return (
        <div className="hidden space-y-6 p-10 pb-16 md:block">
            <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">
                    Manage your account settings and set e-mail preferences.
                </p>
            </div>
            <Separator className="my-6" />
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <aside className="-mx-4 lg:w-1/5">
                    <SettingNav items={settingItem} />
                </aside>
                <div className="flex-1 lg:max-w-2xl">{children}</div>
            </div>
        </div>
    );
};

export default SettingLayout;
