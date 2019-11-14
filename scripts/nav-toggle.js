(function() {
  var navContainer = document.getElementById("toggle-container");
  var toggleButton = document.getElementById("toggle-button");
  var buttonContent = document.getElementById("button-content");

  var openClassContainer = "open-menu";
  var openClassButton = "bar-close";

  toggleButton.addEventListener("click", () => {
    if (navContainer.classList.contains(openClassContainer)) {
      navContainer.classList.remove(openClassContainer);
      buttonContent.classList.remove(openClassButton);
    } else {
      navContainer.classList.add(openClassContainer);
      buttonContent.classList.add(openClassButton);
    }
  });
})();
