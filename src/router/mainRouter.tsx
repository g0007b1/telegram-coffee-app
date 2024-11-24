import { lazy } from 'react';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router-dom';

const FeedBackPage = lazy(async () => await import('pages/FeedBackPage'));
const MainPage = lazy(async () => await import('pages/MainPage'));
const AdminPage = lazy(async () => await import('pages/AdminPage'));
const MenuPage = lazy(async () => await import('pages/MenuPage'));
const SuperAdminStatisticPage = lazy(
    async () => await import('pages/SuperAdminStatisticPage')
);
const SuperAdminUsersPage = lazy(
    async () => await import('pages/SuperAdminUsersPage')
);
const UserInformationPage = lazy(
    async () => await import('pages/UserInformationPage')
);

export const mainRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route index element={<MainPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/adminsUsers" element={<SuperAdminUsersPage />} />
            <Route path="/feedback" element={<FeedBackPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/statistic" element={<SuperAdminStatisticPage />} />
            <Route path="/userInfo" element={<UserInformationPage />} />
        </Route>
    )
);
