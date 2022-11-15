export const keyboardEvent = (key: any) =>
  new KeyboardEvent("keydown", {
    key,
    bubbles: true,
    cancelable: true,
  });
