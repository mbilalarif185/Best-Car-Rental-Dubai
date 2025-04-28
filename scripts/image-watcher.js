const chokidar = require('chokidar');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const watchFolder = path.join(__dirname, '../public/assets/imgs');

const convertToWebp = (filePath) => {
  if (path.extname(filePath).toLowerCase() === '.webp') return;

  const outputPath = filePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');

  sharp(filePath)
    .webp({ quality: 80 })
    .toFile(outputPath)
    .then(() => {
      console.log(`✅ Converted: ${path.basename(filePath)} → ${path.basename(outputPath)}`);
    })
    .catch((err) => {
      console.error(`❌ Error converting ${filePath}:`, err);
    });
};

chokidar.watch(watchFolder, {
  ignored: /(^|[\/\\])\../,
  persistent: true,
  ignoreInitial: true,
}).on('add', (filePath) => {
  if (/\.(png|jpe?g)$/i.test(filePath)) {
    convertToWebp(filePath);
  }
});
