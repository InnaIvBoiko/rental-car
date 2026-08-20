'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchCarById } from '@/lib/api';
import css from './CarDetails.module.css';

export default function CarDetailsClient() {
    const { id } = useParams<{ id: string }>();

    const {
        data: car,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['car', id],
        queryFn: () => fetchCarById(id),
        staleTime: 1000 * 60 * 5,
        refetchOnMount: false,
    });

    if (isLoading) {
        return <p>Loading, please wait...</p>;
    }

    if (error || !car) {
        return <p>Something went wrong.</p>;
    }

    return (
        <div className={css.container}>
            <div className={css.item}>
                <div className={css.header}>
                    <h2>{car?.brand}</h2>
                </div>
                <p className={css.tag}>{car?.model}</p>
                <p className={css.content}>{car?.description}</p>
            </div>
        </div>
    );
}
