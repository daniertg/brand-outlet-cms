import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';

interface Brand {
    id: number;
    name: string;
}

interface Outlet {
    id: number;
    brand_id: number;
    name: string;
    address: string | null;
    latitude: string;
    longitude: string;
    phone: string | null;
    brand: Brand;
    created_at: string;
    updated_at: string;
}

interface PaginatedOutlets {
    data: Outlet[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
}

interface Props {
    outlets: PaginatedOutlets;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Outlets', href: '/outlets' },
];

export default function OutletsIndex({ outlets }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this outlet?')) {
            router.delete(`/outlets/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Outlets" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Outlets</h1>
                    <Link href="/outlets/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Outlet
                        </Button>
                    </Link>
                </div>

                <div className="rounded-lg border">
                    <table className="w-full">
                        <thead className="border-b bg-muted/50">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                                <th className="px-4 py-3 text-left text-sm font-medium">Brand</th>
                                <th className="px-4 py-3 text-left text-sm font-medium">Address</th>
                                <th className="px-4 py-3 text-left text-sm font-medium">Coordinates</th>
                                <th className="px-4 py-3 text-left text-sm font-medium">Phone</th>
                                <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {outlets.data.map((outlet) => (
                                <tr key={outlet.id} className="border-b">
                                    <td className="px-4 py-3 text-sm">{outlet.name}</td>
                                    <td className="px-4 py-3 text-sm">{outlet.brand.name}</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">
                                        {outlet.address || '-'}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">
                                        {outlet.latitude}, {outlet.longitude}
                                    </td>
                                    <td className="px-4 py-3 text-sm">{outlet.phone || '-'}</td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link href={`/outlets/${outlet.id}/edit`}>
                                                <Button variant="outline" size="sm">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(outlet.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {outlets.data.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                                        No outlets found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {outlets.last_page > 1 && (
                    <div className="flex justify-center gap-2">
                        {outlets.links.map((link, index) => (
                            <Button
                                key={index}
                                variant={link.active ? 'default' : 'outline'}
                                size="sm"
                                disabled={!link.url}
                                onClick={() => link.url && router.visit(link.url)}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
