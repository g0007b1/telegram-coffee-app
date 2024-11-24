import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { database } from 'firebase';
import { get, ref } from 'firebase/database';

import { type TodayStatisticType } from 'pages/AdminPage/AdminPage.slice';
import {
    selectSelectedMonth,
    selectSelectedYear,
} from 'pages/SuperAdminStatisticPage/SuperAdminStatisticPage.selectors';
import {
    setCurrentCountedStatistic,
    setCurrentDayStatistic,
    setCurrentHeader,
    setMonthMode,
    setSelectedMonth,
    setSelectedYear,
} from 'pages/SuperAdminStatisticPage/SuperAdminStatisticPage.slice';
import { countTodayStatistic } from 'pages/SuperAdminStatisticPage/SuperAdminStatisticPage.utils';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

import 'react-calendar/dist/Calendar.css';
import styles from './SelectCalendar.module.scss';

type ValuePiece = Date | null;

const SelectCalendar = () => {
    const [value, onChange] = useState<ValuePiece>(new Date());

    const dispatch = useAppDispatch();

    const selectedMonth = useAppSelector(selectSelectedMonth);
    const selectedYear = useAppSelector(selectSelectedYear);

    const onChangeValue = (value: ValuePiece) => {
        if (!value) return;

        onChange(value);

        const year = value.getFullYear();
        const month = value.getMonth() + 1;
        const day = value.getDate();

        const dbRef = ref(database, `statistic/${year}/${month}/${day}`);

        get(dbRef).then((snapshot) => {
            if (snapshot.exists()) {
                dispatch(setCurrentDayStatistic(snapshot.val()));

                const todayStatistic = countTodayStatistic(
                    snapshot.val() as TodayStatisticType
                );

                dispatch(setCurrentCountedStatistic(todayStatistic));
            } else {
                dispatch(setCurrentDayStatistic(null));
            }
        });
        dispatch(setCurrentHeader(`${day}.${month}.${year}`));
        dispatch(setMonthMode(false));
    };

    const onChangeSelectedMonth = (activeStartDate: Date | null) => {
        if (activeStartDate) {
            const month = activeStartDate.getMonth() + 1;
            const year = activeStartDate.getFullYear();

            if (month !== selectedMonth) {
                dispatch(setSelectedMonth(month));
            }
            if (selectedYear !== year) {
                dispatch(setSelectedYear(year));
            }
        }
    };

    useEffect(() => {
        if (value) {
            const year = value.getFullYear();
            const month = value.getMonth() + 1;
            const day = value.getDate();

            const dbRef = ref(database, `statistic/${year}/${month}/${day}`);

            get(dbRef).then((snapshot) => {
                if (snapshot.exists()) {
                    dispatch(setCurrentDayStatistic(snapshot.val()));
                    const todayStatistic = countTodayStatistic(
                        snapshot.val() as TodayStatisticType
                    );
                    dispatch(setCurrentCountedStatistic(todayStatistic));
                } else {
                    // сообщение "Пока нет данных :("
                    console.log('Добавь строку что данных нет еще');
                }
            });

            dispatch(setCurrentHeader(`${day}.${month}.${year}`));
            dispatch(setSelectedMonth(month));
            dispatch(setSelectedYear(year));
        }
    }, []);

    return (
        <div className={styles.calendarContainer}>
            <Calendar
                onActiveStartDateChange={({ activeStartDate }) => {
                    onChangeSelectedMonth(activeStartDate);
                }}
                tileClassName={styles.tile}
                selectRange={false}
                onChange={onChangeValue as any}
                value={value}
            />
        </div>
    );
};

export default SelectCalendar;
