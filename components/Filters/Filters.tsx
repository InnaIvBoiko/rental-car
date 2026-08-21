'use client';

import { useState, type ChangeEvent, type SubmitEvent } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import ButtonPrimary from '@/components/ButtonPrimary/ButtonPrimary';
import type { CarsFilters } from '@/lib/api';
import css from './Filters.module.css';

export interface AppliedFilters {
    brand?: string;
    price?: number;
    minMileage?: number;
    maxMileage?: number;
}

interface FiltersProps {
    filters?: CarsFilters;
    onApply: (filters: AppliedFilters) => void;
}

const PRICE_STEP: number = 10;
const PRICE_MAX: number = 200;

const buildPriceOptions = (price?: CarsFilters['price']): number[] => {
    if (!price) {
        return [];
    }

    const options: number[] = [];
    for (let value = price.min; value <= PRICE_MAX; value += PRICE_STEP) {
        options.push(value);
    }

    return options;
};

const digitsOnly = (value: string): string => value.replace(/\D/g, '');

const EMPTY_FILTERS: AppliedFilters = {};

export default function Filters({ filters, onApply }: FiltersProps) {
    const [brand, setBrand] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [mileageFrom, setMileageFrom] = useState<string>('');
    const [mileageTo, setMileageTo] = useState<string>('');

    const [isBrandDropdownOpen, setIsBrandDropdownOpen] = useState<boolean>(false);
    const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState<boolean>(false);

    const priceOptions = buildPriceOptions(filters?.price);

    const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        onApply({
            brand: brand || undefined,
            price: price ? Number(price) : undefined,
            minMileage: mileageFrom ? Number(mileageFrom) : undefined,
            maxMileage: mileageTo ? Number(mileageTo) : undefined,
        });
    };

    const handleClear = () => {
        setBrand('');
        setPrice('');
        setMileageFrom('');
        setMileageTo('');
        onApply(EMPTY_FILTERS);
    };

    const handleMileageChange = (setter: (value: string) => void) => (event: ChangeEvent<HTMLInputElement>) => {
        setter(digitsOnly(event.target.value));
    };

    return (
        <div className={css.wrapper}>
            <form className={css.form} onSubmit={handleSubmit}>
                <div className={css.dropDownWrapper}>
                    <label className={css.field}>
                        <span className={css.label}>Car brand</span>
                        <span className={css.dropDownInputWrapper}>
                            <input
                                className={css.dropDownInput}
                                type="text"
                                value={brand}
                                placeholder="Choose a brand"
                                readOnly
                                onClick={() => {
                                    setIsBrandDropdownOpen(!isBrandDropdownOpen);
                                    setIsPriceDropdownOpen(false);
                                }}
                            />
                            {isBrandDropdownOpen ? (
                                <FiChevronUp className={css.dropDownIcon} aria-hidden="true" />
                            ) : (
                                <FiChevronDown className={css.dropDownIcon} aria-hidden="true" />
                            )}
                        </span>
                    </label>
                    {isBrandDropdownOpen && (
                        <ul className={css.dropDown}>
                            {filters?.brands.map((option, inx) => (
                                <li
                                    key={inx}
                                    className={`${css.dropDownItem} ${option === brand ? css.dropDownInputSelected : ''}`}
                                    onClick={() => {
                                        setBrand(option);
                                        setIsBrandDropdownOpen(false);
                                    }}
                                >
                                    {option}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className={css.dropDownWrapper}>
                    <label className={css.field}>
                        <span className={css.label}>Price/ 1 hour</span>
                        <span className={css.dropDownInputWrapper}>
                            <input
                                className={css.dropDownInput}
                                type="text"
                                value={price ? `To $${price}` : ''}
                                placeholder="Choose a price"
                                readOnly
                                onClick={() => {
                                    setIsPriceDropdownOpen(!isPriceDropdownOpen);
                                    setIsBrandDropdownOpen(false);
                                }}
                            />
                            {isPriceDropdownOpen ? (
                                <FiChevronUp className={css.dropDownIcon} aria-hidden="true" />
                            ) : (
                                <FiChevronDown className={css.dropDownIcon} aria-hidden="true" />
                            )}
                        </span>
                    </label>
                    {isPriceDropdownOpen && (
                        <ul className={css.dropDown}>
                            {priceOptions.map((option, inx) => (
                                <li
                                    key={inx}
                                    className={`${css.dropDownItem} ${
                                        option.toString() === price ? css.dropDownInputSelected : ''
                                    }`}
                                    onClick={() => {
                                        setPrice(option.toString());
                                        setIsPriceDropdownOpen(false);
                                    }}
                                >
                                    {option}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className={css.field}>
                    <span className={css.label}>Car mileage / km</span>
                    <div className={css.mileageControl}>
                        <input
                            className={css.mileageInput}
                            type="text"
                            inputMode="numeric"
                            placeholder="From"
                            aria-label="Mileage from, km"
                            value={mileageFrom}
                            onChange={handleMileageChange(setMileageFrom)}
                        />
                        <span className={css.mileageDivider} aria-hidden="true" />
                        <input
                            className={css.mileageInput}
                            type="text"
                            inputMode="numeric"
                            placeholder="To"
                            aria-label="Mileage to, km"
                            value={mileageTo}
                            onChange={handleMileageChange(setMileageTo)}
                        />
                    </div>
                </div>

                <div className={css.searchGroup}>
                    <ButtonPrimary type="submit" padding="12px 51px" className={css.searchButton}>
                        Search
                    </ButtonPrimary>

                    <button type="button" className={css.clearButton} onClick={handleClear}>
                        Clear filters
                    </button>
                </div>
            </form>
        </div>
    );
}
