import clsx from 'clsx';

import {
    selectCurrentCountedStatistic,
    selectCurrentDayStatistic,
} from 'pages/SuperAdminStatisticPage/SuperAdminStatisticPage.selectors';
import { sortMostPurchaseItems } from 'pages/SuperAdminStatisticPage/SuperAdminStatisticPage.utils';
import { useAppSelector } from 'redux/hooks';

import styles from './MostPurchase.module.scss';

const MostPurchase = () => {
    const currentCountedStatistic = useAppSelector(
        selectCurrentCountedStatistic
    );

    if (!currentCountedStatistic) return null;

    const sortablePurchases = sortMostPurchaseItems(
        currentCountedStatistic.countedItems
    );

    const sortableCountedVolumesItems = sortMostPurchaseItems(
        currentCountedStatistic.countedVolumesItems
    );

    return (
        <div className={styles.mostPurchaseContainer}>
            <div className={clsx(styles.listContainer)}>
                <h4 className={styles.header}>Больше всего купили:</h4>
                <div className={styles.list}>
                    {sortablePurchases.map((purchase, index) => (
                        <div
                            style={{ fontSize: 'small' }}
                            className={styles.purchase}
                            key={purchase[0]}
                        >
                            <div>{index + 1})</div>
                            <div className={styles.namePrice}>
                                <div>{purchase[0]}</div>
                                <div className={styles.bold}>
                                    {purchase[1]}шт.
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.listContainer}>
                <h4 className={styles.header}>Конкретные напитки:</h4>
                <div className={clsx(styles.list, styles.borderLeft)}>
                    {sortableCountedVolumesItems.map((purchase, index) => (
                        <div
                            style={{ fontSize: 'small' }}
                            className={styles.purchase}
                            key={purchase[0]}
                        >
                            <div>{index + 1})</div>
                            <div className={styles.namePrice}>
                                <div>{purchase[0]}</div>
                                <div className={styles.bold}>
                                    {purchase[1]}шт.
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MostPurchase;
