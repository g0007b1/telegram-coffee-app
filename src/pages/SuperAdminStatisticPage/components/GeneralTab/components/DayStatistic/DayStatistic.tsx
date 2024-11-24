import {
    countMonthStatistic,
    countTodayStatistic,
} from 'pages/AdminPage/components/TodayBarChart/TodayBarChart.utils';
import {
    selectCurrentDayStatistic,
    selectCurrentMonthStatistic,
    selectMonthMode,
} from 'pages/SuperAdminStatisticPage/SuperAdminStatisticPage.selectors';
import { useAppSelector } from 'redux/hooks';

import styles from './DayStatistic.module.scss';

const DayStatistic = () => {
    const currentDayStatistic = useAppSelector(selectCurrentDayStatistic);
    const monthStatistic = useAppSelector(selectCurrentMonthStatistic);

    const monthMode = useAppSelector(selectMonthMode);

    const clientCount = monthMode
        ? countMonthStatistic(monthStatistic)
        : countTodayStatistic(currentDayStatistic);

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

export default DayStatistic;
