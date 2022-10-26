const isEmpty = (object: any) => {
  for (const _property in object) return false;
  return true;
};

const objectUtil = { isEmpty };

export default objectUtil;
