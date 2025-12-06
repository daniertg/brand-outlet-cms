import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';

interface Brand {
    id: number;
    name: string;
    description: string | null;
    logo: string | null;
    outlets_count: number;
    created_at: string;
    updated_at: string;
}

interface PaginatedBrands {
    data: Brand[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
}

interface Props {
    brands: PaginatedBrands;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Brands', href: '/brands' },
];

export default function BrandsIndex({ brands }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this brand?')) {
            router.delete(`/brands/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Brands" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Brands</h1>
                    <Link href="/brands/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Brand
                        </Button>
                    </Link>
                </div>

                <div className="rounded-lg border">
                    <table className="w-full">
                        <thead className="border-b bg-muted/50">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                                <th className="px-4 py-3 text-left text-sm font-medium">Description</th>
                                <th className="px-4 py-3 text-left text-sm font-medium">Outlets</th>
                                <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {brands.data.map((brand) => (
                                <tr key={brand.id} className="border-b">
                                    <td className="px-4 py-3 text-sm">{brand.name}</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">
                                        {brand.description || '-'}
                                    </td>
                                    <td className="px-4 py-3 text-sm">{brand.outlets_count}</td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link href={`/brands/${brand.id}/edit`}>
                                                <Button variant="outline" size="sm">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(brand.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {brands.data.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                                        No brands found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {brands.last_page > 1 && (
                    <div className="flex justify-center gap-2">
                        {brands.links.map((link, index) => (
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
