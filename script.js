//load task from local storage
//add task 
//complete task operation
//delete task

let inputedTask = document.querySelector('input[type="text"]');
let form = document.querySelector('form');
let addBtn = document.querySelector('input[type="submit"]');
let taskListUL = document.querySelector('.task-list>ul')




//toogleCheckOrUncheck

const taskStatusCheck = function () {

    taskListUL.addEventListener('click', function (e) {
        console.log(e.target.classList.toggle('checked'));
        let target = e.target;

        if (target.classList.contains('checked')) {
            target.classList.toggle('');

        }


    },{})
}



// Function to display tasks on the page
const taskDisplay = function () {
    // taskListUL.innerHTML = '';
    const allTask = getTaskArr();
    // console.log(tasks);
    allTask.forEach((t, i) => {
        const li = document.createElement('li');
        li.innerHTML = t;
        taskListUL.appendChild(li);

        taskStatusCheck();

    },)
}

// Initial display of tasks
// displayTasks();

//Task storing in local Storage-3
const taskSave = function (arrOfTask) {
    localStorage.setItem('allTasks', JSON.stringify(arrOfTask));
}
// Function to retrieve tasks from local storage-2
const getTaskArr = function () {
    console.log(localStorage.getItem('allTasks'));
    return JSON.parse(localStorage.getItem('allTasks')) || [];
}

// handle task submission form-1
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = inputedTask.value.trim();

    if (taskText === '') {
        alert('You have to enter a task');
        return;
    }

    //Here we will get back an empty array or filled array from getTaskArray
    const tasksArr = getTaskArr();
    tasksArr.push(taskText);
    taskSave(tasksArr);
    inputedTask.value = '';
    taskDisplay();
});



