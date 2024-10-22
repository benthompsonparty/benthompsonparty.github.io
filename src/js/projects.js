import { throttle } from "./utils.js";

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

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("scroll", throttle(onScroll, 100));
  onScroll(); // Call once to set initial value
  console.debug("projects init complete");
});
