import { selectTodayStatistic } from 'pages/AdminPage/AdminPage.selectors';
import { useAppSelector } from 'redux/hooks';

import { countTodayStatistic } from '../../TodayBarChart.utils';

import styles from './StatisticInfo.module.scss';

const StatisticInfo = () => {
    const todayStatistic = useAppSelector(selectTodayStatistic);

    if (!todayStatistic) return null;

    const clientCount = countTodayStatistic(todayStatistic);

    return (
        <div className={styles.statisticInfoContainer}>
            <div className={styles.statItem}>
                Клиентов:{' '}
                <div className={styles.bold}>{clientCount.clientsCount}</div>
            </div>
            <div className={styles.statItem}>
                Выручка:{' '}
                <div className={styles.bold}>{clientCount.totalPrice}р.</div>
            </div>
            <div className={styles.statItem}>
                Продано позиций:{' '}
                <div className={styles.bold}>{clientCount.coffeeCount}</div>
            </div>
            <div className={styles.statItem}>
                Продано кофе:{' '}
                <div className={styles.bold}>{clientCount.totalSellCoffee}</div>
            </div>
            <div className={styles.statItem}>
                Продано НЕ кофе:{' '}
                <div className={styles.bold}>
                    {clientCount.totalSellNotCoffee}
                </div>
            </div>
            <div className={styles.statItem}>
                Подарочных напитков:{' '}
                <div className={styles.bold}>{clientCount.totalFreeCoffee}</div>
            </div>
        </div>
    );
};

export default StatisticInfo;
