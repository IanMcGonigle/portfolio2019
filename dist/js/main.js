"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var isInViewport = function isInViewport(el) {
  var rect = el.getBoundingClientRect();
  var windowHeight = window.innerHeight || document.documentElement.clientHeight;
  var windowWidth = window.innerWidth || document.documentElement.clientWidth;
  var vertInView = rect.top <= windowHeight - 200 && rect.top + rect.height >= 0;
  var horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;

  return vertInView && horInView;
};

var debounce = function debounce(func, wait, immediate) {
  var timeout = void 0;
  return function () {
    var context = this,
        args = arguments;
    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

var init = function init() {
  var sections = [].concat(_toConsumableArray(document.querySelectorAll("section")));
  var updateSections = function updateSections() {
    sections.forEach(function (section) {
      if (isInViewport(section)) {
        section.classList.add("active");
      }
    });
  };
  var handleScroll = debounce(updateSections, 25);
  window.addEventListener("scroll", handleScroll);
  updateSections();

  var samples = [].concat(_toConsumableArray(document.querySelectorAll(".work__sample")));

  var mouseOn = function mouseOn() {
    var _this = this;

    samples.forEach(function (sample) {
      if (_this != sample) {
        sample.classList.add("blurred");
      } else {
        sample.classList.remove("blurred");
      }
    });
  };

  var mouseOff = function mouseOff() {
    console.log("mouse off ", this);
    samples.forEach(function (sample) {
      return sample.classList.remove("blurred");
    });
  };

  samples.forEach(function (sample) {
    sample.addEventListener("mouseover", mouseOn);
    sample.addEventListener("mouseout", mouseOff);
  });
};

// window.onload = init;
window.addEventListener("DOMContentLoaded", function (event) {
  console.log("DOM fully loaded and parsed");
  init();
});
