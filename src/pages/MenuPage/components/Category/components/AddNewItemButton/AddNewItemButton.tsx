import { type FC } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';

import { useOpen } from 'hooks/useOpen';

import AddEditItemModal from './components/AddEditItemModal';

import styles from './AddNewItemButton.module.scss';

type AddNewItemButtonPropsType = {
    categoryName: string;
};

const AddNewItemButton: FC<AddNewItemButtonPropsType> = ({ categoryName }) => {
    const { isOpen, open, close } = useOpen();

    return (
        <li className={styles.addNewItemContainer}>
            <div onClick={open} className={styles.iconContainer}>
                <AddBoxIcon sx={{ fontSize: '5rem' }} />
            </div>
            {isOpen && (
                <AddEditItemModal categoryName={categoryName} close={close} />
            )}
        </li>
    );
};

export default AddNewItemButton;
