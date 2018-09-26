/**
 * @param {String} date
 * @returns {Object}
 */

module.exports = function (date) {
    const time = {
        value: new Date(date),
        add: function (amount, measure) {
            const ddd = new Date(this.value);

            if (measure === 'years') {
                ddd.setFullYear(ddd.getFullYear() + amount);
            }

            if (measure === 'months') {
                ddd.setMonth(ddd.getMonth() + amount);
            }

            if (measure === 'days') {
                ddd.setDate(ddd.getDate() + amount);
            }

            if (measure === 'hours') {
                ddd.setHours(ddd.getHours() + amount);
            }

            if (measure === 'minutes') {
                ddd.setMinutes(ddd.getMinutes() + amount);
            }

            this.value = formatDate(ddd);
            return this;
        },
        subtract: function (amount, measure) {
            const ddd = new Date(this.value);
            if (measure === 'years') {
                ddd.setFullYear(ddd.getFullYear() - amount);
            }

            if (measure === 'months') {
                ddd.setMonth(ddd.getMonth() - amount);
            }

            if (measure === 'days') {
                ddd.setDate(ddd.getDate() - amount);
            }

            if (measure === 'hours') {
                ddd.setHours(ddd.getHours() - amount);

            }
            if (measure === 'minutes') {
                ddd.setMinutes(ddd.getMinutes() - amount);
            }

            this.value = formatDate(ddd);
            return this;
        }
    };

    time.value = formatDate(time.value);
    return time;

};




const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const day = (date.getDate() < 10) ? `0${date.getDate()}` : date.getDate();
    const hours = (date.getHours() < 10) ? `0${date.getHours()}` : date.getHours();
    const minuts = (date.getMinutes() < 10) ? `0${date.getMinutes()}` : date.getMinutes()

    return `${year}-${month}-${day} ${hours}:${minuts}`;

}