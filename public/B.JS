var elements = document.querySelectorAll(".single-line-name");

var tabsClick = function() {
  var tab = this.getAttribute("tab");
  var element = document.querySelector("#" + tab);
  disableStyle();
  hideSection(["#publish", "#communities", "#friends"]);
  element.style.display = "block";
  this.children[0].style.display = "block";

};

var hideSection = function(elementList = []) {
  for (var i = 0; i < elementList.length; i++) {
    document.querySelector(elementList[i]).style.display = "none";
  }
};

var disableStyle = function() {
  for (var i = 0; i < elements.length; i++) {
    elements[i].children[0].style.display = "none";
  }
};

var init = function() {
  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", tabsClick, false);
  }
};

init();
