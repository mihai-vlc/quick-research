/**
* Options menu for quick research
* @author Mihai Ionut Vilcu (ionutvmi@gmail.com)
* Sep 2013
*/

// adding contains function to array prototype
Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}
// event listener fot
NodeList.prototype.addEventListener = function( type, fn ) {
  for (var i = 0; i < this.length; i++) {
    this[i].addEventListener(type, fn);
  };
};


// Saves options to localStorage.
function save_options() {
  
  var select = document.getElementById("open");
  var open = select.children[select.selectedIndex].value;
  localStorage["open"] = open;

  var select = document.getElementsByClassName("tabs");
  console.log(select);
  var tabs = [];
  for (var i = 0; i < select.length; i++) {
    if(select[i].checked)
      tabs.push(i);
  }

  localStorage["tabs"] = JSON.stringify(tabs);

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
  var select = document.getElementById("open");
  for (var i = 0; i < select.children.length; i++) {
    var child = select.children[i];
    if (child.value == favorite) {
      child.selected = "true";
      break;
    }
  }
  var tabs = JSON.parse(localStorage["tabs"]);
  var select = document.getElementsByClassName("tabs");
  for (var i = 0; i < select.length; i++) {
    if (tabs.contains(i))
      select[i].checked = "true";
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


function validate_checkboxes(e) {
    var checked = false;
    select = document.getElementsByClassName("tabs");
    for (var i = 0; i < select.length; i++)
      if(select[i].checked)
        checked = true;
    if(!checked){
      e.preventDefault();
      alert("At least one tab must be active !");
    }

}


document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
document.querySelectorAll('.tabs').addEventListener('click', validate_checkboxes);



//console.log(document.querySelectorAll('.tabs'));



