/* eslint-disable max-len */
import { type FC } from 'react';

import AchievementProgressBar from './components/AchievementProgressBar';
import { type AchievementType } from '../../Achievements.constants';

import styles from './SingleAchievement.module.scss';

type SingleAchievementPropsType = {
    achievement: AchievementType;
    currentAmountOfCups: number;
};

const SingleAchievement: FC<SingleAchievementPropsType> = ({
    achievement,
    currentAmountOfCups,
}) => {
    const currentPercent = (currentAmountOfCups / achievement.needAmount) * 100;
    return (
        <div className={styles.singleAchievementContainer}>
            <div className={styles.hiddenAchievement}></div>
            <img
                className={styles.achievementImage}
                src={achievement.image}
            ></img>
            <div className={styles.nameDescriptionBarContainer}>
                <div className={styles.achievementName}>{achievement.name}</div>
                <div className={styles.achievementDescription}>
                    {achievement.description}
                    {/* {' ' +
                        `(${currentAmountOfCups > achievement.needAmount ? 'завершено' : `${currentAmountOfCups}/${achievement.needAmount}`})`} */}
                </div>
                <div style={{ width: '100%' }}>
                    <AchievementProgressBar
                        bgcolor="black"
                        completed={
                            currentPercent < 100
                                ? (currentAmountOfCups /
                                      achievement.needAmount) *
                                  100
                                : 100
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default SingleAchievement;
