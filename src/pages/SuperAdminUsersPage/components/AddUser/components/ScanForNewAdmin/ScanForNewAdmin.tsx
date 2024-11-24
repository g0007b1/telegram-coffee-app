import { type FC, type MouseEventHandler, useEffect, useState } from 'react';
import { database } from 'firebase';
import { child, get, ref } from 'firebase/database';
import { Html5Qrcode } from 'html5-qrcode';

import {
    selectCurrentScanUser,
    selectCurrentScanUserId,
} from 'pages/SuperAdminUsersPage/SuperAdminUsersPage.selectors';
import {
    setCurrentScantUser,
    setCurrentScanUserId,
} from 'pages/SuperAdminUsersPage/SuperAdminUsersPage.slice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

import styles from './ScanForNewAdmin.module.scss';

type ScanForNewAdminPropsType = {
    close: () => void;
};

const ScanForNewAdmin: FC<ScanForNewAdminPropsType> = ({ close }) => {
    const dispatch = useAppDispatch();

    const currentScanUser = useAppSelector(selectCurrentScanUser);
    const currentScanUserId = useAppSelector(selectCurrentScanUserId);

    const [isEnabled, setIsEnabled] = useState(true);

    console.log(currentScanUser);
    console.log(currentScanUserId);

    const onClickStopPropagation: MouseEventHandler<HTMLDivElement> = (
        event
    ) => {
        event.stopPropagation();
    };

    useEffect(() => {
        const config = { fps: 10, qrbox: { width: 200, height: 200 } };
        const html5QrCode = new Html5Qrcode('qrCodeContainer');

        const qrScannerStop = () => {
            if (html5QrCode && html5QrCode.isScanning) {
                html5QrCode
                    .stop()
                    .then(() => {
                        console.log('stopped');
                    })
                    .catch(() => {
                        console.log('error');
                    });
            }
        };

        const qrCodeSuccess = (decodedText: string) => {
            const dbRef = ref(database);

            get(child(dbRef, `admin/${decodedText}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    console.log('ЭТОТ ПОЛЬЗОВАТЕЛЬ УЖЕ ЕСТЬ');
                } else {
                    get(child(dbRef, `users/${decodedText}`)).then(
                        (snapshot) => {
                            if (snapshot.exists()) {
                                dispatch(setCurrentScanUserId(decodedText));
                                dispatch(setCurrentScantUser(snapshot.val()));
                            } else {
                                console.log('ДОДЕЛАТЬ');
                            }
                        }
                    );
                }
            });

            setIsEnabled(false);
            close();
        };

        if (isEnabled) {
            html5QrCode.start(
                { facingMode: 'environment' },
                config,
                qrCodeSuccess, // success
                () => {} // error
            );
        } else {
            qrScannerStop();
        }

        return () => {
            qrScannerStop();
        };
    }, [isEnabled]);

    return (
        <div onClick={close} className={styles.alertContainer}>
            <div onClick={onClickStopPropagation} className={styles.alert}>
                <div className={styles.scanDescriptionContainer}>
                    <div id="qrCodeContainer" />
                    <span className={styles.descriptionText}>
                        Отсканируй qr-код с главной страницы того, кого ты
                        хочешь добавить
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ScanForNewAdmin;
