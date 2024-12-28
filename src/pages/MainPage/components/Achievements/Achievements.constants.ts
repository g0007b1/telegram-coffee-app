import capybara1 from 'assets/capyBaras/miniLogos/capibara1.png';
import capybara2 from 'assets/capyBaras/miniLogos/capibara2.png';
import capybara3 from 'assets/capyBaras/miniLogos/capibara3.png';
import capybara4 from 'assets/capyBaras/miniLogos/capibara4.png';
import capybara5 from 'assets/capyBaras/miniLogos/capibara5.png';

export type AchievementType = {
    name: string;
    description: string;
    needAmount: number;
    image?: any;
};

type AchievementsType = AchievementType[];

export const achievements: AchievementsType = [
    {
        name: 'Кофелюб',
        description: 'Зарегистрируйся в приложении',
        needAmount: 0,
        image: capybara1,
    },
    {
        name: 'Бывалый',
        description: 'Заверши свою первую карточку и получи подарочный кофе',
        needAmount: 1 * 8,
        image: capybara1,
    },
    {
        name: 'Уже смешарик',
        description: 'Заверши вторую карточку',
        needAmount: 2 * 8,
        image: capybara2,
    },
    {
        name: 'Постоялец',
        description: 'Уже пять карточек закрыто, добро пожаловать в клуб!',
        needAmount: 5 * 8,
        image: capybara2,
    },
    {
        name: 'Почетный кофеман',
        description: 'Десять раз по восемь кофе, а ты молодец',
        needAmount: 10 * 8,
        image: capybara3,
    },
    {
        name: 'Кофейный маньяк',
        description: '15 - твое счастливое число на сегодня',
        needAmount: 15 * 8,
        image: capybara3,
    },
    {
        name: 'Мастер спорта по кофе',
        description: 'А ты не жулик ли там часом? (30 карт)',
        needAmount: 30 * 8,
        image: capybara4,
    },
    {
        name: 'Рекордсмен',
        description: 'Заверши 40 карт',
        needAmount: 40 * 8,
        image: capybara4,
    },
    {
        name: 'Полсотовец',
        description: '400 чашек кофе прошло через твой организм',
        needAmount: 50 * 8,
        image: capybara5,
    },
    {
        name: 'Гений, миллиардер, плейбой, филантроп',
        description: 'ТЫ - КОФЕЙНЫЙ БОГ',
        needAmount: 100 * 8,
        image: capybara5,
    },
];
