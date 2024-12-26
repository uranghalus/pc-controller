import { Button } from '@/Components/ui/button'; // Pastikan ini sudah sesuai dengan komponen yang Anda gunakan
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/Components/ui/form'; // Pastikan ini sudah sesuai dengan komponen yang Anda gunakan
import { Input } from '@/Components/ui/input'; // Pastikan ini sudah sesuai dengan komponen yang Anda gunakan
import { Separator } from '@/Components/ui/separator';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SettingLayout from '@/Layouts/SettingLayout';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Skema Validasi Zod
const settingSchema = z.object({
    id: z.number().nullable(),
    ip_controller: z
        .string()
        .nonempty('IP Controller harus diisi.')
        .regex(
            /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/,
            'IP Controller harus berupa alamat IP yang valid.',
        ),
    name: z.string().optional(),
    status: z.string().optional(),
});

type Setting = z.infer<typeof settingSchema>;

interface IndexProps {
    setting: Setting;
}

const Index: React.FC<IndexProps> = ({ setting }) => {
    const form = useForm<Setting>({
        resolver: zodResolver(settingSchema),
        defaultValues: {
            id: setting?.id || null,
            ip_controller: setting?.ip_controller || '',
            name: setting?.name || '',
            status: setting?.status || '',
        },
    });

    // Fungsi saat form disubmit
    const onSubmit = (data: Setting) => {
        console.log(data);
        // Kirim data ke server
        // Misalnya,
        router.post(route('settings.storeOrUpdate'), data);
    };

    return (
        <AuthenticatedLayout header={null}>
            <Head title="Dashboard" />

            <SettingLayout>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-medium">
                            Pengaturan Controller
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Pengaturan konfigurasi controller
                        </p>
                    </div>
                    <Separator />
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="ip_controller"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>IP Controller</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter IP Address"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            This is the IP address of your
                                            controller.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Controller Name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            This is the name of your controller.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Controller Status"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            This is the current status of your
                                            controller.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Simpan</Button>
                        </form>
                    </Form>
                </div>
            </SettingLayout>
        </AuthenticatedLayout>
    );
};

export default Index;
