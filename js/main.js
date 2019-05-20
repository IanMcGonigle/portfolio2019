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
      var onScreen = isInViewport(section);
      console.log("classlist ", section.classList, onScreen);
      onScreen ? section.classList.add("active") : section.classList.remove("active");
    });
  };
  var handleScroll = debounce(updateSections, 250);
  window.addEventListener("scroll", handleScroll);
  updateSections();
};

window.onload = init;
