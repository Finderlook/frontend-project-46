const formatPlain = (diff) => {
  console.log(`Дерево отличий: ${JSON.stringify(diff, null, 2)}`);
  return 1;
};

export default formatPlain;
