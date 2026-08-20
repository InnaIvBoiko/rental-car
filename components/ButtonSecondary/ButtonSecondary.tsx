import type { ButtonHTMLAttributes, ReactNode } from 'react';
import css from './ButtonSecondary.module.css';

interface ButtonSecondaryProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'style'> {
    children: ReactNode;
    padding?: string;
    className?: string;
}

export default function ButtonSecondary({ children, padding, className, ...rest }: ButtonSecondaryProps) {
    const classes = `${css.button} ${className ?? ''}`.trim();
    const style = padding ? { padding } : undefined;

    return (
        <button type="button" className={classes} style={style} {...rest}>
            {children}
        </button>
    );
}
