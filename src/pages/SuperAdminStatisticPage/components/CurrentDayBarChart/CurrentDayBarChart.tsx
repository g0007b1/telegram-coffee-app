import { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import clsx from 'clsx';
import { database } from 'firebase';
import { get, ref } from 'firebase/database';

import { type TodayStatisticType } from 'pages/AdminPage/AdminPage.slice';
import { xAxis } from 'pages/AdminPage/components/TodayBarChart/TodayBarChart.constants';
import { calcSeries } from 'pages/AdminPage/components/TodayBarChart/TodayBarChart.utils';
import {
    selectCurrentDayStatistic,
    selectSelectedMonth,
    selectSelectedYear,
} from 'pages/SuperAdminStatisticPage/SuperAdminStatisticPage.selectors';
import {
    setCurrentCountedStatistic,
    setCurrentHeader,
    setCurrentMonthStatistic,
    setMonthMode,
} from 'pages/SuperAdminStatisticPage/SuperAdminStatisticPage.slice';
import { countMonthStatistic } from 'pages/SuperAdminStatisticPage/SuperAdminStatisticPage.utils';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

import styles from './CurrentDayBarChart.module.scss';

const CurrentDayBarChart = () => {
    const currentDayStatistic = useAppSelector(selectCurrentDayStatistic);
    const selectedMonth = useAppSelector(selectSelectedMonth);
    const selectedYear = useAppSelector(selectSelectedYear);

    const dispatch = useAppDispatch();

    const [disabled, setDisabled] = useState(true);

    const series = calcSeries(currentDayStatistic);

    const onClick = () => {
        if (!disabled) {
            const dbRef = ref(
                database,
                `statistic/${selectedYear}/${selectedMonth}`
            );

            get(dbRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const monthStatistic = countMonthStatistic(
                        snapshot.val() as Record<string, TodayStatisticType>
                    );

                    console.log(monthStatistic);

                    dispatch(setCurrentMonthStatistic(snapshot.val()));
                    dispatch(setMonthMode(true));
                    dispatch(setCurrentCountedStatistic(monthStatistic));
                }
            });

            dispatch(setCurrentHeader('месяц'));
        }
    };

    useEffect(() => {
        const dbRef = ref(
            database,
            `statistic/${selectedYear}/${selectedMonth}`
        );

        get(dbRef).then((snapshot) => {
            if (snapshot.exists()) {
                setDisabled(false);
            } else {
                setDisabled(true);
            }
        });
    }, [selectedYear, selectedMonth]);

    return (
        <div>
            <div
                className={clsx(styles.button, disabled && styles.disabled)}
                onClick={onClick}
            >
                <span className={styles.span}>за месяц</span>
            </div>
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

export default CurrentDayBarChart;
