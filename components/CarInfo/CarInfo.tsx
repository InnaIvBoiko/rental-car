import {
    IoCalendarOutline,
    IoCarOutline,
    IoCheckmarkCircleOutline,
    IoConstructOutline,
    IoLocationOutline,
    IoSpeedometerOutline,
    IoWaterOutline,
} from 'react-icons/io5';
import type { Car } from '@/types/car';
import css from './CarInfo.module.css';

interface CarInfoProps {
    car: Car;
}

const formatMileage = (mileage: number): string => mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

export default function CarInfo({ car }: CarInfoProps) {
    return (
        <div className={css.info}>
            <div>
                <div className={css.titleRow}>
                    <h2 className={css.title}>
                        {car.brand} {car.model}, {car.year}
                    </h2>
                    <span className={css.article}>{`Article: ${car.stockNumber}`}</span>
                </div>

                <p className={css.location}>
                    <IoLocationOutline className={css.icon} aria-hidden="true" />
                    {car.location.city}, {car.location.country}
                </p>

                <p className={css.price}>{`$${car.rentalPrice}`}</p>

                <p className={css.description}>{car.description}</p>
            </div>
            <div>
                <h3 className={css.sectionTitle}>Rental Conditions:</h3>
                <ul className={css.list}>
                    {car.rentalConditions.map(condition => (
                        <li key={condition} className={css.listItem}>
                            <IoCheckmarkCircleOutline className={css.icon} aria-hidden="true" />
                            {condition}
                        </li>
                    ))}
                </ul>

                <hr className={css.divider} />

                <h3 className={css.sectionTitle}>Car Specifications:</h3>
                <ul className={css.list}>
                    <li className={css.listItem}>
                        <IoCalendarOutline className={css.icon} aria-hidden="true" />
                        {`Year: ${car.year}`}
                    </li>
                    <li className={css.listItem}>
                        <IoCarOutline className={css.icon} aria-hidden="true" />
                        {`Type: ${car.type}`}
                    </li>
                    <li className={css.listItem}>
                        <IoWaterOutline className={css.icon} aria-hidden="true" />
                        {`Fuel Consumption: ${car.fuelConsumption}`}
                    </li>
                    <li className={css.listItem}>
                        <IoConstructOutline className={css.icon} aria-hidden="true" />
                        {`Engine: ${car.engine}`}
                    </li>
                    <li className={css.listItem}>
                        <IoSpeedometerOutline className={css.icon} aria-hidden="true" />
                        {`Mileage: ${formatMileage(car.mileage)} km`}
                    </li>
                </ul>

                <hr className={css.divider} />

                <h3 className={css.sectionTitle}>Features:</h3>
                <ul className={css.list}>
                    {car.features.map(feature => (
                        <li key={feature} className={css.listItem}>
                            <IoCheckmarkCircleOutline className={css.icon} aria-hidden="true" />
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
