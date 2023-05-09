function addTask () {
    var input = document.getElementById("input");
    // get current text from input field
    var newTask = input.value;
    // only add new item to list if some text was entered
    if (newTask != "") {
      // create new HTML list item
      var item = document.createElement("li");
      // add HTML for buttons and new task text
      // Note, need to use '' because of "" in HTML
      item.innerHTML = '<input type="button" class="done" onclick="markDone(this.parentNode)" value="&#x2713;" /> ' + 
      '<input type="button" class="remove" onclick="remove(this.parentNode)" value="&#x2715;" /> ' +
      '<input type="button" class="important" onclick="important(this.parentNode)" value="&#x01C3;" />' +
      newTask;
      // add new item as part of existing list
      document.getElementById("tasks").appendChild(item);  
      input.value = "";
      input.placeholder = "enter next task …";
    }
  }
  
// change styling used for given item
function markDone (item) { 
      item.className = 'finished';
}

// remove item completely from document
function remove (item) {
    if(item.className == 'finished')
         item.remove();
}

// highlight item from document
function important (item) {
    item.className = "important"
}

// show about and change color 
function doAbout() {
    var div = document.getElementById("divabout");
    div.innerHTML = "Author is danielvillam"; 
    div.className = 'aboutcolor';
}

// clear about
function clearAbout() {
    var div = document.getElementById("divabout");
    div.innerHTML = "";   
}