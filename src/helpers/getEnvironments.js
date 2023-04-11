/**
 * This function returns the environment variables using the import.meta.env object in JavaScript.
 * @returns The function `getEnvironments` returns an object that contains all the properties of the
 * `import.meta.env` object.
 */
export const getEnvironments = () => {
  const env = import.meta.env;

  return {
    ...env,
  };
};
