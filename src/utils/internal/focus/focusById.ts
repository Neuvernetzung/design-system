export const focusById = (id: string, current?: HTMLElement | null) => {
  (
    (current || document)?.querySelectorAll(
      `[id="${id}"]`
    )[0] as HTMLButtonElement | null
  )?.focus();
};
