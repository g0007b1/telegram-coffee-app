type AdminRightType = {
    name: 'admin' | 'barista' | 'super';
    rights: string[];
};

export const adminsRights: AdminRightType[] = [
    {
        name: 'barista',
        rights: ['сканировать qr-коды клиентов и добавлять им кофе и еду'],
    },
    {
        name: 'admin',
        rights: [
            'тоже самое что и Бариста',
            'смотреть статистику',
            'редактировать меню',
        ],
    },
    {
        name: 'super',
        rights: [
            'тоже самое что и Админ',
            'добавлять и удалять новых сотрудников',
            'не может быть удален',
        ],
    },
];
