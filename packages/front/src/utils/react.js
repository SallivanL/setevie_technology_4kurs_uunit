export const useClampState = initialState => {
  return React.useState(initialState)[0];
};