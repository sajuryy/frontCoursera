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
        if (args[i][0] === 'filterIn') {
            filterIn.push(args[i].slice(1));
        }
        if (args[i][0] === 'select') {
            const argsChecked = checkArgsSelect(args[i].slice(1), collection);
            select.push(argsChecked);
        }
    }

    filterIn = getObjFields(filterIn);
    const filteredCollection = filterCollection(collection, filterIn);

    select = finSelect(select, collection);
    const formatedFilteredCollection = format(filteredCollection, select);

    return formatedFilteredCollection;

}

// select должен выбирать только существующие поля,
// должен соблюдаться приоритет операций (filterIn > select)
/**
 * @params {String[]}
 */
function select() {
    let keys = [].slice.call(arguments);
    args = ['select', ...keys];
    return args;
}

function checkArgsSelect(arr, collection) {

    const obj = {};
    collection.forEach((element) => {
        for (key in element) {
            obj[key] = true;
        }
    });
    const objFields = Object.keys(obj);


    Object.keys(collection);
    const args = [].slice.call(arr);

    const objTmp = {};
    const arrTmp = [...args, ...objFields];

    arrTmp.forEach((arg) => {
        if (!objTmp[arg]) {
            objTmp[arg] = 1;
        } else {
            objTmp[arg] += 1;
        }
    });

    const argsSelect = [];

    for (key in objTmp) {
        if (objTmp[key] > 1) {
            argsSelect.push(key);
        }

    }

    return argsSelect;

};
/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */

function filterIn(property, values) {
    let keys = [].slice.call(arguments);
    keys = ['filterIn', ...keys];
    return keys;
};

const finSelect = (arr, collection) => {
    let arrResult = []
    if (arr.length === 1) {
        arrResult = arr[0];
    } else {
        const objSelect = fieldsSelect(collection)

        for (let i = 0; i < arr.length; i++) {

            arr[i].forEach((element) => {
                if (!objSelect[element]) {
                    objSelect[element] = 1;
                } else {
                    objSelect[element] += 1;
                }
            });
        };

        for (key in objSelect) {
            if (objSelect[key] === arr.length + 1) {
                arrResult.push(key);
            }
        };
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

const getObjFields = (arr) => {
    const objFields = {};
    if (arr.length === 1) {
        objFields[arr[0][0]] = arr[0][1];
    } else {
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
    }

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
};

function format(arr, fields) {
    const arrFormated = [];

    for (let i = 0; i < arr.length; i++) {
        const formated = {};
        fields.forEach((field) => {
            formated[field] = arr[i][field]
        });
        arrFormated.push(formated);
    }
    return arrFormated;
};