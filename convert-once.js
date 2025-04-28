const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const convertToWebP = (dir) => {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      convertToWebP(fullPath); // recursively check subfolders
    } else if (/\.(png|jpe?g)$/i.test(file)) {
      const webpPath = fullPath.replace(/\.(png|jpe?g)$/i, '.webp');

      sharp(fullPath)
        .webp({ quality: 80 })
        .toFile(webpPath)
        .then(() => {
          console.log(`✅ Converted: ${file} → WebP`);
          // Optional: delete the original image if needed
          // fs.unlinkSync(fullPath);
        })
        .catch(err => console.error(`❌ Error converting ${file}:`, err));
    }
  });
};

// START CONVERSION from this folder (adjust if needed)
convertToWebP(path.join(__dirname, 'public/assets/imgs'));
