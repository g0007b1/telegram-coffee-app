import { type FC } from 'react';
import clsx from 'clsx';

import { type TabType } from 'pages/SuperAdminStatisticPage/SuperAdminStatisticPage.types';

import styles from './SelectStatisticButtons.module.scss';

type SelectStatisticButtonsPropsType = {
    setTab: (tab: TabType) => void;
    activeTab: TabType;
};

const SelectStatisticButtons: FC<SelectStatisticButtonsPropsType> = ({
    setTab,
    activeTab,
}) => {
    const onSelectTab = (tab: TabType) => () => {
        setTab(tab);
    };

    return (
        <div className={styles.selectButtonsContainer}>
            <div
                onClick={onSelectTab('general')}
                className={clsx(activeTab === 'general' && styles.activeTab)}
            >
                Общее
            </div>
            <div>|</div>
            <div
                onClick={onSelectTab('category')}
                className={clsx(activeTab === 'category' && styles.activeTab)}
            >
                По категориям
            </div>
            <div>|</div>
            <div
                onClick={onSelectTab('volumes')}
                className={clsx(activeTab === 'volumes' && styles.activeTab)}
            >
                Объемы
            </div>
        </div>
    );
};

export default SelectStatisticButtons;
