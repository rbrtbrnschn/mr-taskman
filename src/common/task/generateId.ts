const superCoolName = () => {
  let id = 0;

  return () => {
    if (id === 10000) {
      id = 0;
    }
    const idString = id.toString().padStart(4, '0');
    id = id + 1;
    return idString;
  };
};

const generateId = superCoolName();

export default generateId;
