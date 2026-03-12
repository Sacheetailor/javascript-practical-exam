const myForm = document.querySelector("#myForm");
const inputs = document.querySelectorAll("#myForm #form-input");
const myTable = document.querySelector("#myTable tbody");

let editTask = JSON.parse(localStorage.getItem("EditTask")) || {};
let list = JSON.parse(localStorage.getItem("TaskList")) || [];
let data = {};

// input values store
inputs.forEach(function (input) {
    input.addEventListener("input", function (e) {
        let name = e.target.name;
        let value = e.target.value;
        data[name] = value;
    });
});

// form submit
if (myForm) {
    myForm.addEventListener("submit", function (e) {
        e.preventDefault();

        if (data.id) {
            list = list.map(function (item) {
                return item.id == data.id ? data : item;
            });
        } else {
            data.id = Date.now();
            list.push(data);
        }

        localStorage.setItem("TaskList", JSON.stringify(list));
        location.href = "../html/view-task.html";
        myForm.reset();
    });
}

// display tasks
function handleDisplay(list) {
    myTable.innerHTML = "";

    list.forEach(function (item, index) {
        let row = document.createElement("tr");

        row.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.title}</td>
        <td>${item.description}</td>
        <td>${item.duedate}</td>
        <td>${item.priority}</td>
        <td>
            <button class="btn btn-danger" onclick="handleDelete(${item.id})">Delete</button>
            <button class="btn btn-warning" onclick="handleEdit(${item.id})">Edit</button>
        </td>
        `;

        myTable.appendChild(row);
    });
}

if (myTable) {
    handleDisplay(list);
}

// delete task
function handleDelete(id) {
    list = list.filter(function (item) {
        return item.id != id;
    });

    localStorage.setItem("TaskList", JSON.stringify(list));
    handleDisplay(list);
}

// edit task
function handleEdit(id) {
    let data = list.find(function (item) {
        return item.id == id;
    });

    localStorage.setItem("EditTask", JSON.stringify(data));
    location.href = "../html/edit-task.html";
}

// display edit data
function displayTaskData() {
    inputs.forEach(function (input) {
        let name = input.name;
        input.value = editTask[name];
    });
}

if (editTask.id) {
    data = editTask;
    displayTaskData();
}