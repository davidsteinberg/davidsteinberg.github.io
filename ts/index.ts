import { random } from "./deps.ts";

// DOM helpers
const select = (selector: string): HTMLElement => {
  return document.querySelector(selector) as HTMLElement;
};

// UI namespace
const ui = {
  root: select(":root"),
  theme: select('meta[name="theme-color"]'),
  colorToggle: select("#color-toggle"),
  contact: select("#contact"),
};

// Randomize colors
let whiteText = true;
const randomizeColors = () => {
  const color = random.color(0, 150);
  const foreground = whiteText ? "white" : color;
  const background = whiteText ? color : "white";

  const { theme, root } = ui;
  const { style } = root;

  theme.setAttribute("content", background);
  style.setProperty("--color", foreground);
  style.setProperty("--background-color", background);

  whiteText = !whiteText;
};

ui.colorToggle.onclick = randomizeColors;
randomizeColors();

// Contact
ui.contact.onclick = (event) => {
  const target = event.target as HTMLAnchorElement;
  const name = "hi";
  const domain = "david.recipes";

  target.href = `mailto:${name}@${domain}`;
};
