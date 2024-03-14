import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const definFormat = (diff, tree) => {
  switch (tree) {
    case 'stylish': return formatStylish(diff);
    case 'plain': return formatPlain(diff);
    case 'json': return JSON.stringify(diff, null, 2);
    default:
      throw new Error(`Unknown format: ${tree}!`);
  }
};

export default definFormat;
