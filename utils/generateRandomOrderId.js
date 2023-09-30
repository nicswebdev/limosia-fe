export const generateRandomOrderId = (f_name) => {
  const timestamp = new Date().getTime(); // Get current timestamp in milliseconds
  const randomValue = Math.floor(Math.random() * 1000); // Add a random component

  // Combine timestamp and random value to create the ID
  const id = `${f_name}${timestamp}${randomValue}`;

  return id;
};
