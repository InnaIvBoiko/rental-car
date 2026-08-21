import CarCard from '@/components/CarCard/CarCard';
import type { Car } from '@/types/car';
import css from './CarList.module.css';

interface CarListProps {
    cars: Car[];
}

export default function CarList({ cars }: CarListProps) {
    return (
        <ul className={css.list}>
            {cars.map((car, index) => (
                <CarCard key={car.id} car={car} priority={index < 4} />
            ))}
        </ul>
    );
}
