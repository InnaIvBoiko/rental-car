import type { Metadata } from 'next';
import ButtonPrimary from '@/components/ButtonPrimary/ButtonPrimary';
import css from './status.module.css';

export const metadata: Metadata = {
    title: 'Page not found — RentalCar',
    description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
    return (
        <div className={css.wrapper}>
            <p className={css.code}>404</p>
            <h1 className={css.title}>Page not found</h1>
            <p className={css.message}>
                We couldn&apos;t find the page you&apos;re looking for. It may have been moved or the car no longer
                exists.
            </p>
            <ButtonPrimary href="/">Back to Home</ButtonPrimary>
        </div>
    );
}
