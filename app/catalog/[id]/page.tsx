import type { Metadata } from 'next';
import { fetchCarById } from '@/lib/api';
import CarDetailsClient from './CarDetails.client';

interface CarDetailsPageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: CarDetailsPageProps): Promise<Metadata> {
    const { id } = await params;

    try {
        const car = await fetchCarById(id);
        const description = car.description.length > 150 ? `${car.description.slice(0, 150)}…` : car.description;
        const title = `${car.brand} — ${car.model}`;
        const alt = `${car.brand} ${car.model}`;

        return {
            title,
            description,
            openGraph: {
                title,
                description,
                url: `/catalog/${id}`,
                siteName: 'RentalCar',
                type: 'article',
                images: [
                    {
                        url: car.img,
                        alt,
                    },
                ],
            },
            twitter: {
                card: 'summary_large_image',
                title,
                description,
                images: [car.img],
            },
        };
    } catch {
        return {
            title: 'Car — RentalCar',
            description: 'View car details on RentalCar.',
        };
    }
}

export default function CarDetailsPage() {
    return <CarDetailsClient />;
}
