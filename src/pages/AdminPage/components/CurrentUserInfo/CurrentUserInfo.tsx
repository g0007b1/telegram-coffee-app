import ClientCard from './components/ClientCard';
import Information from './components/Information';

import styles from './CurrentUserInfo.module.scss';

const CurrentUserInfo = () => {
    return (
        <div className={styles.currentUserInfoContainer}>
            <Information />
            <ClientCard />
        </div>
    );
};

export default CurrentUserInfo;
