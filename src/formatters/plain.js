import _ from 'lodash';

const typeValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
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
