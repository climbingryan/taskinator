var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");
var taskInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var tasks = [];

var taskStatusChangeHandler = function(event) {
        // get the task item's id
    var taskId = event.target.getAttribute("data-task-id");

    // get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    // find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");    

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
      } 
      else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
      } 
      else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
      }


    };

var completeEditTask = function(taskName, taskType, taskId) {
    //find the matchcing task in list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']")

    //set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = tasksType;
        }
    };

    alert("Task Updated");

    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
}

var taskFormHandler = function (event) {

    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    var isEdit = formEl.hasAttribute("data-task-id");

        // has data attribute, so get task id and call function to complete edit process
    if(isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
        // no data attribute, so create object as normal and pass to createTaskEl function 
    else {
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to-do"
        };

        createTaskEl(taskDataObj);
    }

        // package up data as an object
    

        // check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form");
        return false;
    }

    formEl.reset();
}

var createTaskEl = function(taskDataObj) {
    console.log(taskDataObj);
console.log(taskDataObj.status);
    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

        // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    listItemEl.setAttribute("draggable", "true");

        // create div to hold task info and add list item
    var taskInfoEl = document.createElement("div");
        //give it a class name
    taskInfoEl.className = "task-info";
        // add html content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);
    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    tasksToDoEl.appendChild(listItemEl);

        // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

        //increase task counter for next unique id
    taskIdCounter++;
}

var createTaskActions = function(taskId) {
        // create a div
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

        // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

        // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    
    actionContainerEl.appendChild(deleteButtonEl);
    
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);

    var statusChoices = ["To Do", "In Progress", "Completed"];
    for (var i = 0; i < statusChoices.length; i++) {
            //create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

            //apppend to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;
};

        // calls createTaskHandler when clicked
formEl.addEventListener("submit", taskFormHandler);

var taskButtonHandler = function(event) {
        // get traget from event
    var targetEl = event.target;

    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    } else if (event.target.matches(".delete-btn")) {
        console.log('you clicked a delete button!');
            // get the element's task id 
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
}

var editTask = function(taskId) {
    //get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']")

    //get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    document.querySelector("input[name='task-name']").value = taskName;

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    document.querySelector("select[name='task-type']").value = taskType;

    document.querySelector("#save-task").textContent = "Save Task";
    
    formEl.setAttribute("data-task-id", taskId);
}

var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    console.log(taskSelected);
    console.log(taskId);
    taskSelected.remove();

    var updatedArr = [];

    for (var i = 0; i < tasks.length; i++ ) {
        if (tasks[1].if !== parseInt(tasksId)) {
            updatedArr.push(tasks[i]);
        }
    } 
    tasks = updatedTaskArr;
}

var dragTaskHandeler = function(event) {
    // retrieves task id
    var taskId = event.target.getAttribute("data-task-id");
    // store taskId in dataTransfer
    event.dataTransfer.setData("text/plain", taskId);
    //verify it was stored in DataTransfer
    var getId = event.dataTransfer.getData("text/plain");
    console.log("getId:", getId, typeof getId);

    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(id)) {
            tasks[1].status = statusSelectEl.value.toLowerCase();
        }
    } 
}

var dropZoneDragHandler = function(event) {
    var taskListEl = event.target.closest(".task-list");
    if (taskListEl) {
        event.preventDefault();
        taskListEl.setAttribute("style", "background: rgba(68, 233, 255, 0.7); border-style: dashed;");

    }
}; 

var dropTaskHandler = function(event) {
    var id = event.dataTransfer.getData("text/plain");
    var draggableElement = document.querySelector("[data-task-id='" + id + "']");
    var dropZoneEl = event.target.closest(".task-list");
    var statusType = dropZoneEl.id;
    var statusSelectEl = draggableElement.querySelector("select[name='status-change']");
    if (statusType === "tasks-to-do") {
        statusSelectEl.selectedIndex = 0;
    } else if (statusSelectEl === "tasks-in-progress") {
        statusSelectEl.selectedIndex = 1;
    } else if (statusSelectEl === "tasks-completed") {
        statusSelectEl.selectedIndex = 2;
    }
    dropZoneEl.removeAttribute("style");
    dropZoneEl.appendChild(draggableElement);
}

var dragLeaveHandler = function(event) {
    var taskListEl = event.target.closest(".task-list")
    if (taskListEl) {
        taskListEl.removeAttribute("style");
    }
}

pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);
pageContentEl.addEventListener("dragstart", dragTaskHandeler);
pageContentEl.addEventListener("dragover", dropZoneDragHandler);
pageContentEl.addEventListener("drop", dropTaskHandler);
pageContentEl.addEventListener("dragleave", dragLeaveHandler);