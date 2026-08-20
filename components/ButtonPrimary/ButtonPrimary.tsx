import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import css from './ButtonPrimary.module.css';

interface CommonProps {
    children: ReactNode;
    padding?: string;
    fullWidth?: boolean;
    className?: string;
}

interface ButtonAsButton
    extends CommonProps,
        Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'style' | 'children'> {
    href?: undefined;
}

interface ButtonAsLink
    extends CommonProps,
        Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'style' | 'children'> {
    href: string;
}

type ButtonPrimaryProps = ButtonAsButton | ButtonAsLink;

export default function ButtonPrimary({
    children,
    padding,
    fullWidth,
    className,
    href,
    ...rest
}: ButtonPrimaryProps) {
    const classes = `${css.button} ${fullWidth ? css.fullWidth : ''} ${className ?? ''}`.trim();
    const style = padding ? { padding } : undefined;

    if (href !== undefined) {
        return (
            <Link
                href={href}
                className={classes}
                style={style}
                {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
            >
                {children}
            </Link>
        );
    }

    return (
        <button
            type="button"
            className={classes}
            style={style}
            {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
        >
            {children}
        </button>
    );
}
