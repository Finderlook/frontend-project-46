import _ from 'lodash';

const getDiffTree = (data1, data2) => {
  const keysSort = _.sortBy([...new Set([...Object.keys(data1), ...Object.keys(data2)])]);
  const diff = keysSort
    .map((key) => {
      const value1 = data1[key];
      const value2 = data2[key];
      if (_.has(data1, key) && !_.has(data2, key)) {
        return { key, value1, status: 'deleted' };
      }
      if (!_.has(data1, key) && _.has(data2, key)) {
        return { key, value2, status: 'added' };
      }
      if (_.isEqual(value1, value2)) {
        return { key, value1, status: 'unchanged' };
      }
      if (_.isObject(value1) && _.isObject(value2)) {
        return { key, children: getDiffTree(value1, value2), status: 'nested' };
      }
      return {
        key, value1, value2, status: 'changed',
      };
    });
  return diff;
};

export default getDiffTree;
