import { type ChangeEventHandler, useEffect, useState } from 'react';
import { database } from 'firebase';
import { get, onValue, ref, set } from 'firebase/database';

import capybaraImage from 'assets/capibara.png';
import Button from 'components/Button';
import ConfirmAlert from 'components/ConfirmAlert';
import Footer from 'components/Footer';
import UserAuthError from 'components/UserAuthError';
import { useOpen } from 'hooks/useOpen';
import { useAppSelector } from 'redux/hooks';
import { selectAuth } from 'redux/slices/auth.selectors';

import {
    capybaraAlreadyFoundText,
    capybaraHelloText,
    middleConfirmText,
} from './FeedBackPage.constants';

import styles from './FeedBackPage.module.scss';

const FeedBackPage = () => {
    const auth = useAppSelector(selectAuth);

    if (!auth.id) {
        return <UserAuthError />;
    }

    const [message, setMessage] = useState('');
    const [showTextarea, setShowTextArea] = useState(true);

    const { close, open, isOpen } = useOpen();

    const onChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
        setMessage(event.target.value);
    };

    const onSend = () => {
        const feedbackRef = ref(database, `feedback/${auth.id}`);
        set(feedbackRef, {
            message,
            telegram: auth.username,
            firstName: auth.first_name,
            lastName: auth.last_name,
        });

        close();
    };

    useEffect(() => {
        const feedbackRef = ref(database, `feedback/${auth.id}`);

        get(feedbackRef).then((snapshot) => {
            if (snapshot.exists()) {
                setShowTextArea(false);
            }
        });

        return onValue(feedbackRef, (snapshot) => {
            if (snapshot.exists()) {
                setShowTextArea(false);
            }
        });
    }, []);

    return (
        <>
            <Footer />
            {showTextarea && (
                <>
                    <div className={styles.textareaContainer}>
                        <textarea
                            placeholder="Ждем твои предложения здесь..."
                            value={message}
                            onChange={onChange}
                            maxLength={300}
                            className={styles.textarea}
                        />
                    </div>
                    <div className={styles.buttonContainer}>
                        <Button
                            disabled={message.length < 1}
                            className={styles.sendButton}
                            onClick={open}
                            innerText="Отправить"
                        />
                    </div>
                </>
            )}

            <div className={styles.speechBubble}>
                {showTextarea ? capybaraHelloText : capybaraAlreadyFoundText}
            </div>
            <img className={styles.capybara} src={capybaraImage} />
            {isOpen && (
                <ConfirmAlert
                    middleText={middleConfirmText}
                    onAccept={onSend}
                    onDeny={close}
                />
            )}
        </>
    );
};

export default FeedBackPage;
