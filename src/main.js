const isInViewport = el => {
  const rect = el.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  const vertInView =
    rect.top <= windowHeight - 200 && rect.top + rect.height >= 0;
  const horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;

  return vertInView && horInView;
};

const debounce = (func, wait, immediate) => {
  let timeout;
  return function() {
    const context = this,
      args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

const init = () => {
  const sections = [...document.querySelectorAll("section")];
  const updateSections = () => {
    sections.forEach(section => {
      if (isInViewport(section)) {
        section.classList.add("active");
      }
    });
  };
  const handleScroll = debounce(updateSections, 25);
  window.addEventListener("scroll", handleScroll);
  updateSections();

  const samples = [...document.querySelectorAll(".work__sample")];

  const mouseOn = function() {
    samples.forEach(sample => {
      if (this != sample) {
        sample.classList.add("blurred");
      } else {
        sample.classList.remove("blurred");
      }
    });
  };

  const mouseOff = function() {
    console.log("mouse off ", this);
    samples.forEach(sample => sample.classList.remove("blurred"));
  };

  samples.forEach(sample => {
    sample.addEventListener("mouseover", mouseOn);
    sample.addEventListener("mouseout", mouseOff);
  });
};

// window.onload = init;
window.addEventListener("DOMContentLoaded", event => {
  console.log("DOM fully loaded and parsed");
  init();
});
