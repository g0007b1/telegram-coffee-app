import { achievements } from 'pages/MainPage/components/Achievements/Achievements.constants';

export const calcCurrentStatus = (currentAmountOfCups: number) => {
    const statObj = {
        currentStat: '',
        currentCapybara: '',
    };

    achievements.forEach((achievement) => {
        if (currentAmountOfCups >= achievement.needAmount) {
            statObj.currentStat = achievement.name;
            statObj.currentCapybara = achievement.image;
        }
    });

    return statObj;
};
