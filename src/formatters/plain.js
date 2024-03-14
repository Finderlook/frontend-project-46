const typeValue = (value) => {
  if (value === null) {
    return null;
  }
  switch (typeof value) {
    case 'string':
      return `'${value}'`;
    case 'object':
      return '[complex value]';
    case 'boolean':
      return `${value}`;
    default:
      throw new Error(`Unknown type: ${value}!`);
  }
};

const formatPlain = (diff) => {
  const iter = (diffNode, path) => {
    const plainDiff = diffNode
      .filter((node) => node.status !== 'unchanged')
      .flatMap((node) => {
        const fullPath = (path === '') ? `${node.key}` : `${path}.${node.key}`;
        switch (node.status) {
          case 'nested':
            return iter(node.children, fullPath);
          case 'deleted':
            return `Property '${fullPath}' was removed`;
          case 'added':
            return `Property '${fullPath}' was added with value: ${typeValue(node.value2)}`;
          case 'changed':
            return `Property '${fullPath}' was updated. From ${typeValue(node.value1)} to ${typeValue(node.value2)}`;
          default:
            throw new Error(`Unknown type: ${node.status}!`);
        }
      });
    return plainDiff.join('\n');
  };
  return iter(diff, '');
};

export default formatPlain;
