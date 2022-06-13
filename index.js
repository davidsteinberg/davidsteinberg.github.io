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
const select = (selector)=>{
    return document.querySelector(selector);
};
const ui = {
    root: select(":root"),
    theme: select('meta[name="theme-color"]'),
    colorToggle: select("#color-toggle"),
    contact: select("#contact")
};
let whiteText = true;
const randomizeColors = ()=>{
    const color1 = __default.color(0, 150);
    const foreground = whiteText ? "white" : color1;
    const background = whiteText ? color1 : "white";
    const { theme , root  } = ui;
    const { style  } = root;
    theme.setAttribute("content", background);
    style.setProperty("--color", foreground);
    style.setProperty("--background-color", background);
    whiteText = !whiteText;
};
ui.colorToggle.onclick = randomizeColors;
randomizeColors();
ui.contact.onclick = (event)=>{
    const target = event.target;
    const name = "hi";
    const domain = "david.recipes";
    target.href = `mailto:${name}@${domain}`;
};
