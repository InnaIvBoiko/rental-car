'use client';

import { useEffect, useRef, useState } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import Filters, { type AppliedFilters } from '@/components/Filters/Filters';
import CarList from '@/components/CarList/CarList';
import ButtonSecondary from '@/components/ButtonSecondary/ButtonSecondary';
import NoCarsFound from '@/components/NoCarsFound/NoCarsFound';
import Loader from '@/components/Loader/Loader';
import { fetchCars, fetchCarsFilters } from '@/lib/api';
import css from './Catalog.module.css';

export const CATALOG_PER_PAGE: number = 8;

export default function CatalogClient() {
    const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>({});
    const pendingScrollIndexRef = useRef<number | null>(null);

    const { data: filtersData } = useQuery({
        queryKey: ['carsFilters'],
        queryFn: fetchCarsFilters,
        staleTime: Infinity,
    });

    const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['cars', appliedFilters],
        queryFn: ({ pageParam }) => fetchCars({ page: pageParam, perPage: CATALOG_PER_PAGE, ...appliedFilters }),
        initialPageParam: 1,
        getNextPageParam: lastPage => (lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined),
    });

    const cars = data?.pages.flatMap(page => page.cars) ?? [];

    useEffect(() => {
        const targetIndex = pendingScrollIndexRef.current;
        if (targetIndex === null) {
            return;
        }

        const targetCar = cars[targetIndex];
        if (!targetCar) {
            return;
        }

        pendingScrollIndexRef.current = null;
        document.getElementById(`car-${targetCar.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cars.length]);

    const handleLoadMore = () => {
        pendingScrollIndexRef.current = cars.length;
        fetchNextPage();
    };

    return (
        <div className={css.container}>
            <Filters filters={filtersData} onApply={setAppliedFilters} />
            <div className={css.carListWrapper}>
                {(isLoading || isFetchingNextPage) && (
                    <div className={css.loaderWrapper}>
                        <Loader />
                    </div>
                )}

                {isError && (
                    <p className={css.message}>Could not load cars. {error instanceof Error ? error.message : ''}</p>
                )}

                {!isLoading && !isError && cars.length === 0 && (
                    <NoCarsFound resetFilters={() => setAppliedFilters({})} />
                )}

                {cars.length > 0 && <CarList cars={cars} />}
            </div>
            {hasNextPage && (
                <ButtonSecondary
                    padding="14px 40px"
                    className={css.loadMore}
                    onClick={handleLoadMore}
                    disabled={isFetchingNextPage}
                >
                    {isFetchingNextPage ? 'Loading...' : 'Load more'}
                </ButtonSecondary>
            )}
        </div>
    );
}
