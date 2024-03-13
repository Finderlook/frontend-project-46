import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const definFormat = (diff, tree) => {
  switch (tree) {
    case 'stylish': return formatStylish(diff);
    case 'plain': return formatPlain(diff);
    default:
      throw new Error(`Unknown format: ${tree}!`);
  }
};

export default definFormat;
