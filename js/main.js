const inputField = document.getElementById('taskInput');
inputField.focus();

const uncompletedList = document.querySelector('.bg-danger');
const completedList = document.querySelector('.bg-success');

const tasksList = localStorage.getItem('To-Do List') ? JSON.parse(localStorage.getItem('To-Do List')) : {
    uncompleted: [],
    completed: []
};

showTasksAddedEarlier();

document.getElementById('taskInputForm').addEventListener('submit', addTask);

function addTask(e) {

    e.preventDefault();
    const taskContent = inputField.value;
    if (taskContent) {
        if (!tasksList.uncompleted.length) {
            uncompletedList.classList.remove('d-none');
        }
        addTaskToProperList(taskContent);
        tasksList.uncompleted.push(taskContent);
        localStorage.setItem('To-Do List', JSON.stringify(tasksList));
        inputField.value = '';
    }
    inputField.focus();
}

function addTaskToProperList(task, completed) {

    const list = completed ? completedList.childNodes[3] : uncompletedList.childNodes[3];
    const listItem = document.createElement('li');
    const buttons = document.createElement('span');
    const btnComplete = document.createElement('i');
    const btnRemove = document.createElement('i');

    listItem.className = 'list-group-item';
    listItem.textContent = task;
    buttons.className = 'icons';
    btnComplete.className = completed ? 'fas fa-check-circle' : 'far fa-check-circle';
    btnRemove.className = 'fas fa-trash-alt';

    btnComplete.addEventListener('click', addToCompleted);
    btnRemove.addEventListener('click', removeTask);

    buttons.appendChild(btnComplete);
    buttons.appendChild(btnRemove);
    listItem.appendChild(buttons);
    list.appendChild(listItem);
}

function addToCompleted() {

    const task = this.parentNode.parentNode;
    if (task.parentNode.parentNode === uncompletedList) {
        tasksList.uncompleted.splice(tasksList.uncompleted.indexOf(task.textContent), 1);
        uncompletedList.childNodes[3].removeChild(task);
        if (!tasksList.uncompleted.length) uncompletedList.classList.add('d-none');
        if (!tasksList.completed.length) completedList.classList.remove('d-none');
        addTaskToProperList(task.textContent, true);
        tasksList.completed.push(task.textContent);
    } else {
        tasksList.completed.splice(tasksList.completed.indexOf(task.textContent), 1);
        completedList.childNodes[3].removeChild(task);
        if (!tasksList.completed.length) completedList.classList.add('d-none');
        if (!tasksList.uncompleted.length) uncompletedList.classList.remove('d-none');
        addTaskToProperList(task.textContent);
        tasksList.uncompleted.push(task.textContent);
    }
    localStorage.setItem('To-Do List', JSON.stringify(tasksList));
}

function removeTask() {

    const task = this.parentNode.parentNode;
    if (task.parentNode.parentNode === uncompletedList) {
        tasksList.uncompleted.splice(tasksList.uncompleted.indexOf(task.textContent), 1);
        uncompletedList.childNodes[3].removeChild(task);
        if (!tasksList.uncompleted.length) uncompletedList.classList.add('d-none');
    } else {
        tasksList.completed.splice(tasksList.completed.indexOf(task.textContent), 1);
        completedList.childNodes[3].removeChild(task);
        if (!tasksList.completed.length) completedList.classList.add('d-none');
    }
    localStorage.setItem('To-Do List', JSON.stringify(tasksList));
}

function showTasksAddedEarlier() {

    if (!tasksList.uncompleted.length && !tasksList.completed.length) return;

    if (tasksList.uncompleted.length) uncompletedList.classList.remove('d-none');
    if (tasksList.completed.length) completedList.classList.remove('d-none');

    tasksList.uncompleted.forEach(task => addTaskToProperList(task));
    tasksList.completed.forEach(task => addTaskToProperList(task, true));
}