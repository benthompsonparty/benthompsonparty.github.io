import { fadeIn, fadeOut } from "./utils.js";

let elements = {
  aboutButton: null,
  contactButton: null,
  about: null,
  contact: null,
};

const initElements = () => {
  elements.aboutButton = document.querySelector("#aboutButton");
  elements.contactButton = document.querySelector("#contactButton");
  elements.about = document.querySelector("#about");
  elements.contact = document.querySelector("#contact");
  elements.nav = document.querySelector("nav");
};

const onAboutClick = () => {
  if (elements.aboutButton.classList.contains("open")) {
    elements.aboutButton.classList.remove("open");
    elements.aboutButton.textContent = "About";
    fadeOut(elements.about);
  } else {
    elements.aboutButton.classList.add("open");
    elements.aboutButton.textContent = "Close";
    fadeIn(elements.about);
  }
};

const onContactClick = () => {
  if (elements.contactButton.classList.contains("open")) {
    elements.contactButton.classList.remove("open");
    elements.contactButton.textContent = "Contact";
    fadeOut(elements.contact);
  } else {
    elements.contactButton.classList.add("open");
    elements.contactButton.textContent = "Close";
    fadeIn(elements.contact);
  }
};


document.addEventListener("DOMContentLoaded", () => {
  initElements();
  elements.aboutButton.addEventListener("click", onAboutClick);
  elements.contactButton.addEventListener("click", onContactClick);
  console.debug("common init complete");
});
