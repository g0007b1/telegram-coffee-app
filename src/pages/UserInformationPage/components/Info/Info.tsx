import { type FC } from 'react';

import { useAppSelector } from 'redux/hooks';
import { selectAuth } from 'redux/slices/auth.selectors';

import styles from './Info.module.scss';

type InfoPropsType = {
    userStatistic: {
        currentStat: string;
        currentCapybara: string;
    };
};

const Info: FC<InfoPropsType> = ({ userStatistic }) => {
    const authData = useAppSelector(selectAuth);

    return (
        <div className={styles.infoContainer}>
            <div>
                <img
                    className={styles.avatar}
                    src={userStatistic.currentCapybara}
                />
            </div>
            <div>
                <div>
                    {authData.first_name} {authData.last_name}
                </div>
                <div>
                    Статус:{' '}
                    <span className={styles.bold}>
                        {userStatistic.currentStat}
                    </span>
                </div>
                <div>
                    Выпито кофе:{' '}
                    <span className={styles.bold}>
                        {authData.currentAmountOfCups}
                    </span>
                </div>
                <div>
                    Закрыто карточек:{' '}
                    <span className={styles.bold}>
                        {authData.currentAmountOfCups &&
                            Math.trunc(authData.currentAmountOfCups / 8)}
                    </span>
                </div>
                <div></div>
            </div>
        </div>
    );
};

export default Info;
