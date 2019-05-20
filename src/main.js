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
      const onScreen = isInViewport(section);
      console.log("classlist ", section.classList, onScreen);
      onScreen
        ? section.classList.add("active")
        : section.classList.remove("active");
    });
  };
  const handleScroll = debounce(updateSections, 250);
  window.addEventListener("scroll", handleScroll);
  updateSections();
};

window.onload = init;
