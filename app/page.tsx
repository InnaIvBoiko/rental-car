import ButtonPrimary from '@/components/ButtonPrimary/ButtonPrimary';
import css from './Home.module.css';

export default function Home() {
    return (
        <div className={css.main}>
            <div className={css.container}>
                <h1 className={css.title}>Find your perfect rental car</h1>
                <p className={css.description}>Reliable and budget-friendly rentals for any journey</p>
                <ButtonPrimary href="/catalog" padding="12px clamp(24px, 10vw, 99px)" className={css.cta}>
                    View Catalog
                </ButtonPrimary>
            </div>
        </div>
    );
}
