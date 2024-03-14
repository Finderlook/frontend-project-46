const typeValue = (value) => {
  switch (typeof value) {
    case 'string':
      return `'${value}'`;
    case 'object':
      return '[complex value]';
    case 'boolean':
      return `'${value}'`;
    default:
      throw new Error(`Unknown type: ${value}!`);
  }
};

const formatPlain = (diff) => {
  const plainDiff = diff
    .filter((node) => node.status !== 'unchanged')
    .map((node) => {
      console.log(node);
      switch (node.status) {
        case 'added':
          return ``;
        case 'deleted':
          return ``;
        case 'nested':
          return ``;
        case 'changed':
          return ``;
        default:
          throw new Error(`Unknown type: ${node.status}!`);
      }
    });
  return plainDiff;
};

export default formatPlain;
