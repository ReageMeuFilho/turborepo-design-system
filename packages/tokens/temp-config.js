
const StyleDictionary = require('style-dictionary');

StyleDictionary.registerFormat({
  name: 'javascript/tailwind',
  formatter: function({ dictionary }) {
    const tokens = {
      colors: {},
      spacing: {},
      borderRadius: {},
    };

    dictionary.allProperties.forEach(prop => {
      const category = prop.attributes.category;
      const name = prop.path.slice(1).join('-'); 
      const value = prop.value;

      if (category === 'color') {
        // Use CSS variable reference for colors to ensure dynamic theming
        tokens.colors[name] = `var(--color-${name})`;
      } else if (category === 'spacing') {
        tokens.spacing[name] = value;
      } else if (category === 'borderRadius') {
        tokens.borderRadius[name] = value;
      }
    });

    return `module.exports = ${JSON.stringify(tokens, null, 2)};`;
  }
});
module.exports = {
  source: ["tokens.json"],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "../../apps/web/public/styles/",
      files: [{
        destination: "css-variables.css",
        format: "css/variables",
        options: {
          outputReferences: true,
        }
      }]
    },
    tailwind: {
      transformGroup: "js",
      buildPath: "../../apps/web/",
      files: [{
        destination: "tailwind-tokens.js",
        format: "javascript/tailwind",
      }]
    }
  }
};
