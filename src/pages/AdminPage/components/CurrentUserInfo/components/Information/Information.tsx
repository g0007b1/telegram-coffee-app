import CloseIcon from '@mui/icons-material/Close';

import { selectCurrentUserInfo } from 'pages/AdminPage/AdminPage.selectors';
import {
    clearCart,
    setCurrentScanId,
    setCurrentUserInfo,
} from 'pages/AdminPage/AdminPage.slice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

import styles from '../../CurrentUserInfo.module.scss';
import cardStyles from './Information.module.scss';
const Information = () => {
    const currentUserInfo = useAppSelector(selectCurrentUserInfo);

    const dispatch = useAppDispatch();

    const onClick = () => {
        dispatch(setCurrentScanId(null));
        dispatch(setCurrentUserInfo(null));
        dispatch(clearCart());
    };

    return (
        <div className={cardStyles.informationContainer}>
            <div>
                <span className={styles.bold}>Клиент:</span>{' '}
                {currentUserInfo?.first_name}
            </div>
            <div>
                {' '}
                <span className={styles.bold}>id:</span> {currentUserInfo?.id}
            </div>
            <div onClick={onClick} className={cardStyles.closeClient}>
                <CloseIcon />
            </div>
        </div>
    );
};

export default Information;
