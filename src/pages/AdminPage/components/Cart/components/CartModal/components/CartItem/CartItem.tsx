import { type FC } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import RedeemIcon from '@mui/icons-material/Redeem';
import clsx from 'clsx';

import {
    selectCurrentCart,
    selectCurrentFreeCoffee,
    selectCurrentUserInfo,
} from 'pages/AdminPage/AdminPage.selectors';
import {
    type CartItemType,
    deleteFromCart,
    pushToCart,
    setCurrentFreeCoffee,
} from 'pages/AdminPage/AdminPage.slice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

import { calcTotalSum } from '../../CartModal.utils';

import styles from './CartItem.module.scss';

type CartItemPropsType = {
    item: CartItemType;
    itemKey: string;
    index: number;
};
const CartItem: FC<CartItemPropsType> = ({ item, itemKey, index }) => {
    const dispatch = useAppDispatch();

    const currentFreeCoffee = useAppSelector(selectCurrentFreeCoffee);
    const currentUserInfo = useAppSelector(selectCurrentUserInfo);
    const currentCart = useAppSelector(selectCurrentCart);

    if (!currentCart) return null;
    if (!currentUserInfo) return null;

    const isCurrentFreeCoffee = currentFreeCoffee === +itemKey;

    const currentAmountOfCups = currentUserInfo.currentAmountOfCups;

    const currentCardProgression = currentAmountOfCups
        ? currentAmountOfCups % 8
        : 0;

    const totalSum = calcTotalSum(currentCart, currentFreeCoffee);

    const needSetFreeCoffee = currentCardProgression + totalSum.stamp >= 8;

    const onAddCopy = () => {
        const date = new Date();
        const sec = date.getTime();

        dispatch(
            pushToCart({
                [sec]: {
                    name: item.name,
                    volumeName: item.volumeName,
                    price: item.price,
                    adminUserId: item.adminUserId,
                    stamp: item.stamp,
                    category: item.category,
                },
            })
        );
    };

    const setFreeCoffee = () => {
        if (needSetFreeCoffee) dispatch(setCurrentFreeCoffee(+itemKey));
    };

    const onDeleteItem = () => {
        dispatch(deleteFromCart(itemKey));
        if (isCurrentFreeCoffee) {
            console.log(isCurrentFreeCoffee);
            dispatch(setCurrentFreeCoffee(null));
        }
    };

    return (
        <div className={styles.itemContainer}>
            <div className={styles.itemName}>
                {index + 1}) {item.name}
            </div>
            <div className={styles.buttonsPriceContainer}>
                <div>{item.volumeName}</div>
                <div className={styles.buttonsContainer}>
                    <div className={styles.center} onClick={onAddCopy}>
                        <AddBoxIcon sx={{ color: '#04AA6D' }} />
                    </div>
                    <div className={clsx(styles.center, styles.price)}>
                        {isCurrentFreeCoffee ? 0 : item.price}р.
                    </div>
                    <div className={styles.center} onClick={onDeleteItem}>
                        <DeleteIcon sx={{ color: '#f44336' }} />
                    </div>
                    {item.stamp && (
                        <div className={styles.center} onClick={setFreeCoffee}>
                            <RedeemIcon
                                sx={{
                                    color: isCurrentFreeCoffee
                                        ? '#04AA6D'
                                        : 'gray',
                                }}
                            />
                        </div>
                    )}
                    {!item.stamp && (
                        <div style={{ width: '24px', height: '24px' }} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartItem;
