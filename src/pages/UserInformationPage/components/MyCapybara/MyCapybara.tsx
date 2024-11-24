import { type FC } from 'react';

import { bigImagesByStatus } from './MyCapybara.constants';

import styles from './MyCapybara.module.scss';

type MyCapybaraPropsType = {
    userStatistic: {
        currentStat: string;
        currentCapybara: string;
    };
};

const MyCapybara: FC<MyCapybaraPropsType> = ({ userStatistic }) => {
    const status = userStatistic.currentStat as keyof typeof bigImagesByStatus;
    return (
        <div>
            <h2 className={styles.header}>Твоя капибара</h2>
            <div className={styles.speechBubble}>
                Я - {userStatistic.currentStat.toLowerCase()}
            </div>
            <img className={styles.image} src={bigImagesByStatus[status]} />
        </div>
    );
};

export default MyCapybara;
