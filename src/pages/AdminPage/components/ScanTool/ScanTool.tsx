import { useEffect, useState } from 'react';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { database } from 'firebase';
import { child, get, ref } from 'firebase/database';
import { Html5Qrcode } from 'html5-qrcode';

import {
    setCurrentScanId,
    setCurrentUserInfo,
} from 'pages/AdminPage/AdminPage.slice';
import { useAppDispatch } from 'redux/hooks';

import styles from './ScanTool.module.scss';

const ScanTool = () => {
    const dispatch = useAppDispatch();
    const [isEnabled, setIsEnabled] = useState(false);
    const [qrMessage, setQrMessage] = useState('');

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
            get(child(dbRef, `users/${decodedText}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    dispatch(setCurrentScanId(decodedText));
                    dispatch(setCurrentUserInfo(snapshot.val()));
                } else {
                    setQrMessage('ОШИБКА');
                }
            });
            setQrMessage(decodedText);
            setIsEnabled(false);
        };

        if (isEnabled) {
            html5QrCode.start(
                { facingMode: 'environment' },
                config,
                qrCodeSuccess, // success
                () => {} // error
            );
            setQrMessage('');
        } else {
            qrScannerStop();
        }

        return () => {
            qrScannerStop();
        };
    }, [isEnabled]);

    return (
        <div className={styles.adminPageContainer}>
            <div id="qrCodeContainer"></div>
            {qrMessage && <div>{qrMessage}</div>}
            <button
                className={styles.button}
                onClick={() => {
                    setIsEnabled(!isEnabled);
                }}
            >
                <div className={styles.cameraIconContainer}>
                    <CameraAltIcon />
                </div>
            </button>
        </div>
    );
};

export default ScanTool;
