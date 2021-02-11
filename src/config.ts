/**
 * Fields used in `cli-bespoke`.
 * Each field can be replaced for customizing the behavior.
 */
export const config = {
  /**
   * Function that receives `error` and performs a nonlocal exit.
   * At default it just rethrows `error`.
   */
  onError: (error: Error): never => {
    throw error;
  },

  /**
   * Function that edits `error` before being passed to `onError()`.
   * At default it appends `optionName` to the error message.
   */
  editError: (error: Error, optionName: string): Error => {
    error.message += ` (option "${optionName}")`;
    return error;
  },
};
