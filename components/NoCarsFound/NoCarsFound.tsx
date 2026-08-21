import ButtonSecondary from '../ButtonSecondary/ButtonSecondary';
import Image from 'next/image';
import css from './NoCarsFound.module.css';

export interface NoCarsFoundProps {
    resetFilters: () => void;
}

export default function NoCarsFound({ resetFilters }: NoCarsFoundProps) {
    return (
        <div className={css.wrapper}>
            <Image src="/images/no-cars-found.png" alt="No cars found" width={414} height={388} />
            <h2 className={css.title}>No cars found</h2>
            <p className={css.message}>
                We couldn`t find any cars that match your current filters. Try changing your search criteria or reset
                the filters.
            </p>
            <ButtonSecondary onClick={resetFilters}>Reset Filters</ButtonSecondary>
        </div>
    );
}
