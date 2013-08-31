// Saves options to localStorage.
function save_options() {
  
  var select = document.getElementById("open");
  var open = select.children[select.selectedIndex].value;
  localStorage["open"] = open;

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  removeClass(status, "hidden");
  setTimeout(function() {
    status.innerHTML = "";
    addClass(status, "hidden");
  }, 1500);

}

// Restores select box state to saved value from localStorage.
function restore_options() {
  var favorite = localStorage["open"];
  if (!favorite) {
    return;
  }
  var select = document.getElementById("open");
  for (var i = 0; i < select.children.length; i++) {
    var child = select.children[i];
    if (child.value == favorite) {
      child.selected = "true";
      break;
    }
  }
}
function hasClass(el, name) {
   return new RegExp('(\\s|^)'+name+'(\\s|$)').test(el.className);
}

function addClass(el, name)
{
   if (!hasClass(el, name)) { el.className += (el.className ? ' ' : '') +name; }
}

function removeClass(el, name)
{
   if (hasClass(el, name)) {
      el.className=el.className.replace(new RegExp('(\\s|^)'+name+'(\\s|$)'),' ').replace(/^\s+|\s+$/g, '');
   }
}

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);





