export const config = {
  onError: (error: Error): never => {
    throw error;
  },
  editError: (error: Error, optionName: string): Error => {
    error.message += ` (option "${optionName}")`;
    return error;
  },
};
