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
    const args = [].slice.call(arguments);

    if (args.length === 1) {
        const result = collection.slice();
        return result;
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

    select = finSelect(select, collection);
    filterIn = getObjFileds(filterIn);
    // console.log(select);
    // console.log(filterIn);
    const filteredColection = filterCollection(collection, filterIn);


    return filteredColection;
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

const finSelect = (arr, collection) => {
    const arrResult = []
    if (arr.length === 1) {
        arrResult.push(arr[0]);
    }
    const objSelect = fieldsSelect(collection)

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
        if (objSelect[key] === arr.length + 1) {
            arrResult.push(key);
        }
    }
    return arrResult;
};

const fieldsSelect = (collection) => {
    const objFields = {};
    for (let i = 0; i < collection.length; i++) {
        for (key in collection[i]) {
            objFields[key] = 1;
        }
    }
    return objFields;
}


module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};

const getObjFileds = (arr) => {
    const objFields = {};
    for (let i = 0; i < arr.length; i++) {
        if (!objFields[arr[i][0]]) {
            const arrTmp = [];
            arrTmp.push(arr[i][1]);
            objFields[arr[i][0]] = arrTmp;
        } else {
            objFields[arr[i][0]].push(arr[i][1]);
        }
    }

    for (key in objFields) {
        if (objFields[key].length > 1) {

            objFields[key] = filterFields(objFields[key]);
        }

    }
    // console.log(objFields);
    return objFields;
};

function filterFields(arr) {
    const arrResult = []
    const objSelect = {};

    for (let i = 0; i < arr.length; i++) {
        [].forEach.call(arr[i], (element) => {
            if (!objSelect[element]) {
                objSelect[element] = 1;
            } else {
                objSelect[element] += 1;
            }
        });
    }

    for (key in objSelect) {
        if (objSelect[key] === arr.length) {
            arrResult.push(key);
        }
    }
    return arrResult;
};

function filterCollection(collection, params) {
    let checkedCollection = [].slice.call(collection);
    const checked = [];
    checked.push(checkedCollection);
    i = 0;
    for (key in params) {
        checked.push(checkOneParam(checked[i], key, params));
        i++;
    }
    return checked[(checked.length - 1)];
};


function checkOneParam(collection, key, params) {
    const checkedOneParam = [];
    paramValues = params[key];
    for (let i = 0; i < collection.length; i++) {
        const toCheck = collection[i][key];
        paramValues.forEach((value) => {

            if (toCheck === value) {
                checkedOneParam.push(collection[i]);
            }

        })
    }
    return checkedOneParam;
}