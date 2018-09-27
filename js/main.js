const tasksList = {
    uncompleted: [],
    completed: []
};

const inputField = document.getElementById('taskInput');
inputField.focus();

document.getElementById('taskInputForm').addEventListener('submit', addTask);

function addTask(e) {
    e.preventDefault();
    const taskContent = inputField.value;
    if (taskContent) {
        if (!tasksList.uncompleted.length) {
            createTodoList(taskContent);
        } else {
            const task = document.createElement('li');
            const buttons = document.createElement('span');
            const btnComplete = document.createElement('i');
            const btnRemove = document.createElement('i');

            task.className = 'list-group-item';
            task.textContent = taskContent;
            buttons.className = 'icons';
            btnComplete.className = 'far fa-check-circle';
            btnRemove.className = 'fas fa-trash-alt';

            buttons.appendChild(btnComplete);
            buttons.appendChild(btnRemove);
            task.appendChild(buttons);
            document.querySelector('.bg-danger ul.list-group').appendChild(task);
        }
        tasksList.uncompleted.push(taskContent);
    }
    inputField.value = '';
    inputField.focus();
}

function createTodoList(value) {
    const output = `<div class="card bg-danger mt-5">
                        <h5 class="card-header text-center text-white font-weight-bold py-3">
                             Uncompleted (tasks to be done)
                        </h5>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">${value}
                                <span class="icons">
                                    <i class="far fa-check-circle"></i><i class="fas fa-trash-alt"></i>
                                </span>
                            </li>
                        </ul>
                    </div>`;
    document.querySelector('div.col-lg-9.mx-auto').innerHTML = output;
}