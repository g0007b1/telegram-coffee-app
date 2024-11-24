import RedeemIcon from '@mui/icons-material/Redeem';

import CoffeeIcon from 'components/CoffeeIcon';
import { selectCurrentUserInfo } from 'pages/AdminPage/AdminPage.selectors';
import { useAppSelector } from 'redux/hooks';

import styles from './ClientCard.module.scss';

const ClientCard = () => {
    const currentUserInfo = useAppSelector(selectCurrentUserInfo);

    const currentAmountOfCups = currentUserInfo?.currentAmountOfCups;

    const currentCardProgression = currentAmountOfCups
        ? currentAmountOfCups % 8
        : 0;

    return (
        <div>
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

export default ClientCard;
