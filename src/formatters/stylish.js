import _ from 'lodash';

const getIndent = (depth) => {
  const fill = ' ';
  const space = 4;
  return fill.repeat((space * depth) - 2);
};
const getBracketIndent = (depth) => {
  const fill = ' ';
  const space = 4;
  return fill.repeat((space * depth) - space);
};
const valueStr = (val, depth) => {
  if (!_.isObject(val)) {
    return val;
  }
  const spaces = getIndent(depth);
  const spacesBrackets = getBracketIndent(depth);
  const currentValue = Object.entries(val);
  const result = currentValue.map(([key, value]) => `${spaces}  ${key}: ${valueStr(value, depth + 1)}`);
  return ['{', ...result, `${spacesBrackets}}`].join('\n');
};

const formatStylish = (diff) => {
  const iter = (currentIter, depth = 1) => {
    const spaces = getIndent(depth);
    const spacesBrackets = getBracketIndent(depth);
    const stylishDiff = currentIter.flatMap((node) => {
      switch (node.status) {
        case 'added':
          return `${spaces}+ ${node.key}: ${valueStr(node.value2, depth + 1)}`;
        case 'deleted':
          return `${spaces}- ${node.key}: ${valueStr(node.value1, depth + 1)}`;
        case 'nested':
          return `${spaces}  ${node.key}: ${iter(node.children, depth + 1)}`;
        case 'changed':
          return [
            `${spaces}- ${node.key}: ${valueStr(node.value1, depth + 1)}`,
            `${spaces}+ ${node.key}: ${valueStr(node.value2, depth + 1)}`,
          ];
        case 'unchanged':
          return `${spaces}  ${node.key}: ${valueStr(node.value1, depth + 1)}`;
        default:
          throw new Error(`Unknown type: ${node.status}!`);
      }
    });
    return ['{', ...stylishDiff, `${spacesBrackets}}`].join('\n');
  };
  return iter(diff);
};

export default formatStylish;
