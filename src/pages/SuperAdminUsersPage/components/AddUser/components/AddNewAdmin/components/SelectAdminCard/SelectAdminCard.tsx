import { type FC } from 'react';
import clsx from 'clsx';

import {
    adminIcons,
    adminRoleTranslation,
} from 'pages/SuperAdminUsersPage/SuperAdminUsersPage.constants';

import styles from './SelectAdminCard.module.scss';

type SelectAdminCardPropsType = {
    selected: boolean;
    onSelect: () => void;
    rights: string[];
    name: 'admin' | 'barista' | 'super';
};

const SelectAdminCard: FC<SelectAdminCardPropsType> = ({
    selected,
    onSelect,
    rights,
    name,
}) => {
    const AdminIcon = adminIcons[name];

    return (
        <div
            onClick={onSelect}
            className={clsx(
                styles.selectAdminCardContainer,
                selected && styles.selected
            )}
        >
            <div className={styles.iconName}>
                <AdminIcon sx={{ fontSize: '3rem' }} />
                <span className={styles.name}>
                    {adminRoleTranslation[name]}
                </span>
            </div>
            <div>
                <ul className={styles.rightsList}>
                    {rights.map((right) => (
                        <li key={right}>{right}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SelectAdminCard;
