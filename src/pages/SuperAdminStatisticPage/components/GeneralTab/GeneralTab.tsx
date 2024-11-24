import DayStatistic from './components/DayStatistic';
import MostPurchase from './components/MostPurchase';

import styles from './GeneralTab.module.scss';

const GeneralTab = () => {
    return (
        <div className={styles.generalTabContainer}>
            <DayStatistic />
            <MostPurchase />
        </div>
    );
};

export default GeneralTab;
