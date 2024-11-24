import { useAppSelector } from 'redux/hooks';
import { selectAuth } from 'redux/slices/auth.selectors';

import styles from './History.module.scss';

const History = () => {
    const authData = useAppSelector(selectAuth);

    const history = authData.history;

    if (!history) return null;

    return (
        <div>
            <h2 className={styles.header}>Последние покупки</h2>
            <div>
                {Object.keys(history).map((hour) => {
                    return (
                        <div className={styles.purchase} key={hour}>
                            {Object.keys(history[+hour]).map((milliseconds) => {
                                return (
                                    <div
                                        className={styles.item}
                                        key={milliseconds}
                                    >
                                        <div>
                                            {
                                                history[hour as any][
                                                    milliseconds as any
                                                ].name
                                            }
                                        </div>
                                        <div key={milliseconds}>
                                            {
                                                history[hour as any][
                                                    milliseconds as any
                                                ].volumeName
                                            }
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default History;
