import Footer from 'components/Footer';
import { useAppSelector } from 'redux/hooks';
import { selectAuth } from 'redux/slices/auth.selectors';

import History from './components/History';
import Info from './components/Info';
import { calcCurrentStatus } from './components/Info/Info.utils';
import MyCapybara from './components/MyCapybara';

import styles from './UserInformationPage.module.scss';

const UserInformationPage = () => {
    const authData = useAppSelector(selectAuth);

    const currentStat = calcCurrentStatus(
        authData.currentAmountOfCups ? authData.currentAmountOfCups : 0
    );
    return (
        <>
            <Footer />
            <div className={styles.pageContainer}>
                <Info userStatistic={currentStat} />
                <MyCapybara userStatistic={currentStat} />
                <History />
            </div>
        </>
    );
};

export default UserInformationPage;
