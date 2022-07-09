import { select } from "./dom.ts";

// Constants
const LIGHT_MODE_PREF_KEY = "light-mode";
const lightColor = "#fefefe";
const darkColor = "#111111";

// UI
const theme = select('meta[name="theme-color"]');
const switchContainer = select("#mode-switch-container");
const switchInner = select("#mode-switch > div");
const bodyStyle = document.body.style;

bodyStyle.setProperty("--color-light", lightColor);
bodyStyle.setProperty("--color-dark", darkColor);

// Setting mode
let inDarkMode = true;

const setLightMode = () => {
  theme.setAttribute("content", lightColor);
  document.body.classList.add("light-mode");
  window.localStorage.setItem(LIGHT_MODE_PREF_KEY, "");
  inDarkMode = false;
};

const setDarkMode = () => {
  theme.setAttribute("content", darkColor);
  document.body.classList.remove("light-mode");
  window.localStorage.removeItem(LIGHT_MODE_PREF_KEY);
  inDarkMode = true;
};

const toggleMode = () => {
  if (inDarkMode) {
    setLightMode();
  } else {
    setDarkMode();
  }
};

// Apply appropriate mode on load
const useLightMode =
  (window.localStorage.getItem(LIGHT_MODE_PREF_KEY) !== null) ||
  (window.matchMedia("(prefers-color-scheme: light)").matches);

if (useLightMode) {
  setLightMode();
} else {
  setDarkMode();
}

// Set switch transition duration after setting mode
// so the switch doesn't jump into position up front
setTimeout(() => {
  switchInner.style.transitionDuration = "0.2s";
}, 200);

// Make switch toggle mode
switchContainer.onpointerup = toggleMode;
