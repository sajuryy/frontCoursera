const params = {
    favoriteFruit: ['Яблоко', 'Картофель']
    // ,
    // gender: ['Мужской']
};

const friends = [
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

// console.log(checkOneParam(friends, 'favoriteFruit', params));



console.log(filterCollection(friends, params));