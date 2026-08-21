import Header from '@/components/Header/Header';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import 'modern-normalize';
import './globals.css';
import css from './layout.module.css';

const manrope = Manrope({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-manrope',
    display: 'swap',
});

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-inter',
    display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rental-car.vercel.app';

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: 'RentalCar',
    description: 'RentalCar is a simple and efficient application for managing rental cars.',
    openGraph: {
        title: 'RentalCar',
        description: 'RentalCar is a simple and efficient application for managing rental cars.',
        url: '/',
        siteName: 'RentalCar',
        type: 'website',
        images: [
            {
                url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                width: 1200,
                height: 630,
                alt: 'RentalCar',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: '',
        description: 'RentaalCar is a simple and efficient application for managing rental cars.',
        images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
    },
};

export default function RootLayout({
    children,
    modal,
}: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
            <body>
                <TanStackProvider>
                    <Header />
                    <div className={css.main}>{children}</div>
                    {modal}
                </TanStackProvider>
                <Toaster position="top-right" />
            </body>
        </html>
    );
}
