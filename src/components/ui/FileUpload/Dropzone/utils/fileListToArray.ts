export const fileListToArray = (files: FileList) =>
  new Array(files.length).fill(null).map((_, i) => files[i]);
