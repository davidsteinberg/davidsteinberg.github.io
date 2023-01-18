// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

const coin = ()=>{
    return Math.random() < 0.5;
};
const __int = (low, high)=>{
    const min = Math.ceil(low);
    const max = Math.floor(high);
    return Math.floor(Math.random() * (max - min + 1) + min);
};
const rgb = (low = 0, high = 255)=>{
    const r = __int(low, high);
    const g = __int(low, high);
    const b = __int(low, high);
    return {
        r,
        g,
        b
    };
};
const color = (low = 0, high = 255)=>{
    const { r , g , b  } = rgb(low, high);
    return `rgb(${r}, ${g}, ${b})`;
};
const element = (array)=>{
    const high = array.length - 1;
    const index = __int(0, high);
    return array[index];
};
const __default = {
    coin,
    int: __int,
    rgb,
    color,
    element
};
const select = (s)=>document.querySelector(s);
const selectAll = (s)=>document.querySelectorAll(s);
const imageSwitchIntervalMilliseconds = 6000;
const imageSwitchDurationMilliseconds = window.matchMedia("(max-width: 500px)").matches ? 250 : 500;
const home = select("#content-home");
const imgs = (()=>{
    const imgs = [
        "bird",
        "space",
        "volcano", 
    ];
    const shuffledImgs = [];
    while(imgs.length > 0){
        const index = __default.int(0, imgs.length - 1);
        const [img] = imgs.splice(index, 1);
        shuffledImgs.push(img);
    }
    return shuffledImgs;
})();
const imgElements = [];
for (const img of imgs){
    const element1 = document.createElement("img");
    element1.src = `assets/${img}.png`;
    element1.classList.add("drawing");
    imgElements.push(element1);
    home.prepend(element1);
}
let onscreenIndex = 0;
let onscreenImgElement = imgElements[onscreenIndex];
onscreenImgElement.style.left = "50%";
const changeImage = ()=>{
    let offscreenIndex = onscreenIndex + 1;
    if (offscreenIndex >= imgs.length) {
        offscreenIndex = 0;
    }
    const offscreenImgElement = imgElements[offscreenIndex];
    const options = {
        duration: imageSwitchDurationMilliseconds,
        easing: "ease-in-out"
    };
    const animation = onscreenImgElement.animate({
        left: [
            "50%",
            "-150%"
        ]
    }, options);
    offscreenImgElement.animate({
        left: [
            "150%",
            "50%"
        ]
    }, options);
    animation.onfinish = ()=>{
        onscreenImgElement.style.left = "-150%";
        offscreenImgElement.style.left = "50%";
        onscreenIndex = offscreenIndex;
        onscreenImgElement = offscreenImgElement;
    };
};
let homeTabIsShown = true;
let intervalID = setInterval(changeImage, 6000);
const intersectionOptions = {
    threshold: 1.0
};
const intersectionCallback = (entries)=>{
    clearInterval(intervalID);
    if (entries[0].isIntersecting) {
        console.log("Restarting drawing interval (home tab shown)");
        homeTabIsShown = true;
        intervalID = setInterval(changeImage, imageSwitchIntervalMilliseconds);
    } else {
        console.log("Stopping drawing interval (home tab hidden)");
        homeTabIsShown = false;
    }
};
const intersectionObserver = new IntersectionObserver(intersectionCallback, intersectionOptions);
intersectionObserver.observe(home);
window.onblur = ()=>{
    console.log("Stopping drawing interval (window blur)");
    clearInterval(intervalID);
};
window.onfocus = ()=>{
    if (homeTabIsShown) {
        console.log("Restarting drawing interval (window focus, home tab shown)");
        clearInterval(intervalID);
        intervalID = setInterval(changeImage, imageSwitchIntervalMilliseconds);
    }
};
home.onpointerup = ()=>{
    clearInterval(intervalID);
    changeImage();
    intervalID = setInterval(changeImage, imageSwitchIntervalMilliseconds);
};
select("#contact").onclick = (event)=>{
    const target = event.target;
    const name = "hi";
    const domain = "david.recipes";
    target.href = `mailto:${name}@${domain}`;
};
const LIGHT_MODE_PREF_KEY = "light-mode";
const lightColor = "#fefefe";
const darkColor = "#111111";
const theme = select('meta[name="theme-color"]');
const switchContainer = select("#mode-switch-container");
const switchInner = select("#mode-switch > div");
const bodyStyle = document.body.style;
bodyStyle.setProperty("--color-light", lightColor);
bodyStyle.setProperty("--color-dark", darkColor);
let inDarkMode = true;
const setLightMode = ()=>{
    theme.setAttribute("content", lightColor);
    document.body.classList.add("light-mode");
    window.localStorage.setItem(LIGHT_MODE_PREF_KEY, "");
    inDarkMode = false;
};
const setDarkMode = ()=>{
    theme.setAttribute("content", darkColor);
    document.body.classList.remove("light-mode");
    window.localStorage.removeItem(LIGHT_MODE_PREF_KEY);
    inDarkMode = true;
};
const toggleMode = ()=>{
    if (inDarkMode) {
        setLightMode();
    } else {
        setDarkMode();
    }
};
const useLightMode = window.localStorage.getItem(LIGHT_MODE_PREF_KEY) !== null || window.matchMedia("(prefers-color-scheme: light)").matches;
if (useLightMode) {
    setLightMode();
} else {
    setDarkMode();
}
setTimeout(()=>{
    switchInner.style.transitionDuration = "0.2s";
}, 200);
switchContainer.onpointerup = toggleMode;
const ui = {
    tabs: {
        all: selectAll("#tabs li"),
        home: select("#tab-home"),
        about: select("#tab-about"),
        projects: select("#tab-projects"),
        contact: select("#tab-contact")
    },
    content: {
        all: selectAll(".content"),
        home: select("#content-home"),
        about: select("#content-about"),
        projects: select("#content-projects"),
        contact: select("#content-contact")
    }
};
const pairs = [
    {
        tab: ui.tabs.home,
        content: ui.content.home
    },
    {
        tab: ui.tabs.about,
        content: ui.content.about
    },
    {
        tab: ui.tabs.projects,
        content: ui.content.projects
    },
    {
        tab: ui.tabs.contact,
        content: ui.content.contact
    }, 
];
for (const { tab , content  } of pairs){
    tab.onpointerup = ()=>{
        ui.tabs.all.forEach((element)=>{
            element.classList.remove("selected");
        });
        ui.content.all.forEach((element)=>{
            element.classList.add("hidden");
        });
        tab.classList.add("selected");
        content.classList.remove("hidden");
    };
}
