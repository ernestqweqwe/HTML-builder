const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');

const readFileAsync = (path) => {
  return new Promise((resolve, reject) =>
    fs.readFile(path, { encoding: 'utf-8' }, (error, data) => {
      if (error) {
        return reject(error.message);
      }
      resolve(data);
    }),
  );
};

readFileAsync(filePath).then((data) => console.log(data));
