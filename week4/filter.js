var friends = [
    {
        name: 'Сэм',
        gender: 'Мужской',
        email: 'luisazamora@example.com',
        favoriteFruit: 'Картофель'
    },
    {
        name: 'Эмили',
        gender: 'Женский',
        email: 'example@example.com',
        favoriteFruit: 'Яблоко'
    },
    {
        name: 'Мэт',
        gender: 'Мужской',
        email: 'danamcgee@example.com',
        favoriteFruit: 'Яблоко'
    },
    {
        name: 'Брэд',
        gender: 'Мужской',
        email: 'newtonwilliams@example.com',
        favoriteFruit: 'Банан'
    },
    {
        name: 'Шерри',
        gender: 'Женский',
        email: 'danamcgee@example.com',
        favoriteFruit: 'Картофель'
    },
    {
        name: 'Керри',
        gender: 'Женский',
        email: 'danamcgee@example.com',
        favoriteFruit: 'Апельсин'
    },
    {
        name: 'Стелла',
        gender: 'Женский',
        email: 'waltersguzman@example.com',
        favoriteFruit: 'Картофель'
    }
];
const arr = [['favoriteFruit', ['Яблоко', 'Картофель']],
['favoriteFruit', ['Яблоко', 'Картофель', 'Банан']],
['gender', 'Мужской']]


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
        if ( objFields[key].length >1) {

            objFields[key] = filterFields(objFields[key]);
        }

    }
    console.log(objFields);
    return objFields;
}


console.log(getObjFileds(arr));





const arr1 = [['Яблоко', 'Картофель'], ['Яблоко', 'Картофель', 'Банан']];

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


// console.log(filterFields(arr1));
