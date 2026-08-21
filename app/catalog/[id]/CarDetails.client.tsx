'use client';

import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import BookingForm from '@/components/BookingForm/BookingForm';
import CarInfo from '@/components/CarInfo/CarInfo';
import Loader from '@/components/Loader/Loader';
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
        return (
            <div className={css.loaderWrapper}>
                <Loader isLoadingDescription={false} />
            </div>
        );
    }

    if (axios.isAxiosError(error) && error.response?.status === 404) {
        notFound();
    }

    if (error || !car) {
        return <p className={css.message}>Something went wrong.</p>;
    }

    return (
        <div className={css.layout}>
            <div className={css.left}>
                <div className={css.imageWrapper}>
                    <Image
                        className={css.image}
                        src={car.img}
                        alt={`${car.brand} ${car.model}`}
                        width={640}
                        height={512}
                        priority
                    />
                </div>

                <BookingForm carId={id} />
            </div>

            <CarInfo car={car} />
        </div>
    );
}
