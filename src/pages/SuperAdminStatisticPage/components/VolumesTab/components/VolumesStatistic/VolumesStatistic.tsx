import {
    selectCurrentCountedStatistic,
    selectCurrentDayStatistic,
} from 'pages/SuperAdminStatisticPage/SuperAdminStatisticPage.selectors';
import { sortMostPurchaseItems } from 'pages/SuperAdminStatisticPage/SuperAdminStatisticPage.utils';
import { useAppSelector } from 'redux/hooks';

import styles from './VolumesStatistic.module.scss';

const VolumesStatistic = () => {
    const currentCountedStatistic = useAppSelector(
        selectCurrentCountedStatistic
    );
    const currentDayStatistic = useAppSelector(selectCurrentDayStatistic);

    if (!currentCountedStatistic) return null;
    if (!currentDayStatistic) return null;

    const sortedVolumes = sortMostPurchaseItems(
        currentCountedStatistic.countedVolumes
    );
    return (
        <div className={styles.volumesStatisticContainer}>
            {sortedVolumes.map((volume) => {
                return (
                    <div className={styles.item} key={volume[0]}>
                        <div>{volume[0]}</div>
                        <div className={styles.bold}>{volume[1]}шт</div>
                    </div>
                );
            })}
        </div>
    );
};

export default VolumesStatistic;
