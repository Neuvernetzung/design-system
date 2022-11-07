export const keyboardEvent = (key) =>
  new KeyboardEvent("keydown", {
    key,
    bubbles: true,
    cancelable: true,
  });
