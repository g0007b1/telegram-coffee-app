import { type CurrentCartType } from 'pages/AdminPage/AdminPage.slice';
import { type TypeOrNull } from 'types/globalTypes';

export const calcTotalSum = (
    currentCart: CurrentCartType,
    currentFreeCoffee: TypeOrNull<number>
) => {
    const totalSum = Object.keys(currentCart).reduce(
        (acc, curr) => {
            const isFreeCoffee = +curr === currentFreeCoffee;
            return {
                sum: isFreeCoffee
                    ? acc.sum
                    : currentCart[curr as any].price + acc.sum,
                stamp: currentCart[curr as any].stamp
                    ? acc.stamp + 1
                    : acc.stamp,
            };
        },
        {
            sum: 0,
            stamp: 0,
        }
    );

    return totalSum;
};
