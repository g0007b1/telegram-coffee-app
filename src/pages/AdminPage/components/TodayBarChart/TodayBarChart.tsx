import { useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { database } from 'firebase';
import { get, onValue, ref } from 'firebase/database';

import { selectTodayStatistic } from 'pages/AdminPage/AdminPage.selectors';
import { setTodayStatistic } from 'pages/AdminPage/AdminPage.slice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

import StatisticInfo from './components/StatisticInfo';
import { xAxis } from './TodayBarChart.constants';
import { calcSeries } from './TodayBarChart.utils';

import styles from './TodayBarChart.module.scss';

const TodayBarChart = () => {
    const dispatch = useAppDispatch();

    const todayStatistic = useAppSelector(selectTodayStatistic);

    const series = calcSeries(todayStatistic);

    useEffect(() => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();

        const dbRef = ref(database, `statistic/${year}/${month}/${day}`);

        get(dbRef).then((snapshot) => {
            if (snapshot.exists()) {
                dispatch(setTodayStatistic(snapshot.val()));
            } else {
                // сообщение "Пока нет данных :("
                console.log('Добавь строку что данных нет еще');
            }
        });

        return onValue(dbRef, (snapshot) => {
            if (snapshot.exists()) {
                dispatch(setTodayStatistic(snapshot.val()));
            }
        });
    }, []);

    return (
        <div className={styles.statisticsContainer}>
            <div className={styles.headerContainer}>
                <h2 className={styles.header}>Статистика на сегодня</h2>
            </div>
            <StatisticInfo />
            <BarChart
                xAxis={xAxis as any}
                series={[
                    {
                        data: series,
                        color: '#04AA6D',
                    },
                ]}
                height={200}
            />
        </div>
    );
};

export default TodayBarChart;
