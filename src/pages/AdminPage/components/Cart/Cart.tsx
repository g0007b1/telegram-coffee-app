import clsx from 'clsx';

import { useOpen } from 'hooks/useOpen';
import { selectCurrentCart } from 'pages/AdminPage/AdminPage.selectors';
import { useAppSelector } from 'redux/hooks';

import CartModal from './components/CartModal';

import styles from './Cart.module.scss';

const Cart = () => {
    const { open, close, isOpen } = useOpen();

    const currentCart = useAppSelector(selectCurrentCart);

    const isDisabled = currentCart && Object.keys(currentCart).length;

    const onClick = () => {
        isDisabled && open();
    };

    return (
        <>
            <div
                onClick={onClick}
                className={clsx(
                    styles.cartContainer,
                    !isDisabled && styles.disabled
                )}
            >
                Добавить
            </div>
            {isOpen && <CartModal close={close} />}
        </>
    );
};

export default Cart;
