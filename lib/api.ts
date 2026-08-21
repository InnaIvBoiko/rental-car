import axios, { type AxiosResponse } from 'axios';
import { Car } from '@/types/car';

const BASE_URL: string = 'https://car-rental-api.goit.study/';

const api = axios.create({
    baseURL: BASE_URL,
});

export interface FetchCarsParams {
    brand?: string;
    price?: number;
    minMileage?: number;
    maxMileage?: number;
    perPage?: number;
    page?: number;
}

export interface FetchCarsResponse {
    cars: Car[];
    totalCars: number;
    page: number;
    totalPages: number;
}

export const fetchCars = async ({
    page = 1,
    perPage = 12,
    brand = '',
    price = 0,
    minMileage = 0,
    maxMileage = 0,
}: FetchCarsParams): Promise<FetchCarsResponse> => {
    const response: AxiosResponse<FetchCarsResponse> = await api.get('/cars', {
        params: {
            page,
            perPage,
            ...(brand ? { brand } : {}),
            ...(price ? { price } : {}),
            ...(minMileage ? { minMileage } : {}),
            ...(maxMileage ? { maxMileage } : {}),
        },
    });

    return response.data;
};

export interface CarsFilters {
    brands: string[];
    price: {
        min: number;
        max: number;
    };
}

export const fetchCarsFilters = async (): Promise<CarsFilters> => {
    const response: AxiosResponse<CarsFilters> = await api.get('/cars/filters');

    return response.data;
};

export const fetchCarById = async (id: string): Promise<Car> => {
    const response: AxiosResponse<Car> = await api.get(`/cars/${id}`);

    return response.data;
};

export interface BookingRequestPayload {
    name: string;
    email: string;
    comment?: string;
}

export interface BookingRequestResponse {
    message: string;
}

export const createBookingRequest = async (
    carId: string,
    payload: BookingRequestPayload
): Promise<BookingRequestResponse> => {
    const response: AxiosResponse<BookingRequestResponse> = await api.post(`/cars/${carId}/booking-requests`, payload);

    return response.data;
};
