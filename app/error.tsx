'use client';

import { useEffect } from 'react';
import ButtonPrimary from '@/components/ButtonPrimary/ButtonPrimary';
import css from './status.module.css';

interface ErrorPageProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className={css.wrapper}>
            <p className={css.code}>Oops...</p>
            <h1 className={css.title}>Something went wrong</h1>
            <p className={css.message}>An unexpected error occurred. Please try again.</p>
            <ButtonPrimary onClick={() => reset()}>Try again</ButtonPrimary>
        </div>
    );
}
