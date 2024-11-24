import { NavLink } from 'react-router-dom';
import BarChartIcon from '@mui/icons-material/BarChart';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import MessageIcon from '@mui/icons-material/Message';
import PersonIcon from '@mui/icons-material/Person';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import clsx from 'clsx';

import { useAppSelector } from 'redux/hooks';
import { selectAdminData } from 'redux/slices/admin.selectors';

import styles from './Footer.module.scss';
const Footer = () => {
    const { role, isAdmin } = useAppSelector(selectAdminData);
    return (
        <div className={styles.footerContainer}>
            <NavLink className={styles.iconLink} to="/">
                <QrCode2Icon fontSize="large" />
            </NavLink>
            <NavLink className={styles.iconLink} to="/menu">
                <LocalCafeIcon fontSize="large" />
            </NavLink>
            <NavLink
                className={clsx(styles.iconLink, styles.shakingGift)}
                to="/feedback"
            >
                <MessageIcon fontSize="large" />
            </NavLink>
            {isAdmin && role === 'super' && (
                <NavLink className={styles.iconLink} to="/adminsUsers">
                    <SupervisorAccountIcon fontSize="large" />
                </NavLink>
            )}
            <NavLink className={styles.iconLink} to="/userInfo">
                <PersonIcon fontSize="large" />
            </NavLink>
            {isAdmin && (
                <>
                    <NavLink className={styles.iconLink} to="/admin">
                        <CenterFocusWeakIcon fontSize="large" />
                    </NavLink>
                    {role === 'super' && (
                        <NavLink className={styles.iconLink} to="/statistic">
                            <BarChartIcon fontSize="large" />
                        </NavLink>
                    )}
                </>
            )}
        </div>
    );
};

export default Footer;
