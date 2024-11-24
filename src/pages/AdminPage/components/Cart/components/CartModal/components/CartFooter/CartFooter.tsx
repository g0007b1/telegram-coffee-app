import clsx from 'clsx';
import { database } from 'firebase';
import { get, ref, set, update } from 'firebase/database';

import {
    selectCurrentCart,
    selectCurrentFreeCoffee,
    selectCurrentUserInfo,
} from 'pages/AdminPage/AdminPage.selectors';
import {
    clearCart,
    setCurrentFreeCoffee,
    setCurrentScanId,
    setCurrentUserInfo,
} from 'pages/AdminPage/AdminPage.slice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { type AuthStateType } from 'types/globalTypes';

import { calcTotalSum } from '../../CartModal.utils';

import styles from './CartFooter.module.scss';

const CartFooter = () => {
    const dispatch = useAppDispatch();

    const currentCart = useAppSelector(selectCurrentCart);
    const currentUserInfo = useAppSelector(selectCurrentUserInfo);

    if (!currentCart) return null;
    if (!currentUserInfo) return null;

    const currentFreeCoffee = useAppSelector(selectCurrentFreeCoffee);

    const totalSum = calcTotalSum(currentCart, currentFreeCoffee);

    const currentAmountOfCups = currentUserInfo.currentAmountOfCups;

    const currentCardProgression = currentAmountOfCups
        ? currentAmountOfCups % 8
        : 0;

    const needSetFreeCoffee = currentCardProgression + totalSum.stamp >= 8;

    const isButtonDisabled = needSetFreeCoffee && !currentFreeCoffee;

    console.log('needSetFreeCoffee', needSetFreeCoffee);
    console.log('isButtonDisabled', isButtonDisabled);
    console.log('currentFreeCoffee', currentFreeCoffee);

    const onSetCheck = () => {
        if (!isButtonDisabled) {
            const now = new Date();
            const year = now.getFullYear();
            const month = now.getMonth() + 1;
            const day = now.getDate();
            const hour = now.getHours();

            Object.keys(currentCart).forEach((milliseconds) => {
                if (+milliseconds === currentFreeCoffee) {
                    const currObj = currentCart[milliseconds as any];
                    set(
                        ref(
                            database,
                            // ВОТ ТУТ ПОПРАВЬ ЧАС НЕ ЗАБУДЬ
                            `statistic/${year}/${month}/${day}/${hour}/${currentUserInfo.id}/${milliseconds}`
                        ),
                        {
                            adminUserId: currObj.adminUserId,
                            category: currObj.category,
                            name: currObj.name,
                            price: 0,
                            stamp: currObj.stamp,
                            volumeName: currObj.volumeName,
                        }
                    );

                    set(
                        ref(
                            database,
                            // ДОБАВЬ СЛОЙ ДЛЯ ЧИСЛА!!!
                            `users/${currentUserInfo.id}/history/${hour}/${milliseconds}`
                        ),
                        {
                            adminUserId: currObj.adminUserId,
                            category: currObj.category,
                            name: currObj.name,
                            price: 0,
                            stamp: currObj.stamp,
                            volumeName: currObj.volumeName,
                        }
                    );
                } else {
                    set(
                        ref(
                            database,
                            `statistic/${year}/${month}/${day}/${hour}/${currentUserInfo.id}/${milliseconds}`
                        ),
                        currentCart[milliseconds as any]
                    );

                    set(
                        ref(
                            database,
                            // ДОБАВЬ СЛОЙ ДЛЯ ЧИСЛА!!!
                            `users/${currentUserInfo.id}/history/${hour}/${milliseconds}`
                        ),
                        currentCart[milliseconds as any]
                    );
                }
            });

            if (
                totalSum.stamp > 0 &&
                currentUserInfo.currentAmountOfCups !== null
            ) {
                const currentUserRef = ref(
                    database,
                    `users/${currentUserInfo.id}`
                );
                get(currentUserRef).then((snapshot) => {
                    if (snapshot.exists()) {
                        const currentUserData: AuthStateType = snapshot.val();
                        const updates: any = {};
                        if (currentUserData.currentAmountOfCups !== null) {
                            updates[
                                `users/${currentUserInfo.id}/currentAmountOfCups`
                            ] =
                                currentUserData.currentAmountOfCups +
                                totalSum.stamp;
                            update(ref(database), updates as object);
                        }
                    }
                });
            }

            dispatch(setCurrentScanId(null));
            dispatch(setCurrentUserInfo(null));
            dispatch(setCurrentFreeCoffee(null));
            dispatch(clearCart());
        }
    };

    return (
        <div className={styles.footerContainer}>
            <div className={styles.addButtonAlertContainer}>
                <div
                    className={clsx(
                        styles.button,
                        isButtonDisabled && styles.disabled
                    )}
                    onClick={onSetCheck}
                >
                    Добавить
                </div>
                {needSetFreeCoffee && !currentFreeCoffee && (
                    <div className={styles.alertMessage}>
                        поставь бесплатный кофе!
                    </div>
                )}
                {!isButtonDisabled && <div className={styles.emptyMessage} />}
            </div>
            <div className={styles.totalContainer}>
                <div className={styles.totalSumStamp}>
                    <div>{'Итого:' + ' '}</div>
                    <div className={styles.bold}>{totalSum.sum}р.</div>
                </div>
                <div className={styles.totalSumStamp}>
                    <div> {'Штампов:' + ' '}</div>{' '}
                    <div className={styles.bold}>{totalSum.stamp}шт.</div>
                </div>
            </div>
        </div>
    );
};

export default CartFooter;
