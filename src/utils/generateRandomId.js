const generateRandomId = () => {
  const randomNumber = Math.floor(Math.random() * 1000);

  return randomNumber;
};

export default generateRandomId;
