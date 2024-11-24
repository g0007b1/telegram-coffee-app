import { selectCurrentCountedStatistic } from 'pages/SuperAdminStatisticPage/SuperAdminStatisticPage.selectors';
import { sortMostPurchaseItems } from 'pages/SuperAdminStatisticPage/SuperAdminStatisticPage.utils';
import { useAppSelector } from 'redux/hooks';

import styles from './CategoryTab.module.scss';

export const CategoryTab = () => {
    const currentCountedStatistic = useAppSelector(
        selectCurrentCountedStatistic
    );

    if (!currentCountedStatistic) return null;

    return (
        <div className={styles.categoryTabContainer}>
            <div className={styles.marginContainer}>
                {Object.keys(currentCountedStatistic.countedItemsCategory).map(
                    (category) => {
                        const sortableCategory = sortMostPurchaseItems(
                            currentCountedStatistic.countedItemsCategory[
                                category as any
                            ]
                        );

                        return (
                            <div key={category}>
                                <h3 className={styles.header}>
                                    {category.substring(1)}
                                </h3>
                                {sortableCategory.map((item, index) => (
                                    <div className={styles.item} key={item[0]}>
                                        <div>{index + 1})</div>
                                        <div className={styles.namePrice}>
                                            <div>{item[0]}</div>
                                            <div>{item[1]} шт.</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        );
                    }
                )}
            </div>
        </div>
    );
};

export default CategoryTab;
