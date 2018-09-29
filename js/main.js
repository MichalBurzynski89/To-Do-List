const inputField = document.getElementById('taskInput');
inputField.focus();

const uncompletedList = document.querySelector('.bg-danger');
const completedList = document.querySelector('.bg-success');

const tasksList = {
    uncompleted: [],
    completed: []
};

document.getElementById('taskInputForm').addEventListener('submit', addTask);

function addTask(e) {
    e.preventDefault();
    const taskContent = inputField.value;
    if (taskContent) {
        if (!tasksList.uncompleted.length) {
            uncompletedList.classList.remove('d-none');
        }
        addTaskToProperList(taskContent);
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
    // btnRemove.addEventListener('click', removeTask);

    buttons.appendChild(btnComplete);
    buttons.appendChild(btnRemove);
    listItem.appendChild(buttons);
    list.appendChild(listItem);

    if (task === inputField.value) {
        tasksList.uncompleted.push(task);
        console.log(tasksList);
    } else {
        if (!tasksList.completed.length) completedList.classList.remove('d-none');
        tasksList.uncompleted.splice(tasksList.uncompleted.indexOf(task), 1);
        tasksList.completed.push(task);
        console.log(tasksList);
    }
}

function addToCompleted() {
    const task = this.parentNode.parentNode;
    if (task.parentNode.parentNode === uncompletedList) {
        addTaskToProperList(task.textContent, true);
        uncompletedList.childNodes[3].removeChild(task);
        if (!tasksList.uncompleted.length) uncompletedList.classList.add('d-none');
    }
}