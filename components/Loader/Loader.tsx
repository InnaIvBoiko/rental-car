import css from './Loader.module.css';

export default function Loader() {
    return (
        <div className={css.wrapper}>
            <div className={css.spinnerCard}>
                <span className={css.loader} role="status" aria-label="Loading" />
                <h2 className={css.loadingText}>Loading cars...</h2>
                <p className={css.loadingDescription}>Please wait while we fetch the best cars for you</p>
            </div>
        </div>
    );
}
