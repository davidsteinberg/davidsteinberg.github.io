import { random } from "./deps.ts";
import { select } from "./dom.ts";

// Constants
const imageSwitchIntervalMilliseconds = 6000;
const imageSwitchDurationMilliseconds =
  window.matchMedia("(max-width: 500px)").matches ? 250 : 500;

// UI
const home = select("#content-home");

// Drawing bodies
const imgs = (() => {
  // Shuffle images
  const imgs = [
    "bird",
    "space",
    "volcano",
  ];

  const shuffledImgs: string[] = [];

  while (imgs.length > 0) {
    const index = random.int(0, imgs.length - 1);
    const [img] = imgs.splice(index, 1);

    shuffledImgs.push(img);
  }

  return shuffledImgs;
})();

// Create/insert elements for each image
// Could be done lazily if number/size grows
const imgElements: HTMLImageElement[] = [];

for (const img of imgs) {
  const element = document.createElement("img");
  element.src = `assets/${img}.png`;
  element.classList.add("drawing");

  imgElements.push(element);
  home.prepend(element);
}

// Put first image in middle
let onscreenIndex = 0;
let onscreenImgElement = imgElements[onscreenIndex];
onscreenImgElement.style.left = "50%";

const changeImage = () => {
  // Pick next image, wrapping to front of list if needed
  let offscreenIndex = onscreenIndex + 1;
  if (offscreenIndex >= imgs.length) {
    offscreenIndex = 0;
  }

  // Animate old and new images to the left
  const offscreenImgElement = imgElements[offscreenIndex];
  const options = {
    duration: imageSwitchDurationMilliseconds,
    easing: "ease-in-out",
  };

  const animation = onscreenImgElement.animate(
    { left: ["50%", "-150%"] },
    options,
  );

  offscreenImgElement.animate({ left: ["150%", "50%"] }, options);

  // Maintain element positions on animation completion
  animation.onfinish = () => {
    onscreenImgElement.style.left = "-150%";
    offscreenImgElement.style.left = "50%";

    // Update pointer to new middle element
    onscreenIndex = offscreenIndex;
    onscreenImgElement = offscreenImgElement;
  };
};

// Set up automatic carousel interval
let homeTabIsShown = true;
let intervalID = setInterval(changeImage, imageSwitchIntervalMilliseconds);

// Set up intersection observer
const intersectionOptions = {
  threshold: 1.0,
};

const intersectionCallback: IntersectionObserverCallback = (entries) => {
  clearInterval(intervalID);

  if (entries[0].isIntersecting) {
    // Restart interval when home tab is shown
    console.log("Restarting drawing interval (home tab shown)");
    homeTabIsShown = true;
    intervalID = setInterval(changeImage, imageSwitchIntervalMilliseconds);
  } else {
    // Stop interval when home tab is not shown
    console.log("Stopping drawing interval (home tab hidden)");
    homeTabIsShown = false;
  }
};

const intersectionObserver = new IntersectionObserver(
  intersectionCallback,
  intersectionOptions,
);
intersectionObserver.observe(home);

// Stop interval on window blur
window.onblur = () => {
  console.log("Stopping drawing interval (window blur)");
  clearInterval(intervalID);
};

// Restart interval on window focus
window.onfocus = () => {
  if (homeTabIsShown) {
    console.log("Restarting drawing interval (window focus, home tab shown)");
    clearInterval(intervalID);
    intervalID = setInterval(changeImage, imageSwitchIntervalMilliseconds);
  }
};

// Change image and restart interval on user interaction
home.onpointerup = () => {
  clearInterval(intervalID);
  changeImage();
  intervalID = setInterval(changeImage, imageSwitchIntervalMilliseconds);
};
