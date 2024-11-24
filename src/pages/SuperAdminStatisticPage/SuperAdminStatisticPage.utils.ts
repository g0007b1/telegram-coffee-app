import { type TodayStatisticType } from 'pages/AdminPage/AdminPage.slice';
import { type TypeOrNull } from 'types/globalTypes';

export const countTodayStatistic = (
    currentDayStatistic: TypeOrNull<TodayStatisticType>
) => {
    const countedItemsCategory: Record<string, Record<string, number>> = {};
    const countedVolumesItems: Record<string, number> = {};
    const countedItems: Record<string, number> = {};
    const countedVolumes: Record<string, number> = {};
    const countedVolumesCategory: Record<
        string,
        Record<string, Record<string, number>>
    > = {};

    if (!currentDayStatistic) return null;

    Object.keys(currentDayStatistic).forEach((hour) => {
        Object.keys(currentDayStatistic[hour as any]).forEach((clientId) => {
            Object.keys(
                currentDayStatistic[hour as any][clientId as any]
            ).forEach((milliseconds) => {
                const currentItem =
                    currentDayStatistic[hour as any][clientId as any][
                        milliseconds as any
                    ];
                const currentItemName = currentItem.name;
                const currentItemCategory = currentItem.category;
                const currentItemVolume = currentItem.volumeName;

                if (countedItemsCategory[currentItemCategory]) {
                    if (
                        countedItemsCategory[currentItemCategory][
                            currentItemName
                        ]
                    ) {
                        countedItemsCategory[currentItemCategory][
                            currentItemName
                        ] += 1;
                    } else {
                        countedItemsCategory[currentItemCategory][
                            currentItemName
                        ] = 1;
                    }
                } else {
                    countedItemsCategory[currentItemCategory] = {};
                    countedItemsCategory[currentItemCategory][currentItemName] =
                        1;
                }

                if (countedVolumesCategory[currentItemCategory]) {
                    if (
                        countedVolumesCategory[currentItemCategory][
                            currentItemName
                        ]
                    ) {
                        if (
                            countedVolumesCategory[currentItemCategory][
                                currentItemName
                            ][currentItemVolume]
                        ) {
                            countedVolumesCategory[currentItemCategory][
                                currentItemName
                            ][currentItemVolume] += 1;
                        } else {
                            countedVolumesCategory[currentItemCategory][
                                currentItemName
                            ][currentItemVolume] = 1;
                        }
                    } else {
                        countedVolumesCategory[currentItemCategory][
                            currentItemName
                        ] = {};
                        countedVolumesCategory[currentItemCategory][
                            currentItemName
                        ][currentItemVolume] = 1;
                    }
                } else {
                    countedVolumesCategory[currentItemCategory] = {};
                    countedVolumesCategory[currentItemCategory][
                        currentItemName
                    ] = {};
                    countedVolumesCategory[currentItemCategory][
                        currentItemName
                    ][currentItemVolume] = 1;
                }

                countedVolumesItems[`${currentItemName} ${currentItemVolume}`]
                    ? (countedVolumesItems[
                          `${currentItemName} ${currentItemVolume}`
                      ] += 1)
                    : (countedVolumesItems[
                          `${currentItemName} ${currentItemVolume}`
                      ] = 1);

                countedItems[currentItemName]
                    ? (countedItems[currentItemName] += 1)
                    : (countedItems[currentItemName] = 1);

                countedVolumes[currentItemVolume]
                    ? (countedVolumes[currentItemVolume] += 1)
                    : (countedVolumes[currentItemVolume] = 1);
            });
        });
    });

    return {
        countedItemsCategory,
        countedVolumesItems,
        countedItems,
        countedVolumes,
        countedVolumesCategory,
    };
};

export const countMonthStatistic = (
    currentMonthStatistic: Record<string, TodayStatisticType>
) => {
    const countedItemsCategory: Record<string, Record<string, number>> = {};
    const countedVolumesItems: Record<string, number> = {};
    const countedItems: Record<string, number> = {};
    const countedVolumes: Record<string, number> = {};
    const countedVolumesCategory: Record<
        string,
        Record<string, Record<string, number>>
    > = {};

    Object.keys(currentMonthStatistic).forEach((day) => {
        const currentDayStatistic = currentMonthStatistic[day];
        Object.keys(currentDayStatistic).forEach((hour) => {
            Object.keys(currentDayStatistic[hour as any]).forEach(
                (clientId) => {
                    Object.keys(
                        currentDayStatistic[hour as any][clientId as any]
                    ).forEach((milliseconds) => {
                        const currentItem =
                            currentDayStatistic[hour as any][clientId as any][
                                milliseconds as any
                            ];
                        const currentItemName = currentItem.name;
                        const currentItemCategory = currentItem.category;
                        const currentItemVolume = currentItem.volumeName;

                        if (countedItemsCategory[currentItemCategory]) {
                            if (
                                countedItemsCategory[currentItemCategory][
                                    currentItemName
                                ]
                            ) {
                                countedItemsCategory[currentItemCategory][
                                    currentItemName
                                ] += 1;
                            } else {
                                countedItemsCategory[currentItemCategory][
                                    currentItemName
                                ] = 1;
                            }
                        } else {
                            countedItemsCategory[currentItemCategory] = {};
                            countedItemsCategory[currentItemCategory][
                                currentItemName
                            ] = 1;
                        }

                        if (countedVolumesCategory[currentItemCategory]) {
                            if (
                                countedVolumesCategory[currentItemCategory][
                                    currentItemName
                                ]
                            ) {
                                if (
                                    countedVolumesCategory[currentItemCategory][
                                        currentItemName
                                    ][currentItemVolume]
                                ) {
                                    countedVolumesCategory[currentItemCategory][
                                        currentItemName
                                    ][currentItemVolume] += 1;
                                } else {
                                    countedVolumesCategory[currentItemCategory][
                                        currentItemName
                                    ][currentItemVolume] = 1;
                                }
                            } else {
                                countedVolumesCategory[currentItemCategory][
                                    currentItemName
                                ] = {};
                                countedVolumesCategory[currentItemCategory][
                                    currentItemName
                                ][currentItemVolume] = 1;
                            }
                        } else {
                            countedVolumesCategory[currentItemCategory] = {};
                            countedVolumesCategory[currentItemCategory][
                                currentItemName
                            ] = {};
                            countedVolumesCategory[currentItemCategory][
                                currentItemName
                            ][currentItemVolume] = 1;
                        }

                        countedVolumesItems[
                            `${currentItemName} ${currentItemVolume}`
                        ]
                            ? (countedVolumesItems[
                                  `${currentItemName} ${currentItemVolume}`
                              ] += 1)
                            : (countedVolumesItems[
                                  `${currentItemName} ${currentItemVolume}`
                              ] = 1);

                        countedItems[currentItemName]
                            ? (countedItems[currentItemName] += 1)
                            : (countedItems[currentItemName] = 1);

                        countedVolumes[currentItemVolume]
                            ? (countedVolumes[currentItemVolume] += 1)
                            : (countedVolumes[currentItemVolume] = 1);
                    });
                }
            );
        });
    });

    return {
        countedItemsCategory,
        countedVolumesItems,
        countedItems,
        countedVolumes,
        countedVolumesCategory,
    };
};

export const sortMostPurchaseItems = (countedItems: Record<string, number>) => {
    const sortable = [];
    for (const item in countedItems) {
        sortable.push([item, countedItems[item]]);
    }

    sortable.sort(function (a, b) {
        return (b[1] as number) - (a[1] as number);
    });

    return sortable;
};
