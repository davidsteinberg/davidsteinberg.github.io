const select = (s: string) => document.querySelector(s) as HTMLElement;
const selectAll = (s: string) =>
  document.querySelectorAll(s) as NodeListOf<HTMLElement>;

export { select, selectAll };
