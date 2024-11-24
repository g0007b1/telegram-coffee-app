import { type FC, type MouseEventHandler } from 'react';

import { selectCurrentCart } from 'pages/AdminPage/AdminPage.selectors';
import { useAppSelector } from 'redux/hooks';

import CartFooter from './components/CartFooter';
import CartItem from './components/CartItem';

import styles from './CartModal.module.scss';

type CartModalPropsType = {
    close: () => void;
};

const CartModal: FC<CartModalPropsType> = ({ close }) => {
    const currentCart = useAppSelector(selectCurrentCart);

    console.log(currentCart);

    if (!currentCart) return null;

    const onClickStopPropagation: MouseEventHandler<HTMLDivElement> = (
        event
    ) => {
        event.stopPropagation();
    };

    return (
        <div onClick={close} className={styles.alertContainer}>
            <div onClick={onClickStopPropagation} className={styles.alert}>
                <h3 className={styles.header}>Чек</h3>
                <div className={styles.listContainer}>
                    {Object.keys(currentCart).map((sec, index) => (
                        <CartItem
                            index={index}
                            itemKey={sec}
                            item={currentCart[sec as any]}
                            key={sec}
                        />
                    ))}
                </div>
                <CartFooter />
            </div>
        </div>
    );
};

export default CartModal;
