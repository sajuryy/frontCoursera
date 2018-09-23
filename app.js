// var myObj = {
//   'b': 'asdsadfd',
//   'c': 'masdasaf',
//   'a': 'dsfdsfsdf'
// },
const records = {
  'Vasya': [1, 2, 3],
  'Alex': [4]
}
const output = [];

const names = [];

for (let name in records) {
      names.push(name);
}

names.sort();

console.log(names);

for (let i = 0; i< names.length; i++) {
  name = names[i];
  let str = name + ':' + records[name];
  output.push(str);
}
console.log(output);

// keys = [],
//   k, i, len;

// for (k in myObj) {
//   if (myObj.hasOwnProperty(k)) {
//     keys.push(k);
//   }
// }

// keys.sort();

// len = keys.length;

// for (i = 0; i < len; i++) {
//   k = keys[i];
//   alert(k + ':' + myObj[k]);
// }