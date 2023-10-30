function toggleDropdown(dropdownId) {
  var dropdownContent = document.getElementById(dropdownId);
  dropdownContent.classList.toggle("d-none");
}

function showContent(action, contentId) {
  var content = document.getElementById(contentId);
  if (action === "DELETE") {
    content.innerHTML = "DELETE";
  } else if (action === "EDIT") {
    content.innerHTML = "EDIT";
  }
  // כדי להסתיר את התפריט לאחר בחירת פעולה
  var dropdownContent = document.getElementById(contentId);
  dropdownContent.classList.add("d-none");
}
  