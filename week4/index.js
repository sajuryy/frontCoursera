// Условия
// После выполнения функции 'query' не должна измениться исходная коллекция.
// Если в функцию 'query' передать только коллекцию, то вернётся её копия.
// Операция 'select' должна игнорировать несуществующие в объекте поля.
// Несколько операций 'select' должны отработать как одна с пересечёнными аргументами. Например, если мы выбираем поля a и b, а затем b и c, то в результате должно выбраться только поле b.
// Несколько операций 'filterIn' должны отработать как одна с пересечёнными аргументами. Например, если фильтруем поле по значениям a и b, а затем по b и c, то в результате отфильтроваться должно только по значени b.
// Операции должны выполняться в определённом порядке. В первую очередь происходит фильтрация, а затем выборка полей. Таким образом, можно фильтровать коллекцию даже по тем полям, которые не указаны в функции select.
// Порядок элементов после выполнения операций должен сохраниться.
// Гарантируется, что функция 'query' будет вызываться корректно. Дополнительную проверку аргументов делать не нужно.
// Предполагается, что поля объектов имеют значения типа String или Number.

/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */

function query(collection) {
    const result = collection.slice();
    const args = [].slice.call(arguments);

    if (args.length === 1) {
        return collection;
    }

    let select = [];
    let filterIn = [];

    for (let i = 1; i < args.length; i++) {
        if (args[i][0] === 'select') {
            select.push(args[i].slice(1));
        }
        if (args[i][0] === 'filterIn') {
            filterIn.push(args[i].slice(1));
        }
    }

    select = finSelect(select);
    // console.log(select);
    // console.log(filterIn);

    return args;

}

/**
 * @params {String[]}
 */
function select() {
    let keys = [].slice.call(arguments);
    keys = ['select', ...keys];
    return keys;
}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */

// lib.filterIn('favoriteFruit', ['Яблоко', 'Картофель']
function filterIn(property, values) {
    let keys = [].slice.call(arguments);
    keys = ['filterIn', ...keys];
    return keys;
};

function finSelect(arr) {
    const arrResult = []
    if (arr.length === 1) {
        arrResult.push(arr[0]);
    }
    const objSelect = {};

    for (let i = 0; i < arr.length; i++) {

        arr[i].forEach((element) => {
            if (!objSelect[element]) {
                objSelect[element] = 1;
            } else {
                objSelect[element] += 1;
            }
        });
    }

    for (key in objSelect) {
        if (objSelect[key] == arr.length) {
            arrResult.push(key);
        }
    }
    return arrResult;
};

module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};


// console.log(select('qqq', 'www', 'eee'));