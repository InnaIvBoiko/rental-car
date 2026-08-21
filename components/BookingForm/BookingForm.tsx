'use client';

import { useState, type SubmitEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { IoAlertCircleOutline } from 'react-icons/io5';
import ButtonPrimary from '@/components/ButtonPrimary/ButtonPrimary';
import { createBookingRequest, type BookingRequestPayload } from '@/lib/api';
import css from './BookingForm.module.css';

interface BookingFormProps {
    carId: string;
}

interface FormValues {
    name: string;
    email: string;
    comment: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    comment?: string;
}

const NAME_PATTERN = /^[\p{L}][\p{L}\s'-]{1,}$/u;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = (values: FormValues): FormErrors => {
    const errors: FormErrors = {};

    if (!NAME_PATTERN.test(values.name.trim())) {
        errors.name = 'Please enter your name.';
    }

    if (!EMAIL_PATTERN.test(values.email.trim())) {
        errors.email = 'Please enter your email.';
    }

    if (!values.comment.trim()) {
        errors.comment = 'Comment is required';
    }

    return errors;
};

export default function BookingForm({ carId }: BookingFormProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [comment, setComment] = useState('');
    const [errors, setErrors] = useState<FormErrors>({});

    const bookingMutation = useMutation({
        mutationFn: (payload: BookingRequestPayload) => createBookingRequest(carId, payload),
        onSuccess: (data) => {
            toast.success(data.message);
            setName('');
            setEmail('');
            setComment('');
            setErrors({});
        },
        onError: (mutationError) => {
            const message = axios.isAxiosError(mutationError)
                ? (mutationError.response?.data?.message ?? 'Could not send your booking request.')
                : 'Could not send your booking request.';
            toast.error(message);
        },
    });

    const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const validationErrors = validate({ name, email, comment });
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        bookingMutation.mutate({ name, email, comment });
    };

    const handleFieldChange = (field: keyof FormErrors, value: string, setter: (value: string) => void) => {
        setter(value);
        setErrors((previous) => (previous[field] ? { ...previous, [field]: undefined } : previous));
    };

    return (
        <div className={css.bookingCard}>
            <h2 className={css.bookingTitle}>Book your car now</h2>
            <p className={css.bookingSubtitle}>Stay connected! We are always ready to help you.</p>

            <form className={css.form} onSubmit={handleSubmit} noValidate>
                <div className={css.field}>
                    <div className={css.controlWrapper}>
                        {errors.name && <span className={css.floatingLabel}>Name*</span>}
                        <input
                            className={`${css.input} ${errors.name ? css.inputError : ''}`}
                            type="text"
                            placeholder="Name*"
                            value={name}
                            onChange={(event) => handleFieldChange('name', event.target.value, setName)}
                        />
                        {errors.name && <IoAlertCircleOutline className={css.errorIcon} aria-hidden="true" />}
                    </div>
                    {errors.name && <p className={css.errorText}>{errors.name}</p>}
                </div>

                <div className={css.field}>
                    <div className={css.controlWrapper}>
                        {errors.email && <span className={css.floatingLabel}>Email*</span>}
                        <input
                            className={`${css.input} ${errors.email ? css.inputError : ''}`}
                            type="email"
                            placeholder="Email*"
                            value={email}
                            onChange={(event) => handleFieldChange('email', event.target.value, setEmail)}
                        />
                        {errors.email && <IoAlertCircleOutline className={css.errorIcon} aria-hidden="true" />}
                    </div>
                    {errors.email && <p className={css.errorText}>{errors.email}</p>}
                </div>

                <div className={css.field}>
                    <div className={css.controlWrapper}>
                        <textarea
                            className={`${css.textarea} ${errors.comment ? css.inputError : ''}`}
                            placeholder="Comment"
                            rows={4}
                            value={comment}
                            onChange={(event) => handleFieldChange('comment', event.target.value, setComment)}
                        />
                        {errors.comment && <IoAlertCircleOutline className={css.errorIcon} aria-hidden="true" />}
                    </div>
                    {errors.comment && <p className={css.errorText}>{errors.comment}</p>}
                </div>

                <ButtonPrimary type="submit" fullWidth disabled={bookingMutation.isPending}>
                    {bookingMutation.isPending ? 'Sending...' : 'Send'}
                </ButtonPrimary>
            </form>
        </div>
    );
}
