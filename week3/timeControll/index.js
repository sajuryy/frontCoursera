/**
 * @param {String} date
 * @returns {Object}
 */

module.exports = function (date) {
    const time = {
        value: new Date(date),
        add: (amount, measure) => {
            // console.log(amount, measure)
            return time;
        },
        subtract: (amount, measure) => {
            // console.log(amount, measure)
            return time;
        }
    };

    console.log(formatDate(time.value));
    return time;
};



const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const day = (date.getDay() < 10) ? `0${date.getDay()}` : date.getDay();
    const hours = date.getHours();
    const minuts = date.getMinutes();

    return `${year}-${month}-${day} ${hours}:${minuts}`;

}