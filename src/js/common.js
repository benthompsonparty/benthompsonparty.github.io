import { fadeIn, fadeOut } from "./utils.js";

let elements = {
  projectsButton: null,
  aboutButton: null,
  contactButton: null,
  about: null,
  contact: null,
  nav: null,
};

const initElements = () => {
  elements.projectsButton = document.querySelector("#projectsButton");
  elements.aboutButton = document.querySelector("#aboutButton");
  elements.contactButton = document.querySelector("#contactButton");
  elements.about = document.querySelector("#about");
  elements.contact = document.querySelector("#contact");
  elements.nav = document.querySelector("nav");
};

export const isMobile = window.matchMedia("(orientation: portrait)");

const onClickOutside = (elements, callback) => {
  const outsideClickListener = (event) => {
    const clickIsOutsideElement = (element) => {
      return !element.contains(event.target);
    };

    if (elements.every(clickIsOutsideElement)) {
      callback();
      removeClickListener();
    }
  };

  const removeClickListener = () => {
    document.removeEventListener("click", outsideClickListener);
  };

  document.addEventListener("click", outsideClickListener);
};

const m_activateProjectsTab = () => {
  elements.projectsButton.classList.add("primary");
  elements.projectsButton.classList.remove("secondary");
  fadeIn(elements.nav);
};

const m_deactivateProjectsTab = () => {
  elements.projectsButton.classList.remove("primary");
  elements.projectsButton.classList.add("secondary");
  fadeOut(elements.nav);
};

const m_activateAboutTab = () => {
  elements.aboutButton.classList.add("primary");
  elements.aboutButton.classList.remove("secondary");
  fadeIn(elements.about);
};

const m_deactivateAboutTab = () => {
  elements.aboutButton.classList.remove("primary");
  elements.aboutButton.classList.add("secondary");
  fadeOut(elements.about);
};

const m_activateContactTab = () => {
  elements.contactButton.classList.add("primary");
  elements.contactButton.classList.remove("secondary");
  fadeIn(elements.contact);
};

const m_deactivateContactTab = () => {
  elements.contactButton.classList.remove("primary");
  elements.contactButton.classList.add("secondary");
  fadeOut(elements.contact);
};

const m_onProjectsClick = (event) => {
  const isActive = !elements.projectsButton.classList.contains("secondary");
  if (!isActive) {
    m_activateProjectsTab();
    m_deactivateAboutTab();
    m_deactivateContactTab();
  }
  event.preventDefault();
};

const m_onAboutClick = () => {
  const isActive = !elements.aboutButton.classList.contains("secondary");
  if (!isActive) {
    m_activateAboutTab();
    m_deactivateProjectsTab();
    m_deactivateContactTab();
    onClickOutside(
      [elements.about, elements.aboutButton, elements.contactButton],
      () => {
        m_activateProjectsTab();
        m_deactivateAboutTab();
      },
    );
  }
};

const m_onContactClick = () => {
  const isActive = !elements.contactButton.classList.contains("secondary");
  if (!isActive) {
    m_activateContactTab();
    m_deactivateProjectsTab();
    m_deactivateAboutTab();
    onClickOutside(
      [elements.contact, elements.contactButton, elements.aboutButton],
      () => {
        m_activateProjectsTab();
        m_deactivateContactTab();
      },
    );
  }
};

const d_openAbout = () => {
  elements.aboutButton.classList.add("open");
  elements.aboutButton.textContent = "Close";
  fadeIn(elements.about);
};

const d_closeAbout = () => {
  elements.aboutButton.classList.remove("open");
  elements.aboutButton.textContent = "About";
  fadeOut(elements.about);
};

const d_onAboutClick = () => {
  const isOpen = elements.aboutButton.classList.contains("open");
  if (isOpen) {
    d_closeAbout();
  } else {
    d_openAbout();
    onClickOutside([elements.about, elements.aboutButton], d_closeAbout);
  }
};

const d_openContact = () => {
  elements.contactButton.classList.add("open");
  elements.contactButton.textContent = "Close";
  fadeIn(elements.contact);
};

const d_closeContact = () => {
  elements.contactButton.classList.remove("open");
  elements.contactButton.textContent = "Contact";
  fadeOut(elements.contact);
};

const d_onContactClick = () => {
  const isOpen = elements.contactButton.classList.contains("open");
  if (isOpen) {
    d_closeContact();
  } else {
    d_openContact();
    onClickOutside([elements.contact, elements.contactButton], d_closeContact);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  initElements();

  if (isMobile.matches) {
    elements.projectsButton.addEventListener("click", m_onProjectsClick);
    elements.aboutButton.addEventListener("click", m_onAboutClick);
    elements.contactButton.addEventListener("click", m_onContactClick);
  } else {
    elements.aboutButton.addEventListener("click", d_onAboutClick);
    elements.contactButton.addEventListener("click", d_onContactClick);
  }

  console.debug("common init complete");
});
