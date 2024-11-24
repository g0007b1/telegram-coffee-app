import QRCode from 'react-qr-code';

import Loader from 'components/Loader';
import { useAppSelector } from 'redux/hooks';
import { selectUserId } from 'redux/slices/auth.selectors';

import styles from './QRCodeLayer.module.scss';

const QRCodeLayer = () => {
    const userId = useAppSelector(selectUserId);

    return (
        <div className={styles.qrCodeContainer}>
            <div className={styles.qrCode}>
                {userId ? (
                    <QRCode
                        size={200}
                        style={{
                            backgroundColor: 'white',
                            padding: '30px',
                        }}
                        value={`${JSON.stringify(userId)}`}
                        viewBox="0 0 256 256"
                    />
                ) : (
                    <div>
                        <Loader />
                    </div>
                )}
            </div>
        </div>
    );
};

export default QRCodeLayer;
