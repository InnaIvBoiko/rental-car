import type { Metadata } from 'next';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { fetchCars, fetchCarsFilters } from '@/lib/api';
import CatalogClient, { CATALOG_PER_PAGE } from './CatalogClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Catalog — RentalCar',
    description: 'Browse our fleet of rental cars and filter by brand, price, and mileage.',
    openGraph: {
        title: 'Catalog — RentalCar',
        description: 'Browse our fleet of rental cars and filter by brand, price, and mileage.',
        url: '/catalog',
        siteName: 'RentalCar',
        type: 'website',
    },
};

export default async function CatalogPage() {
    const queryClient = new QueryClient();

    await Promise.all([
        queryClient.prefetchInfiniteQuery({
            queryKey: ['cars', {}],
            queryFn: () => fetchCars({ page: 1, perPage: CATALOG_PER_PAGE }),
            initialPageParam: 1,
        }),
        queryClient.prefetchQuery({
            queryKey: ['carsFilters'],
            queryFn: fetchCarsFilters,
        }),
    ]);

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <CatalogClient />
        </HydrationBoundary>
    );
}
