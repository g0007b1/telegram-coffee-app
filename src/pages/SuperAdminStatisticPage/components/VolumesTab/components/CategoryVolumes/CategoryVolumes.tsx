import {
    selectCurrentCountedStatistic,
    selectCurrentDayStatistic,
} from 'pages/SuperAdminStatisticPage/SuperAdminStatisticPage.selectors';
import { useAppSelector } from 'redux/hooks';

import styles from './CategoryVolumes.module.scss';

const CategoryVolumes = () => {
    const currentCountedStatistic = useAppSelector(
        selectCurrentCountedStatistic
    );

    if (!currentCountedStatistic) return null;

    const volumesCategory = currentCountedStatistic.countedVolumesCategory;

    return (
        <div className={styles.margin}>
            {Object.keys(volumesCategory).map((category) => {
                return (
                    <div key={category}>
                        <h3 className={styles.header}>
                            {category.substring(1)}
                        </h3>
                        {Object.keys(volumesCategory[category]).map(
                            (item, index) => (
                                <div className={styles.item} key={item}>
                                    <div>{index + 1})</div>
                                    <div className={styles.namePrice}>
                                        <div>{item}:</div>

                                        {Object.keys(
                                            volumesCategory[category][item]
                                        ).map((volume) => {
                                            return (
                                                <div
                                                    className={
                                                        styles.volumeName
                                                    }
                                                    key={volume}
                                                >
                                                    <div>{volume}: </div>
                                                    <div
                                                        className={styles.bold}
                                                    >
                                                        {
                                                            volumesCategory[
                                                                category
                                                            ][item][volume]
                                                        }
                                                        шт.
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default CategoryVolumes;
