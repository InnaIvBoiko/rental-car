'use client';

import { useState } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import Filters, { type AppliedFilters } from '@/components/Filters/Filters';
import CarList from '@/components/CarList/CarList';
import ButtonSecondary from '@/components/ButtonSecondary/ButtonSecondary';
import { fetchCars, fetchCarsFilters } from '@/lib/api';
import css from './Catalog.module.css';

export const CATALOG_PER_PAGE = 8;

export default function CatalogClient() {
    const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>({});

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

    return (
        <div className={css.container}>
            <Filters filters={filtersData} onApply={setAppliedFilters} />

            {isLoading && (
                <div className={css.loaderWrapper}>
                    <p>Loading cars...</p>
                </div>
            )}

            {isError && (
                <p className={css.message}>Could not load cars. {error instanceof Error ? error.message : ''}</p>
            )}

            {!isLoading && !isError && cars.length === 0 && (
                <p className={css.message}>No cars matched your filters.</p>
            )}

            {!isLoading && cars.length > 0 && <CarList cars={cars} />}

            {hasNextPage && (
                <ButtonSecondary
                    padding="14px 40px"
                    className={css.loadMore}
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                >
                    {isFetchingNextPage ? 'Loading...' : 'Load more'}
                </ButtonSecondary>
            )}
        </div>
    );
}
