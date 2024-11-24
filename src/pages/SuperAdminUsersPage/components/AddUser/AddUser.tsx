import { useEffect } from 'react';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { useOpen } from 'hooks/useOpen';
import { selectCurrentScanUserId } from 'pages/SuperAdminUsersPage/SuperAdminUsersPage.selectors';
import { useAppSelector } from 'redux/hooks';

import AddNewAdmin from './components/AddNewAdmin';
import ScanForNewAdmin from './components/ScanForNewAdmin';

import styles from './AddUser.module.scss';

const AddUser = () => {
    const { open: openScan, close: closeScan, isOpen: isOpenScan } = useOpen();
    const {
        open: openAddMenu,
        close: closeAddMenu,
        isOpen: isOpenAddMenu,
    } = useOpen();

    const currentScanUserId = useAppSelector(selectCurrentScanUserId);

    useEffect(() => {
        if (currentScanUserId) {
            openAddMenu();
        }
    }, [currentScanUserId]);

    return (
        <div>
            <div onClick={openScan} className={styles.addUserContainer}>
                <PersonAddIcon sx={{ color: '#55883B', fontSize: '3rem' }} />
            </div>
            {isOpenScan && <ScanForNewAdmin close={closeScan} />}
            {isOpenAddMenu && <AddNewAdmin close={closeAddMenu} />}
        </div>
    );
};

export default AddUser;
