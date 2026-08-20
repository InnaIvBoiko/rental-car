export type Features =
    | 'Leather seats'
    | 'Panoramic sunroof'
    | 'Premium audio system'
    | 'Power liftgate'
    | 'Remote start'
    | 'Blind-spot monitoring';

export interface Car {
    id: string;
    year: number;
    brand: string;
    model: string;
    type: string;
    img: string;
    description: string;
    fuelConsumption: string;
    engine: string;
    features: Features[];
    rentalPrice: string;
    rentalCompany: string;
    location: {
        country: string;
        city: string;
        address: string;
    };
    rentalConditions: string[];
    mileage: number;
}
