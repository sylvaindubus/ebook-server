// This vanilla script is compatible with ebooks that have no React or with React apps that haven't loaded yet. It looks for buttons with data-scroll attributes and scrolls the page by one viewport height (minus a small overlap) when clicked.
(function () {
  var OVERLAP_PX = 40;

  function scrollByViewport(direction) {
    var delta =
      (window.innerHeight - OVERLAP_PX) * (direction === "down" ? 1 : -1);
    window.scrollBy(0, delta);
  }

  function attach() {
    var up = document.querySelector('[data-scroll="up"]');
    var down = document.querySelector('[data-scroll="down"]');
    if (up)
      up.onclick = function () {
        scrollByViewport("up");
      };
    if (down)
      down.onclick = function () {
        scrollByViewport("down");
      };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", attach);
  } else {
    attach();
  }
})();
