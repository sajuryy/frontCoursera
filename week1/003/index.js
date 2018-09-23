// Условия
// На вход функция принимает 3 параметра: часы, минуты, интервал в минутах, на который нужно изменить время.
// Гарантируется, что любой из 3 параметров целое положительное число.
// Параметр часы принимает значение в диапазоне [0, 23].
// Параметр минуты принимает значение в диапазоне [0, 59].
// Прибавляемый интервал может быть больше 60 минут.
// Переход в следующие сутки должен корректно обрабатываться.
// Функция должна возвращать корректно отформатированное время: 1:2 –> 01:02

// Подсказки
// Для выполнения этого задания могут понадобиться методы глобального объекта Math. Например, метод floor.
// При реализации рекомендуем внимательно проверить все краевые случаи: именно тамдопускается большинство ошибок.
// Важно. В рамках курса мы следуем стандарту языка EcmaScript 5. Подробнее о EcmaScript вы можете узнать в википедии.


/**
 * @param {Number} hours
 * @param {Number} minutes
 * @param {Number} interval
 * @returns {String}
 */
module.exports = function (hours, minutes, interval) {

    // let hours = hours;
    // let minuts = minuts;
    // let interval = interval;
    let newMinuts = minutes + interval;

    while (newMinuts > 59) {
        newMinuts -= 60;
        hours += 1;
    }
    while (hours > 23) {
        hours -= 24
    }
    if (hours < 10) {
        hours = '0' + hours;
    }
    if (newMinuts < 10) {
        newMinuts = '0' + newMinuts;
    }
    return hours + ':' + newMinuts;
};



//solution



// // Определяем константу с информацией о количестве часов в сутках
// var HOURS_PER_DAY = 24;
// // Определяем константу с информацией сколько минут в часе
// var MINUTES_PER_HOUR = 60;

// /**
//  * @param {Number} hours
//  * @param {Number} minutes
//  * @param {Number} interval
//  * @returns {String}
//  */
// module.exports = function (hours, minutes, interval) {
//     // Увеличиваем значение минут
//     minutes += interval;

//     // Увеличиваем значение часов на количество полных часов в интервале
//     hours += Math.floor(minutes / MINUTES_PER_HOUR);

//     // Так как мы увеличили минуты и часы на весь interval, то
//     // мы можем выйти за пределы 60 минут у часа и 24 часов у суток.
//     // Исключим эту ситуацию.
//     minutes %= MINUTES_PER_HOUR;
//     hours %= HOURS_PER_DAY;

//     // Используем для формата часов и минут, как в часах 1 -> 01
//     if (hours < 10) {
//         hours = '0' + hours;
//     }

//     if (minutes < 10) {
//         minutes = '0' + minutes;
//     }

//     // Возвращаем результат
//     return hours + ':' + minutes;
// };

