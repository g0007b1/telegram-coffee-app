import { type CartItemType } from 'pages/AdminPage/AdminPage.slice';

export type TypeOrNull<T> = null | T;

export type HistoryType = Record<number, CartItemType>;

export type AuthStateType = {
    allows_write_to_pm: TypeOrNull<boolean>;
    first_name: TypeOrNull<string>;
    history: TypeOrNull<Record<number, HistoryType>>;
    id: TypeOrNull<string>;
    is_premium: TypeOrNull<boolean>;
    language_code: TypeOrNull<string>;
    last_name: TypeOrNull<string>;
    username: TypeOrNull<string>;
    currentAmountOfCups: TypeOrNull<number>;
};
