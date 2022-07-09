import { select, selectAll } from "./dom.ts";

// UI
const ui = {
  tabs: {
    all: selectAll("#tabs li"),
    home: select("#tab-home"),
    about: select("#tab-about"),
    projects: select("#tab-projects"),
    contact: select("#tab-contact"),
  },
  content: {
    all: selectAll(".content"),
    home: select("#content-home"),
    about: select("#content-about"),
    projects: select("#content-projects"),
    contact: select("#content-contact"),
  },
};

const pairs = [
  { tab: ui.tabs.home, content: ui.content.home },
  { tab: ui.tabs.about, content: ui.content.about },
  { tab: ui.tabs.projects, content: ui.content.projects },
  { tab: ui.tabs.contact, content: ui.content.contact },
];

for (const { tab, content } of pairs) {
  // Tapping a tab hides all tabs and shows only paired content
  tab.onpointerup = () => {
    ui.tabs.all.forEach((element) => {
      element.classList.remove("selected");
    });

    ui.content.all.forEach((element) => {
      element.classList.add("hidden");
    });

    tab.classList.add("selected");
    content.classList.remove("hidden");
  };
}
