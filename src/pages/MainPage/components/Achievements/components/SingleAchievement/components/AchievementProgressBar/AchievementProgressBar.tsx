import { type FC } from 'react';

type AchievementProgressBarPropsType = {
    bgcolor: string;
    completed: number;
};

const AchievementProgressBar: FC<AchievementProgressBarPropsType> = (props) => {
    const { bgcolor, completed } = props;

    const containerStyles = {
        height: 10,
        width: '100%',
        backgroundColor: '#e0e0de',
        borderRadius: 50,
    };

    const fillerStyles: any = {
        height: '100%',
        width: `${completed}%`,
        backgroundColor: bgcolor,
        borderRadius: 'inherit',
        textAlign: 'right',
    };

    return (
        <div style={containerStyles}>
            <div style={fillerStyles}></div>
        </div>
    );
};

export default AchievementProgressBar;
