import Footer from 'components/Footer';

import styles from './AdminError.module.scss';

const SuperAdminError = () => {
    return (
        <>
            <Footer />
            <p className={styles.errorText}>
                Ошибка, зайди на страницу с qr-кодом чтобы залогиниться и
                вернись сюда
            </p>
            <p className={styles.errorText}>Если ты не админ - уходи</p>
        </>
    );
};

export default SuperAdminError;
