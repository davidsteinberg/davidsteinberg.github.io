import { select } from "./dom.ts";

select("#contact").onclick = (event) => {
  const target = event.target as HTMLAnchorElement;
  const name = "hi";
  const domain = "david.recipes";

  target.href = `mailto:${name}@${domain}`;
};
