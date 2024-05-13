// Создание пользователя администратора
db.createUser({
    user: 'admin',
    pwd: 'admin',
    roles: [{ role: 'userAdminAnyDatabase', db: 'admin' }]
});

// Создание базы данных
db = db.getSiblingDB('medmate');

// Создание пользователя для базы данных
db.createUser({
    user: 'appuser',
    pwd: 'appuser',
    roles: [{ role: 'readWrite', db: 'medmate' }]
});
