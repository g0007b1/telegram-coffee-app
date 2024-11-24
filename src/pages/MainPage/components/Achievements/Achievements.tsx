import { useAppSelector } from 'redux/hooks';
import { selectUserCurrentAmountOfCups } from 'redux/slices/auth.selectors';

import SingleAchievement from './components/SingleAchievement';
import { achievements } from './Achievements.constants';

import styles from './Achievements.module.scss';

const Achievements = () => {
    const currentAmountOfCups = useAppSelector(selectUserCurrentAmountOfCups);

    if (currentAmountOfCups === null) return null;

    return (
        <div className={styles.achievementsContainer}>
            {achievements.map((achievement) => (
                <SingleAchievement
                    currentAmountOfCups={currentAmountOfCups}
                    achievement={achievement}
                    key={achievement.name}
                />
            ))}
        </div>
    );
};

export default Achievements;
