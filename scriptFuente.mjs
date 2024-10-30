import fs from 'fs';
import path from 'path';

const projectDir = path.resolve('src'); // Cambia 'src' por el directorio raíz de tu proyecto

const fontFamilies = new Set();

const searchFontsInFile = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf-8');
  const fontRegex = /font-family:\s*['"]?([^'";]+)['"]?/gi;
  let match;
  while ((match = fontRegex.exec(content)) !== null) {
    fontFamilies.add(match[1].trim());
  }
};

const searchFontsInDir = (dir) => {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      searchFontsInDir(filePath);
    } else if (filePath.endsWith('.css') || filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
      searchFontsInFile(filePath);
    }
  });
};

searchFontsInDir(projectDir);

console.log('Tipos de fuentes encontrados:');
fontFamilies.forEach(font => console.log(font));