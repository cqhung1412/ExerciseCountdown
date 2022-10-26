const isEmpty = (object) => {
  for (const _property in object) return false;
  return true;
};

const objectUtil = { isEmpty };

export default objectUtil;
