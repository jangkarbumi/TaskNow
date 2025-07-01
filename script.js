const taskContainer = document.querySelector('.task-container');
const addButton = document.querySelector('.add-button');
const taskInput = document.querySelector('.task-input');
const deadlineinput = document.querySelector('.date-input');
const key = "TASK_APP"

function saveData() {
    const items = [];
    const taskBoxes = document.querySelectorAll('.task-box');

    taskBoxes.forEach(box => {
        const task = box.querySelector('.task').textContent;
        const deadline = box.querySelector('.deadline').textContent;

        items.push({task, deadline});
    })

    localStorage.setItem(key, JSON.stringify(items));
}

function loadData() {
    const taskData = JSON.parse(localStorage.getItem(key)) || [];
    taskData.forEach(item => {
        const taskList = document.createElement('div');
        taskList.classList.add('task-box');

        const taskDeadline = document.createElement('p');
        taskDeadline.classList.add('deadline');
        taskDeadline.textContent = item.deadline;
        taskList.appendChild(taskDeadline);

        const taskContent = document.createElement('p');
        taskContent.classList.add('task');
        taskContent.textContent = item.task;
        taskList.appendChild(taskContent);

        const taskMark = document.createElement('p');
        taskMark.classList.add('mark');
        taskMark.textContent = "Double click to delete your task!";
        taskList.appendChild(taskMark);

        //DELETE TASK
        taskList.addEventListener('dblclick', deleteTask);

        taskContainer.appendChild(taskList);
    })
}

function addTask() {
    if(taskInput.value !== "" ) {
        const taskList = document.createElement('div');
        taskList.classList.add('task-box');

        const taskDeadline = document.createElement('p');
        taskDeadline.classList.add('deadline');
        taskDeadline.textContent = deadlineinput.value;
        taskList.appendChild(taskDeadline);

        const taskContent = document.createElement('p');
        taskContent.classList.add('task');
        taskContent.textContent = taskInput.value;
        taskList.appendChild(taskContent);

        const taskMark = document.createElement('p');
        taskMark.classList.add('mark');
        taskMark.textContent = "Double click to delete your task!";
        taskList.appendChild(taskMark);

        //DELETE TASK
        taskList.addEventListener('dblclick', deleteTask);

        taskContainer.appendChild(taskList);
        taskInput.value = "";
        deadlineinput.value = "";

        saveData();
    }
}

function deleteTask(task) {
    const taskBox = task.currentTarget;
    taskBox.remove();
    saveData();
}

loadData();
addButton.addEventListener('click', addTask);