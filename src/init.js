import { fadeIn, fadeOut, throttle } from "./utils.js";

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

const onScroll = () => {
  const projects = [...document.querySelectorAll("article")];
  const distancesToCenterOfViewport = projects.map((element) => {
    const { top } = element.getBoundingClientRect();
    return Math.abs(top - window.innerHeight / 2);
  });
  const closestDistance = Math.min(...distancesToCenterOfViewport);
  const indexOfClosestElement =
    distancesToCenterOfViewport.indexOf(closestDistance);
  const activeProject = projects[indexOfClosestElement];
  const hrefOfNavElement = `#${activeProject.id}`;
  const activeNavElement = document.querySelector(
    `a[href='${hrefOfNavElement}']`,
  );
  const allNavElements = [...document.querySelectorAll("nav a")];
  allNavElements.forEach((element) => element.classList.remove("active"));
  activeNavElement.classList.add("active");
};

const init = () => {
  initElements();
  elements.aboutButton.addEventListener("click", onAboutClick);
  elements.contactButton.addEventListener("click", onContactClick);
  document.addEventListener("scroll", throttle(onScroll, 100));
  onScroll(); // Call once to set initial value
  console.log("init complete");
};

document.addEventListener("DOMContentLoaded", init);
