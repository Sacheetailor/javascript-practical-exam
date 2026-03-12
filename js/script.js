let tasks = [];

// Load tasks from localStorage
function loadTasks() {
  let data = localStorage.getItem("tasks");

  if (data) {
    tasks = JSON.parse(data);
  } else {
    tasks = [];
  }
}

// Save tasks
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add Task
function addTask(title, desc, dueDate, priority) {

  loadTasks();

  let task = {
    id: Date.now(),
    title: title,
    desc: desc,
    dueDate: dueDate,
    priority: priority
  };

  tasks.push(task);

  saveTasks();

  alert("Task Added");

  window.location.href = "view-task.html";
}

// Show Tasks in Table
function displayTasks() {

  loadTasks();

  let table = document.querySelector("#myTable tbody");

  if (!table) return;

  table.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {

    table.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${tasks[i].title}</td>
        <td>${tasks[i].desc}</td>
        <td>${tasks[i].dueDate}</td>
        <td>${tasks[i].priority}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="deleteTask(${tasks[i].id})">
            Delete
          </button>
        </td>
      </tr>
    `;
  }
}

// Delete Task
function deleteTask(id) {

  loadTasks();

  let newTasks = [];

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id != id) {
      newTasks.push(tasks[i]);
    }
  }

  tasks = newTasks;

  saveTasks();

  displayTasks();
}

// Form Submit
let form = document.querySelector("#myForm");

if (form) {

  form.addEventListener("submit", function (e) {

    e.preventDefault();

    let title = form.title.value;
    let desc = form.description.value;
    let dueDate = form.duedate.value;
    let priority = form.priority.value;

    addTask(title, desc, dueDate, priority);
  });

}

// Page Load
displayTasks();