import Image from 'next/image';
import ButtonPrimary from '@/components/ButtonPrimary/ButtonPrimary';
import type { Car } from '@/types/car';
import css from './CarCard.module.css';

interface CarCardProps {
    car: Car;
    priority?: boolean;
}

const formatMileage = (mileage: number): string => mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

export default function CarCard({ car, priority }: CarCardProps) {
    return (
        <li id={`car-${car.id}`} className={css.card}>
            <div className={css.imageWrapper}>
                <Image
                    className={css.image}
                    src={car.img}
                    alt={`${car.brand} ${car.model}`}
                    width={244}
                    height={268}
                    priority={priority}
                />
            </div>

            <div className={css.info}>
                <div className={css.row}>
                    <p className={css.title}>
                        {`${car.brand}`} <span className={css.model}>{` ${car.model}`}</span>, {`${car.year}`}
                    </p>
                    <p className={css.price}>{`$${car.rentalPrice}`}</p>
                </div>

                <ul className={css.meta}>
                    <li className={css.metaItem}>
                        {car.location.city} <div className={css.metaItemLine}></div>
                    </li>
                    <li className={css.metaItem}>
                        {car.location.country} <div className={css.metaItemLine}></div>
                    </li>
                    <li className={css.metaItem}>
                        {car.rentalCompany} <div className={css.metaItemLine}></div>
                    </li>
                    <li className={css.metaItem}>
                        {car.type} <div className={css.metaItemLine}></div>
                    </li>
                    <li className={css.metaItem}>{`${formatMileage(car.mileage)} km`}</li>
                </ul>
            </div>
            <div className={css.buttonWrapper}>
                <ButtonPrimary
                    href={`/catalog/${car.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    padding="12px"
                    fullWidth
                >
                    Read more
                </ButtonPrimary>
            </div>
        </li>
    );
}
