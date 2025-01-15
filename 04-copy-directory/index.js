const fs = require('fs').promises;
const path = require('path');

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });

  const destFiles = await fs.readdir(dest).catch(() => []);
  for (const file of destFiles) {
    await fs.unlink(path.join(dest, file)).catch(() => {});
  }

  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

const srcFolder = path.join(__dirname, 'files');
const destFolder = path.join(__dirname, 'files-copy');

copyDir(srcFolder, destFolder).catch((err) => console.error('Ошибка:', err));
