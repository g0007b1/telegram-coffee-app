import { useEffect } from 'react';
import { database } from 'firebase';
import { child, get, onValue, ref, set } from 'firebase/database';

import Footer from 'components/Footer';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setAdmin } from 'redux/slices/admin.slice';
import { selectAuth } from 'redux/slices/auth.selectors';
import { setAuthData } from 'redux/slices/auth.slice';

import Achievements from './components/Achievements';
import ProgressBar from './components/ProgressBar';
import QRCodeLayer from './components/QRCodeLayer';

import styles from './MainPage.module.scss';

const isDev = true

const tg = window.Telegram.WebApp;
const myTgId = 0

const currentId = isDev ? myTgId : tg.initDataUnsafe.user?.id

const MainPage = () => {
    const dispatch = useAppDispatch();

    const data = useAppSelector(selectAuth);

    useEffect(() => {
        if (!tg.initDataUnsafe.user && !data.id) {
            const dbRef = ref(database);
            get(child(dbRef, `users/${currentId}`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        dispatch(setAuthData(snapshot.val()));

                        get(child(dbRef, `admin/${currentId}`)).then(
                            (snapshot2) => {
                                if (snapshot2.exists()) {
                                    dispatch(setAdmin(snapshot2.val()));
                                }
                            }
                        );
                    } else {
                        set(
                            ref(
                                database,
                                'users/' + `${tg.initDataUnsafe.user?.id}`
                            ),
                            {
                                ...tg.initDataUnsafe.user,
                                currentAmountOfCups: 1,
                            }
                        );
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            // add error message
        }

        const userRef = ref(
            database,
            'users/' + `${currentId}`
        );

        return onValue(userRef, (snapshot) => {
            if (snapshot.exists()) {
                dispatch(setAuthData(snapshot.val()));
            }
        });
    }, []);
    return (
        <>
            <Footer />
            <div className={styles.qrCodeProgressBarContainer}>
                <QRCodeLayer />
                <ProgressBar />
                <Achievements />
            </div>
        </>
    );
};

export default MainPage;
