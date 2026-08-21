import css from './Loader.module.css';

interface LoaderProps {
    isLoadingDescription?: boolean;
}

export default function Loader({ isLoadingDescription = true }: LoaderProps) {
    return (
        <div className={css.wrapper}>
            <div className={css.spinnerCard}>
                <span className={css.loader} role="status" aria-label="Loading" />
                <h2 className={css.loadingText}>Loading cars...</h2>
                {isLoadingDescription && (
                    <p className={css.loadingDescription}>Please wait while we fetch the best cars for you</p>
                )}
            </div>
        </div>
    );
}
