import CategoryVolumes from './components/CategoryVolumes';
import VolumesStatistic from './components/VolumesStatistic';

import styles from './VolumesTab.module.scss';

const VolumesTab = () => {
    return (
        <div className={styles.volumesTabContainer}>
            <div className={styles.marginContainer}>
                <VolumesStatistic />
                <CategoryVolumes />
            </div>
        </div>
    );
};

export default VolumesTab;
