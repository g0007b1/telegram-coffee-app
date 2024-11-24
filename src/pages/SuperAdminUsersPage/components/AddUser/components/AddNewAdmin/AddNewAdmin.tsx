import { type FC, type MouseEventHandler, useState } from 'react';
import { database } from 'firebase';
import { ref, set } from 'firebase/database';

import Button from 'components/Button';
import { adminRoleTranslation } from 'pages/SuperAdminUsersPage/SuperAdminUsersPage.constants';
import {
    selectCurrentScanUser,
    selectCurrentScanUserId,
} from 'pages/SuperAdminUsersPage/SuperAdminUsersPage.selectors';
import {
    setCurrentScantUser,
    setCurrentScanUserId,
} from 'pages/SuperAdminUsersPage/SuperAdminUsersPage.slice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

import SelectAdminCard from './components/SelectAdminCard';
import { adminsRights } from '../../AddUser.constants';

import styles from './AddNewAdmin.module.scss';

type AddNewAdminPropsType = {
    close: () => void;
};

const AddNewAdmin: FC<AddNewAdminPropsType> = ({ close }) => {
    const dispatch = useAppDispatch();

    const currentScanUser = useAppSelector(selectCurrentScanUser);
    const currentScanUserId = useAppSelector(selectCurrentScanUserId);

    const [currentSelectedPosition, setCurrentSelectedPosition] = useState<
        'admin' | 'barista' | 'super' | ''
    >('');

    const onClickStopPropagation: MouseEventHandler<HTMLDivElement> = (
        event
    ) => {
        event.stopPropagation();
    };

    const onClose = () => {
        dispatch(setCurrentScanUserId(null));
        dispatch(setCurrentScantUser(null));
        close();
    };

    const onAccept = () => {
        // const adminRef = ref(database, 'admin');
        if (currentScanUser) {
            set(ref(database, 'admin/' + `${currentScanUserId}`), {
                first_name: currentScanUser.first_name,
                last_name: currentScanUser.last_name,
                role: currentSelectedPosition,
            }).then(() => {
                onClose();
            });
        }
    };

    return (
        <div onClick={onClose} className={styles.alertContainer}>
            {currentScanUser && currentScanUserId && (
                <div onClick={onClickStopPropagation} className={styles.alert}>
                    <div className={styles.scanDescriptionContainer}>
                        <span className={styles.descriptionText}>
                            Добавть пользователя {currentScanUser.first_name}{' '}
                            {currentScanUser.last_name} на роль:
                            <span className={styles.boldText}>
                                {currentSelectedPosition
                                    ? `${adminRoleTranslation[currentSelectedPosition]}?`
                                    : ' (выбери позицию ниже)'}
                            </span>
                        </span>
                        <div className={styles.selectAdminCardContainer}>
                            {adminsRights.map(({ name, rights }) => (
                                <SelectAdminCard
                                    key={name}
                                    name={name}
                                    rights={rights}
                                    onSelect={() => {
                                        setCurrentSelectedPosition(name);
                                    }}
                                    selected={currentSelectedPosition === name}
                                />
                            ))}
                        </div>
                        <div className={styles.buttonsContainer}>
                            <Button
                                onClick={onAccept}
                                disabled={!currentSelectedPosition}
                                innerText="Добавить"
                                className={styles.acceptButton}
                            />
                            <Button
                                onClick={onClose}
                                innerText="Отменить"
                                className={styles.denyButton}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddNewAdmin;
