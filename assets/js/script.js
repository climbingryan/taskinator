var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function () {
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new Task";
    tasksToDoEl.appendChild(listItemEl);
}
    // calls createTaskHandler when clicked
buttonEl.addEventListener("click", createTaskHandler);

