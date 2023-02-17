const menu = [
    { path: 'admin', name: 'Панель администратора', admin: true },
    { path: 'rooms', name: 'Наши номера' },
    { path: 'booking', name: 'Забронировать', adminDenied: true },
    { path: 'contacts', name: 'Контакты' }
];

export default menu;
