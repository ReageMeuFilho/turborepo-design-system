const fs = require('fs');
const path = require('path');

const tokensPath = path.join(__dirname, 'tokens.json');
const outputPath = path.join(__dirname, '../../apps/web/tailwind-tokens.js');

try {
  const tokensRaw = fs.readFileSync(tokensPath, 'utf-8');
  const tokensJson = JSON.parse(tokensRaw);

  const tokens = {
    colors: {},
    spacing: {},
    borderRadius: {},
  };

  // Helper function to flatten and transform tokens
  function processTokens(obj, path = []) {
    for (const key in obj) {
      const currentPath = [...path, key];
      const value = obj[key];

      if (value.type) {
        const category = value.type.toLowerCase();
        const name = currentPath.slice(1).join('-');
        const tokenValue = value.value;

        if (category === 'color') {
          // Use CSS variable reference for colors to ensure dynamic theming
          tokens.colors[name] = `var(--color-${name})`;
        } else if (category === 'spacing') {
          tokens.spacing[name] = tokenValue;
        } else if (category === 'borderradius') {
          tokens.borderRadius[name] = tokenValue;
        }
      } else if (typeof value === 'object' && value !== null) {
        processTokens(value, currentPath);
      }
    }
  }

  processTokens(tokensJson);

  const outputContent = `module.exports = ${JSON.stringify(tokens, null, 2)};`;
  fs.writeFileSync(outputPath, outputContent);
  console.log(`✔︎ ${path.relative(path.join(__dirname, '../..'), outputPath)}`);

} catch (error) {
  console.error('Failed to build Tailwind tokens:', error.message);
  process.exit(1);
}
