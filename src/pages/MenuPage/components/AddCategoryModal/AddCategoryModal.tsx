/* eslint-disable max-len */
import { type FC, type MouseEventHandler, useState } from 'react';
import { database } from 'firebase';
import { get, ref, set } from 'firebase/database';

import Button from 'components/Button';

import styles from './AddCategoryModal.module.scss';

type AddCategoryModalPropsType = {
    close: () => void;
};

const AddCategoryModal: FC<AddCategoryModalPropsType> = ({ close }) => {
    const [name, setName] = useState('');

    const onClickStopPropagation: MouseEventHandler<HTMLDivElement> = (
        event
    ) => {
        event.stopPropagation();
    };

    const onAddCategory = () => {
        const categoryRef = ref(database, `menu/${name}`);

        get(categoryRef).then((snapshot) => {
            if (snapshot.exists()) {
                close();
            } else {
                set(categoryRef, {
                    'Удали этот напиток как добавишь один новый': {
                        image: 'https://firebasestorage.googleapis.com/v0/b/chako-tg.appspot.com/o/CoffeExample.jpg?alt=media&token=fe0019cb-7a7e-4089-9807-1d2b5baf6d27',
                        stamp: false,
                        volumes: {
                            '1шт': 100,
                        },
                    },
                });
                close();
            }
        });
    };

    return (
        <div onClick={close} className={styles.alertContainer}>
            <div onClick={onClickStopPropagation} className={styles.alert}>
                <h2 className={styles.header}>Добавить категорию:</h2>
                <div className={styles.inputContainer}>
                    <input
                        value={name}
                        onChange={(event) => {
                            setName(event.target.value);
                        }}
                        className={styles.nameInput}
                        placeholder="Введи название"
                    />
                </div>
                <div className={styles.hint}>
                    <span>
                        сначала введи цифру, обозначающую порядковый номер.
                        например:
                    </span>
                    <div> 3 Горячие напитки</div>
                </div>
                <div className={styles.buttonContainer}>
                    <Button
                        disabled={name.length <= 0}
                        innerText="Добавить"
                        className={styles.button}
                        onClick={onAddCategory}
                    />
                </div>
            </div>
        </div>
    );
};

export default AddCategoryModal;
