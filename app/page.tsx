import Link from 'next/link';
import css from './Home.module.css';

export default function Home() {
    return (
        <main className={css.main}>
            <div className={css.container}>
                <h1 className={css.title}>Find your perfect rental car</h1>
                <p className={css.description}>Reliable and budget-friendly rentals for any journey</p>
                <Link href="/gallery" className={css.button}>
                    View Catalog
                </Link>
            </div>
        </main>
    );
}
