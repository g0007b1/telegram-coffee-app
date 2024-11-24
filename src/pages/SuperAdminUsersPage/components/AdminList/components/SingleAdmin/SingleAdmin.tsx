import { type FC } from 'react';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { database } from 'firebase';
import { get, ref, remove } from 'firebase/database';

import ConfirmAlert from 'components/ConfirmAlert';
import { useOpen } from 'hooks/useOpen';
import {
    adminIcons,
    adminRoleTranslation,
} from 'pages/SuperAdminUsersPage/SuperAdminUsersPage.constants';
import { type AdminUserType } from 'pages/SuperAdminUsersPage/SuperAdminUsersPage.slice';

import styles from './SingleAdmin.module.scss';

type SingleAdminType = {
    user: AdminUserType;
    id: string;
};

const SingleAdmin: FC<SingleAdminType> = ({ user, id }) => {
    const { open, close, isOpen } = useOpen();

    const AdminIcon = adminIcons[user.role];

    const onConfirmDelete = () => {
        const currentAdminRef = ref(database, `admin/${id}`);

        get(currentAdminRef).then((snapshot) => {
            if (snapshot.exists()) {
                remove(currentAdminRef);
            }
        });
    };

    return (
        <>
            <div className={styles.singleAdminContainer}>
                <div className={styles.svgAdmin}>
                    <AdminIcon sx={{ fontSize: '3rem' }} fontSize="large" />
                </div>
                <div className={styles.adminInfoRemoveContainer}>
                    <div>
                        <div>
                            {'Имя: '}
                            <span className={styles.boldText}>
                                {user.first_name + ' ' + user.last_name}
                            </span>
                        </div>
                        <div>
                            {'Роль: '}
                            <span className={styles.boldText}>
                                {adminRoleTranslation[user.role]}
                            </span>
                        </div>
                        <div>
                            {'Id: '}
                            <span className={styles.boldText}>{id}</span>
                        </div>
                    </div>
                    {user.role !== 'super' && (
                        <div onClick={open}>
                            <PersonRemoveIcon
                                sx={{ color: '#d11a2a' }}
                                fontSize="large"
                            />
                        </div>
                    )}
                </div>
            </div>
            {isOpen && (
                <ConfirmAlert
                    // eslint-disable-next-line max-len
                    middleText={`Ты уверен что хочешь удалить из списка сотрудников пользователя ${user.first_name}  ${user.last_name}?`}
                    onDeny={close}
                    onAccept={onConfirmDelete}
                />
            )}
        </>
    );
};

export default SingleAdmin;

// 857506270: {
//     "first_name": "Софа",
//     "last_name": "",
//     "role": "barista"
// }
