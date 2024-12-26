import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Computer, Power, RotateCcw } from 'lucide-react';
import { useState } from 'react';
// interface TriggerResponse {
//     status: string;
//     error?: string;
// }
export default function Dashboard() {
    const { setData, get, processing } = useForm<{ action: string }>({
        action: '', // Menyimpan aksi yang akan dikirim
    });

    const [status, setStatus] = useState<string | null>(null);

    // Fungsi untuk mengirimkan perintah ke Laravel melalui Inertia
    const triggerAction = async (action: string) => {
        setData('action', action);

        get(`/trigger/${action}`, {
            onSuccess: (response) => {
                // const result = response.props.flash;
                console.log(response);

                // setStatus(result.status || 'Perintah berhasil dikirim');
            },
            onError: (errors: Record<string, string>) => {
                setStatus(errors.error || 'Terjadi kesalahan');
            },
        });
    };
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">
                        Dashboard
                    </h2>
                    <div className="flex items-center space-x-2">
                        {/* <CalendarDateRangePicker />
                        <Button>Download</Button> */}
                    </div>
                </div>
            }
        >
            <Head title="Dashboard" />

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="space-y-3 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Status PC
                        </CardTitle>
                        <div className="">
                            <div className="text-2xl font-bold">Test</div>
                            <Badge>{status}</Badge>
                        </div>
                    </div>
                    <div className="rounded-lg bg-blue-500 p-5">
                        <Computer className="size-8" />
                    </div>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="grid gap-2 md:grid-cols-2">
                        {/* LINK Hidupkan PC */}
                        <div className="space-y-1">
                            <div className="text-sm font-medium text-muted-foreground">
                                Hidupkan PC
                            </div>
                            <Button
                                className="h-12 w-full bg-green-500 text-white hover:bg-green-700"
                                size={'lg'}
                                onClick={() => triggerAction('turn_on')}
                                disabled={processing}
                            >
                                <Power className="mr-2 size-6" />
                                Hidupkan
                            </Button>
                        </div>
                        <div className="space-y-1">
                            <div className="text-sm font-medium text-muted-foreground">
                                Matikan PC
                            </div>
                            <Button
                                className="h-12 w-full bg-red-500 text-white hover:bg-red-700"
                                size={'lg'}
                                onClick={() => triggerAction('turn_off')}
                                disabled={processing}
                            >
                                <Power className="mr-2 size-6" />
                                Matikan
                            </Button>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-sm font-medium text-muted-foreground">
                            Restart PC
                        </div>
                        <Button
                            className="h-12 w-full bg-amber-500 text-white hover:bg-amber-700"
                            size={'lg'}
                            onClick={() => triggerAction('restart')}
                            disabled={processing}
                        >
                            <RotateCcw className="mr-2 size-6" />
                            Restart
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
