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
        const description = car.brand
            ? car.brand.length > 150
                ? `${car.brand.slice(0, 150)}…`
                : car.brand
            : `Details for the car "${car.brand}" on RentalCar.`;
        const title = `${car.brand} — ${car.model}`;

        return {
            title,
            description,
            openGraph: {
                title,
                description,
                url: `/cars/${id}`,
                siteName: 'RentalCar',
                type: 'article',
                images: [
                    {
                        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                        width: 1200,
                        height: 630,
                        alt: car.brand,
                    },
                ],
            },
            twitter: {
                card: 'summary_large_image',
                title,
                description,
                images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
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
