import { type FC, type MouseEventHandler } from 'react';

import Button from 'components/Button';

import styles from './ConfirmAlert.module.scss';

type ConfirmAlertType = {
    onAccept: () => void;
    onDeny: () => void;

    topText?: string;
    middleText: string;
    acceptText?: string;
    denyText?: string;
};

const ConfirmAlert: FC<ConfirmAlertType> = ({
    onAccept,
    onDeny,
    topText = 'Предупреждение',
    acceptText = 'Принять',
    denyText = 'Отменить',
    middleText,
}) => {
    const onClickStopPropagation: MouseEventHandler<HTMLDivElement> = (
        event
    ) => {
        event.stopPropagation();
    };

    return (
        <div onClick={onDeny} className={styles.alertContainer}>
            <div onClick={onClickStopPropagation} className={styles.alert}>
                <div style={{ padding: '20px' }}>
                    <div className={styles.topText}>
                        <span>{topText} </span>
                    </div>
                    <div>
                        <span>{middleText}</span>
                    </div>

                    <div className={styles.buttonsContainer}>
                        <div>
                            <Button
                                onClick={onAccept}
                                innerText={acceptText}
                                className={styles.acceptButton}
                            />
                        </div>
                        <div>
                            <Button
                                onClick={onDeny}
                                innerText={denyText}
                                className={styles.denyButton}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmAlert;
