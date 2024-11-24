import { type FC, type MouseEventHandler, useState } from 'react';
import { database } from 'firebase';
import { get, ref, set } from 'firebase/database';

import coffeeExample from 'assets/CoffeExample.jpg';
import Button from 'components/Button';
import CheckBox from 'components/CheckBox';

import styles from './AddEditItemModal.module.scss';

type AddEditItemModalPropsType = {
    close: () => void;
    categoryName: string;
};

const AddEditItemModal: FC<AddEditItemModalPropsType> = ({
    close,
    categoryName,
}) => {
    const [name, setSame] = useState('');
    const [checked, setChecked] = useState(true);
    console.log(checked);
    const [ml300, setMl300] = useState<number | ''>(0);
    const [ml400, setMl400] = useState<number | ''>(0);
    const [ml600, setMl600] = useState<number | ''>(0);
    const [oneItem, setOneItem] = useState<number | ''>(0);

    const onClickStopPropagation: MouseEventHandler<HTMLDivElement> = (
        event
    ) => {
        event.stopPropagation();
    };

    const onAddItem = () => {
        const obj: any = {
            // eslint-disable-next-line max-len
            image: 'https://firebasestorage.googleapis.com/v0/b/chako-tg.appspot.com/o/CoffeExample.jpg?alt=media&token=fe0019cb-7a7e-4089-9807-1d2b5baf6d27',
            stamp: checked,
            volumes: {},
        };

        if (ml300) {
            obj.volumes['300мл'] = ml300;
        }
        if (ml400) {
            obj.volumes['400мл'] = ml400;
        }
        if (ml600) {
            obj.volumes['600мл'] = ml600;
        }
        if (oneItem) {
            obj.volumes['1шт'] = oneItem;
        }

        const itemRef = ref(database, `menu/${categoryName}/${name}`);

        get(itemRef).then((snapshot) => {
            if (snapshot.exists()) {
                setSame('Имя занято!');
            } else {
                set(itemRef, obj);
                close();
            }
        });
    };

    return (
        <div onClick={close} className={styles.alertContainer}>
            <div onClick={onClickStopPropagation} className={styles.alert}>
                <h3 className={styles.modalTitle}>
                    Добавить позицию в категорию {categoryName.substring(1)}
                </h3>
                <div className={styles.imageContainer}>
                    <img className={styles.image} src={coffeeExample} />
                </div>
                <div className={styles.titleInputContainer}>
                    <textarea
                        placeholder="Название"
                        className={styles.titleInput}
                        maxLength={40}
                        value={name}
                        onChange={(event) => {
                            setSame(event.target.value);
                        }}
                    />
                </div>
                <div>
                    <div
                        onClick={() => {
                            setChecked(!checked);
                        }}
                        className={styles.checkBoxContainer}
                    >
                        <CheckBox checked={checked} />
                        <span>ставить штамп</span>
                    </div>

                    <div className={styles.volumesChange}>
                        <ul className={styles.volumesList}>
                            <li className={styles.volume}>
                                <span>300мл - </span>
                                <input
                                    type="number"
                                    className={styles.price}
                                    value={ml300}
                                    onClick={() => {
                                        setMl300('');
                                    }}
                                    onChange={(event) => {
                                        setMl300(+event.target.value);
                                    }}
                                />
                                <span>р.</span>
                            </li>
                            <li className={styles.volume}>
                                <span>400мл - </span>
                                <input
                                    type="number"
                                    className={styles.price}
                                    value={ml400}
                                    onClick={() => {
                                        setMl400('');
                                    }}
                                    onChange={(event) => {
                                        setMl400(+event.target.value);
                                    }}
                                />
                                <span>р.</span>
                            </li>
                            <li className={styles.volume}>
                                <span>600мл - </span>
                                <input
                                    type="number"
                                    className={styles.price}
                                    value={ml600}
                                    onClick={() => {
                                        setMl600('');
                                    }}
                                    onChange={(event) => {
                                        setMl600(+event.target.value);
                                    }}
                                />
                                <span>р.</span>
                            </li>
                        </ul>
                        <div className={styles.oneItem}>
                            <ul className={styles.oneItemUl}>
                                <li className={styles.volume}>
                                    <span>1шт - </span>
                                    <input
                                        type="number"
                                        className={styles.price}
                                        value={oneItem}
                                        onClick={() => {
                                            setOneItem('');
                                        }}
                                        onChange={(event) => {
                                            setOneItem(+event.target.value);
                                        }}
                                    />
                                    <span>р.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <Button
                            className={styles.sendButton}
                            innerText="Добавить"
                            disabled={name.length <= 0}
                            onClick={onAddItem}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEditItemModal;
