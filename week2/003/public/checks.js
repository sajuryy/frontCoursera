// Встроенный в Node.JS модуль для проверок
var assert = require('assert');

// Подключаем свою функцию
var phoneBook = require('./index.js');
// const records = {};


// phoneBook('ADD Ivan 555-10-01,555-10-03');
// phoneBook('ADD Ivan 555-10-02');
// phoneBook('ADD Alex 555-10-77');
// console.log(phoneBook('REMOVE_PHONE 555-10-77'));

// console.log(phoneBook('SHOW'));
// phoneBook('ADD Ivan 555,666');
// console.log(phoneBook('SHOW'));

// console.log(phoneBook('REMOVE_PHONE 66'));

// console.log(phoneBook('SHOW'));


// После команд "ADD Ivan 555,666; REMOVE_PHONE 66", ожидается результат: false



// Добавляем телефоны контакту Ivan
phoneBook('ADD Ivan 555-10-01,555-10-03');
phoneBook('ADD Ivan 555-10-02');
// phoneBook('SHOW')

// Проверка работы функции SHOW
assert.deepEqual(
    // Получаем содержимое телефонной книги
    phoneBook('SHOW'),
    [
        'Ivan: 555-10-01, 555-10-03, 555-10-02'
    ],
    'В телефонной книге: "Ivan: 555-10-01, 555-10-03, 555-10-02"'
);

// Проверка работы функции REMOVE_PHONE
assert.equal(
    // Удаляем телефон 555-10-03
    phoneBook('REMOVE_PHONE 555-10-03'),
    true,
    'Телефон 555-10-03 успешно удален'
);
phoneBook('SHOW');

// Добавляем новый контакт
phoneBook('ADD Alex 555-20-01');

// Проверка работы функции SHOW
assert.deepEqual(
    // Получаем содержимое телефонной книги
    phoneBook('SHOW'),
    [
        'Alex: 555-20-01',
        'Ivan: 555-10-01, 555-10-02'
    ],
    'В телефонной книге: "Alex: 555-20-01", "Ivan: 555-10-01, 555-10-02"'
);

// Удаляем телефон
phoneBook('REMOVE_PHONE 555-20-01');

// Проверка работы функции SHOW
assert.deepEqual(
    // Получаем содержимое телефонной книги
    phoneBook('SHOW'),
    [
        'Ivan: 555-10-01, 555-10-02'
    ],
    'В телефонной книге: "Ivan: 555-10-01, 555-10-02"'
);
phoneBook('ADD Ivan 555,666');

assert.equal(
    // Удаляем телефон 555-10-03
    phoneBook('REMOVE_PHONE 66'),
    false,
    '!!!'
);

console.info('OK!');
