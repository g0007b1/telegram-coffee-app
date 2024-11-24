import { type FC } from 'react';
import clsx from 'clsx';

import styles from './Button.module.scss';

type ButtonPropsType = {
    className: string;
    innerText: string;
    onClick: any;
    disabled?: boolean;
};

const Button: FC<ButtonPropsType> = ({
    className,
    innerText,
    onClick,
    disabled = false,
}) => {
    return (
        <button
            disabled={disabled}
            className={clsx(styles.button, className)}
            onClick={onClick}
        >
            {innerText}
        </button>
    );
};

export default Button;
