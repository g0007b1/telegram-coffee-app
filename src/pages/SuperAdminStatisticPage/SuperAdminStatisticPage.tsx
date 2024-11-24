import { useEffect, useState } from 'react';

import SuperAdminError from 'components/AdminError';
import Footer from 'components/Footer';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectAdminData } from 'redux/slices/admin.selectors';

import CategoryTab from './components/CategoryTab';
import CurrentDayBarChart from './components/CurrentDayBarChart';
import GeneralTab from './components/GeneralTab';
import SelectCalendar from './components/SelectCalendar';
import SelectStatisticType from './components/SelectStatisticType';
import VolumesTab from './components/VolumesTab';
import {
    setCurrentCountedStatistic,
    setCurrentDayStatistic,
    setCurrentHeader,
    setCurrentMonthStatistic,
    setMonthMode,
    setSelectedMonth,
    setSelectedYear,
} from './SuperAdminStatisticPage.slice';

import { type TabType } from './SuperAdminStatisticPage.types';

const SuperAdminStatisticPage = () => {
    const { isAdmin } = useAppSelector(selectAdminData);

    const dispatch = useAppDispatch();

    if (!isAdmin) {
        return <SuperAdminError />;
    }

    const [currentTab, setCurrentTab] = useState<TabType>('general');

    const setTab = (tab: TabType) => {
        setCurrentTab(tab);
    };

    useEffect(() => {
        return () => {
            dispatch(setCurrentDayStatistic(null));
            dispatch(setCurrentMonthStatistic(null));
            dispatch(setCurrentCountedStatistic(null));
            dispatch(setCurrentHeader(null));
            dispatch(setSelectedMonth(null));
            dispatch(setSelectedYear(null));
            dispatch(setMonthMode(false));
        };
    }, []);

    return (
        <>
            <Footer />
            <SelectCalendar />
            <CurrentDayBarChart />
            <SelectStatisticType activeTab={currentTab} setTab={setTab} />
            {currentTab === 'general' && <GeneralTab />}
            {currentTab === 'category' && <CategoryTab />}
            {currentTab === 'volumes' && <VolumesTab />}
        </>
    );
};

export default SuperAdminStatisticPage;
