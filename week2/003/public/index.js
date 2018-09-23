var phoneBook = {};

/**
 * @param {String} command
 * @returns {*} - результат зависит от команды
 */
const records = {};
module.exports = function (command) {

    command = command.split(' ');

    if (command[0] === 'ADD') {
        if (records[command[1]]) {
            const numbers = command[2].split(',');
            numbers.forEach(number => {
                number = ' ' + number;
                records[command[1]].push(number);
            });
        } else {
            const name = command[1];
            const numbers = command[2].split(',');
            records[command[1]] = [];

            numbers.forEach(number => {
                number = ' ' + number;
                records[command[1]].push(number);
            });
        }
    }

    if (command[0] === 'SHOW') {
        const output = [];
        const names = [];

        for (let name in records) {
            names.push(name);
        }

        names.sort();

        for (let i = 0; i < names.length; i++) {
            name = names[i];
            if (records[name].length > 0) {
                let str = name + ':' + records[name];
                output.push(str);
            }
        }
        // console.log(output);
        return output;
    }

    if (command[0] === 'REMOVE_PHONE') {
        let changed = 0;

        for (name in records) {
            for (let i = 0; i < records[name].length; i++) {
                if (' ' + command[1] === records[name][i]) {
                    records[name].splice(i, 1);
                    changed += 1;
                }
            }
        }
        if (changed > 0) {
            return true;
        }
        return false;
    }

};

// После команд "ADD Ivan 555,666; REMOVE_PHONE 66", ожидается результат: false