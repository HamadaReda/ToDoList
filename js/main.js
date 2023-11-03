let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let taskDiv = document.querySelector(".tasks");

// localStorage.clear();
// Empty Array To Store Tasks
let arrayOfTasks = [];

// Trigger Get Data From Local Storage
getDataFromLocalStorage();

// Add Task
submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value); // Add Task To Array Of Tasks
    input.value = ""; // Empty Input Field
  }
};

// Click On Task Element
document.addEventListener("click", (e) => {
  // Delete Button
  if (e.target.classList.contains("del")) {
    // Remove Element From Page
    e.target.parentElement.remove();
    // Remove Task From Local Storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
  }
  // Toggle Completed For The Task
  if (e.target.className === "check") {
    toggleStatusTaskWith(e.target.parentElement.getAttribute("data-id"));
    // Toggle Done Class
    e.target.parentElement.classList.toggle("done");
  }
});

function addTaskToArray(taskText) {
  // Task Data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  // Push Task To Array Of Tasks
  arrayOfTasks.push(task);
  // Add Tasks To Page
  addElementsToPageFrom(arrayOfTasks);
  // Add Tasks To Local Storage
  addTasksToLocalStorage(arrayOfTasks);
  // For Testing
  // console.log(arrayOfTasks);
  // console.log(JSON.stringify(arrayOfTasks));
}

function addElementsToPageFrom(arrayOfTasks) {
  // Empty Tasks Div
  taskDiv.innerHTML = "";
  // Looping On Array Of Tasks
  arrayOfTasks.forEach(function (task) {
    // Create Main Div
    let div = document.createElement("div");
    div.className = "task";
    // Check If Task Is Done
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    // Create Checkbox Button
    let check = document.createElement("input");
    check.type = "checkbox";
    check.className = "check";
    check.setAttribute("check-id", task.id);
    div.appendChild(check);
    // Create Checkmark
    let checkmark = document.createElement("span");
    checkmark.className = "checkmark";
    div.appendChild(checkmark);
    // Append Text To Div
    div.appendChild(document.createTextNode(task.title));
    // Create Delete Button
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    // Append Button To Main Div
    div.appendChild(span);
    // Add Task To Tasks Container
    taskDiv.appendChild(div);
  });
  addCheckmark();
}

function addTasksToLocalStorage(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    arrayOfTasks = JSON.parse(data);
  }
  addElementsToPageFrom(arrayOfTasks);
  addCheckmark();
}

function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter(function (task) {
    return task.id != taskId;
  });
  addTasksToLocalStorage(arrayOfTasks);
}

function addCheckmark() {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].completed) {
      let checks = document.querySelectorAll(".check");
      checks[i].setAttribute("checked", "true");
    }
  }
}
function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed
        ? (arrayOfTasks[i].completed = false)
        : (arrayOfTasks[i].completed = true);
    }
  }
  addTasksToLocalStorage(arrayOfTasks);
}
