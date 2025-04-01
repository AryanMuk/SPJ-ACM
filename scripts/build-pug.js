'use strict';
const fs = require('fs');
const upath = require('upath');
const pug = require('pug');

// Function to determine the output path based on the input file path
function getOutputPath(filePath) {
  // Example: Replace '/src/' with '/dist/' and change the file extension to .html
  const dir = upath.dirname(filePath).replace(`${upath.sep}src${upath.sep}`, `${upath.sep}dist${upath.sep}`);
  const fileName = upath.basename(filePath, '.pug') + '.html';
  return upath.join(dir, fileName);
}

// Wrap the synchronous pug.renderFile in a promise to simulate asynchronous behavior
function compilePugAsync(filePath) {
  return new Promise((resolve, reject) => {
    try {
      const html = pug.renderFile(filePath);
      resolve(html);
    } catch (err) {
      reject(err);
    }
  });
}

async function renderPug(filePath) {
  try {
    const renderedHtml = await compilePugAsync(filePath);
    const outputPath = getOutputPath(filePath);
    // Ensure that the output directory exists
    fs.mkdirSync(upath.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, renderedHtml);
    console.log(`Rendered ${filePath} successfully.`);
  } catch (error) {
    console.error(`Error rendering ${filePath}:`, error);
  }
}

module.exports = renderPug;
