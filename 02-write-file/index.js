// 02-write-file/index.js

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'output.txt');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const logFileStream = fs.createWriteStream(filePath, { flags: 'a' });

console.log(
  'Введите текст для записи в файл. Для выхода нажмите Ctrl+C или введите "exit".',
);

rl.on('line', (input) => {
  if (input.trim().toLowerCase() === 'exit') {
    console.log('До свидания!');
    rl.close();
    return;
  }

  logFileStream.write(`${input}\n`, (err) => {
    if (err) {
      console.error('Ошибка записи в файл:', err);
      rl.close();
    }
  });
});

rl.on('SIGINT', () => {
  console.log('До свидания!');
  rl.close();
});

rl.on('close', () => {
  logFileStream.end();
});
