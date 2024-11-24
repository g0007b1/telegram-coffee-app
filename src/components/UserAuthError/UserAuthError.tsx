import Footer from 'components/Footer';

import styles from './UserAuthError.module.scss';

const UserAuthError = () => {
    return (
        <>
            <Footer />
            <p className={styles.errorText}>
                Ошибка, зайди на страницу с qr-кодом чтобы залогиниться и
                вернись сюда
            </p>
            <p className={styles.errorText}>
                Если сидишь в браузере - перейди в мобильное приложение
            </p>
        </>
    );
};

export default UserAuthError;
