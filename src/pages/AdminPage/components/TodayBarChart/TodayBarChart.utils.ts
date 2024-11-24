import { type TodayStatisticType } from 'pages/AdminPage/AdminPage.slice';
import { type TypeOrNull } from 'types/globalTypes';

import { xAxis } from './TodayBarChart.constants';

export const calcSeries = (todayStatistic: TypeOrNull<TodayStatisticType>) => {
    const series = Array(16).fill(0);

    if (!todayStatistic) return series;

    Object.keys(todayStatistic).forEach((hour) => {
        series[xAxis[0].data.findIndex((el) => el === hour)] = Object.keys(
            todayStatistic[+hour]
        ).length;
    });

    return series;
};

export const countTodayStatistic = (
    todayStatistic: TypeOrNull<TodayStatisticType>
) => {
    if (!todayStatistic)
        return {
            clientsCount: 0,
            coffeeCount: 0,
            totalPrice: 0,
            totalSellCoffee: 0,
            totalSellNotCoffee: 0,
            totalFreeCoffee: 0,
        };

    let clientsCount = 0;
    let coffeeCount = 0;

    let totalPrice = 0;
    let totalSellCoffee = 0;
    let totalSellNotCoffee = 0;
    let totalFreeCoffee = 0;

    Object.keys(todayStatistic).forEach((hour) => {
        const hourStatistic = Object.keys(todayStatistic[hour as any]);
        clientsCount += hourStatistic.length;

        hourStatistic.forEach((client) => {
            coffeeCount += Object.keys(
                todayStatistic[hour as any][client as any]
            ).length;

            Object.keys(todayStatistic[hour as any][client as any]).forEach(
                (milliseconds) => {
                    const currentPosition =
                        todayStatistic[hour as any][client as any][
                            milliseconds as any
                        ];

                    totalPrice += currentPosition.price;

                    currentPosition.stamp
                        ? (totalSellCoffee += 1)
                        : (totalSellNotCoffee += 1);

                    if (currentPosition.price === 0) totalFreeCoffee += 1;
                }
            );
        });
    });

    return {
        clientsCount,
        coffeeCount,
        totalPrice,
        totalSellCoffee,
        totalSellNotCoffee,
        totalFreeCoffee,
    };
};

export const countMonthStatistic = (
    monthStatistic: TypeOrNull<Record<string, TodayStatisticType>>
) => {
    if (!monthStatistic)
        return {
            clientsCount: 0,
            coffeeCount: 0,
            totalPrice: 0,
            totalSellCoffee: 0,
            totalSellNotCoffee: 0,
            totalFreeCoffee: 0,
        };

    let clientsCount = 0;
    let coffeeCount = 0;

    let totalPrice = 0;
    let totalSellCoffee = 0;
    let totalSellNotCoffee = 0;
    let totalFreeCoffee = 0;

    Object.keys(monthStatistic).forEach((day) => {
        const todayStatistic = monthStatistic[day];
        Object.keys(todayStatistic).forEach((hour) => {
            const hourStatistic = Object.keys(todayStatistic[hour as any]);
            clientsCount += hourStatistic.length;

            hourStatistic.forEach((client) => {
                coffeeCount += Object.keys(
                    todayStatistic[hour as any][client as any]
                ).length;

                Object.keys(todayStatistic[hour as any][client as any]).forEach(
                    (milliseconds) => {
                        const currentPosition =
                            todayStatistic[hour as any][client as any][
                                milliseconds as any
                            ];

                        totalPrice += currentPosition.price;
                        currentPosition.stamp
                            ? (totalSellCoffee += 1)
                            : (totalSellNotCoffee += 1);

                        if (currentPosition.price === 0) totalFreeCoffee += 1;
                    }
                );
            });
        });
    });

    return {
        clientsCount,
        coffeeCount,
        totalPrice,
        totalSellCoffee,
        totalSellNotCoffee,
        totalFreeCoffee,
    };
};
