import { type FC } from 'react';

import { selectCurrentHeader } from 'pages/SuperAdminStatisticPage/SuperAdminStatisticPage.selectors';
import { type TabType } from 'pages/SuperAdminStatisticPage/SuperAdminStatisticPage.types';
import { useAppSelector } from 'redux/hooks';

import SelectStatisticButtons from './components/SelectStatisticButtons';

import styles from './SelectStatisticType.module.scss';

type SelectStatisticTypePropsType = {
    setTab: (tab: TabType) => void;
    activeTab: TabType;
};

const SelectStatisticType: FC<SelectStatisticTypePropsType> = ({
    setTab,
    activeTab,
}) => {
    const currentHeader = useAppSelector(selectCurrentHeader);

    return (
        <div className={styles.statisticsContainer}>
            <div className={styles.headerContainer}>
                <h2 className={styles.header}>Статистика на {currentHeader}</h2>
            </div>
            <SelectStatisticButtons activeTab={activeTab} setTab={setTab} />
        </div>
    );
};

export default SelectStatisticType;
