/**
 * @param {String} date
 * @returns {Object}
 */
module.exports = function (date) {
    const time = {
        value: new Date(date),
        add: (amount, measure) => {
            console.log(amount, measure)
            return time;
        },
        subtract: (amount, measure) => {
            console.log(amount, measure)
            return time;
        }
    };
    return time;
};
