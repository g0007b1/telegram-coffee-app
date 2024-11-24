import { useEffect } from 'react';

import SuperAdminError from 'components/AdminError';
import Footer from 'components/Footer';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectAdminData } from 'redux/slices/admin.selectors';

import Cart from './components/Cart';
import CurrentUserInfo from './components/CurrentUserInfo';
import MenuList from './components/MenuList';
import ScanTool from './components/ScanTool';
import TodayBarChart from './components/TodayBarChart';
import { selectCurrentUserInfo } from './AdminPage.selectors';
import {
    clearCart,
    setCurrentFreeCoffee,
    setCurrentScanId,
    setCurrentUserInfo,
} from './AdminPage.slice';

const AdminPage = () => {
    const currentUserInfo = useAppSelector(selectCurrentUserInfo);
    const { isAdmin } = useAppSelector(selectAdminData);

    const dispatch = useAppDispatch();

    if (!isAdmin) {
        return <SuperAdminError />;
    }

    useEffect(() => {
        return () => {
            dispatch(setCurrentScanId(null));
            dispatch(setCurrentUserInfo(null));
            dispatch(setCurrentFreeCoffee(null));
            dispatch(clearCart());
        };
    }, []);

    return (
        <>
            <Footer />
            {!currentUserInfo && <ScanTool />}
            {!currentUserInfo && <TodayBarChart />}
            {currentUserInfo && <CurrentUserInfo />}
            {currentUserInfo && <MenuList />}
            {currentUserInfo && <Cart />}
        </>
    );
};

export default AdminPage;
