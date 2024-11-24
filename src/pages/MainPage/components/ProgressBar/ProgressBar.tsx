import RedeemIcon from '@mui/icons-material/Redeem';

import CoffeeIcon from 'components/CoffeeIcon';
import { useAppSelector } from 'redux/hooks';
import { selectUserCurrentAmountOfCups } from 'redux/slices/auth.selectors';

import styles from './ProgressBar.module.scss';

const ProgressBar = () => {
    const currentAmountOfCups = useAppSelector(selectUserCurrentAmountOfCups);

    const currentCardProgression = currentAmountOfCups
        ? currentAmountOfCups % 8
        : 0;

    return (
        <div className={styles.progressBarContainer}>
            <div className={styles.iconsContainer}>
                <CoffeeIcon isFilled={currentCardProgression - 1 >= 0} />
                <CoffeeIcon isFilled={currentCardProgression - 2 >= 0} />
                <CoffeeIcon isFilled={currentCardProgression - 3 >= 0} />
                <CoffeeIcon isFilled={currentCardProgression - 4 >= 0} />
            </div>
            <div className={styles.iconsContainer}>
                <CoffeeIcon isFilled={currentCardProgression - 5 >= 0} />
                <CoffeeIcon isFilled={currentCardProgression - 6 >= 0} />
                <CoffeeIcon isFilled={currentCardProgression - 7 >= 0} />
                <RedeemIcon
                    sx={{ fontSize: '3rem' }}
                    className={
                        currentCardProgression - 7 >= 0
                            ? styles.shakingGift
                            : ''
                    }
                    fontSize="large"
                />
            </div>
        </div>
    );
};

export default ProgressBar;
