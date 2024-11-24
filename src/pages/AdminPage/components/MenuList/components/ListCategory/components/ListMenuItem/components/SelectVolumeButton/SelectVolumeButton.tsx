import { type FC, useState } from 'react';
import clsx from 'clsx';

import Button from 'components/Button';
import { selectCurrentCart } from 'pages/AdminPage/AdminPage.selectors';
import { deleteFromCart, pushToCart } from 'pages/AdminPage/AdminPage.slice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectUserId } from 'redux/slices/auth.selectors';
import { type TypeOrNull } from 'types/globalTypes';

import styles from './SelectVolumeButton.module.scss';

type SelectVolumeButtonType = {
    volumeName: string;
    name: string;
    price: number;
    stamp: boolean;
    category: string;
};

const SelectVolumeButton: FC<SelectVolumeButtonType> = ({
    volumeName,
    name,
    price,
    stamp,
    category,
}) => {
    const dispatch = useAppDispatch();

    const currentCart = useAppSelector(selectCurrentCart);

    const adminUserId = useAppSelector(selectUserId);

    const [clicked, setClicked] = useState(false);
    const [sec, setSec] = useState<TypeOrNull<number>>(null);

    const onClick = () => {
        if (clicked) {
            dispatch(deleteFromCart(sec));
            setSec(null);
            setClicked(false);
        } else {
            if (!currentCart) {
                const date = new Date();
                const sec = date.getTime();

                setSec(sec);
                dispatch(
                    pushToCart({
                        [sec]: {
                            name,
                            volumeName,
                            price,
                            adminUserId,
                            category,
                            stamp,
                        },
                    })
                );
                setClicked(true);
            } else if (Object.keys(currentCart).length < 5) {
                const date = new Date();
                const sec = date.getTime();

                setSec(sec);
                dispatch(
                    pushToCart({
                        [sec]: {
                            name,
                            volumeName,
                            price,
                            adminUserId,
                            category,
                            stamp,
                        },
                    })
                );
                setClicked(true);
            }
        }
    };

    return (
        <Button
            className={clsx(styles.button, clicked && styles.greenBackground)}
            onClick={onClick}
            innerText={volumeName}
        />
    );
};

export default SelectVolumeButton;
