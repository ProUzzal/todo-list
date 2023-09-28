//load task from local storage
//add task 
//complete task operation
//delete task

let inputedTask = document.querySelector('input[type="text"]');
let form = document.querySelector('form');
let addBtn = document.querySelector('input[type="submit"]');
let taskListUL = document.querySelector('.task-list>ul');
// let li = document.querySelector('.task-list>ul li.checked')



//clear all items
document.querySelector('.clear-btn').addEventListener('click', () => {
    localStorage.clear();
    taskListUL.innerHTML = '';
})

//delete single items
const deleteSingleItem = function (deleteBtnImg, obj, id) {
    const taskArr = getTaskArr();
    console.log(taskArr);

    deleteBtnImg.addEventListener('click', (e) => {
        const newArr = taskArr.filter((item) => item.id !== obj.id);
        taskSave(newArr);
        taskDisplay();

    }, false)


}


//toogleTask
const controlTask = function () {
    const li = document.querySelector('.task-list>ul li');
    const images = document.querySelectorAll('.uncheck');
    // console.log(images);
    images.forEach((image) => {
        image.addEventListener('click', (e) => {
            const targetedElement = e.target;
            if (targetedElement.classList.contains('uncheck')) {
                targetedElement.classList.remove('uncheck');
                targetedElement.classList.add('check');
                targetedElement.src = 'assets/check-circle.png'

                targetedElement.nextSibling.style.textDecoration = 'line-through';
            }
            else {
                targetedElement.classList.remove('check');
                targetedElement.classList.add('uncheck');
                targetedElement.nextSibling.style.textDecoration = 'none';
                targetedElement.src = 'assets/unchecked.png'
            }

        })
    })


}




// Function to display okay here.
const taskDisplay = function () {
    taskListUL.innerHTML = '';
    const allTaskObj = getTaskArr();
    allTaskObj.forEach((taskObj) => {
        const li = document.createElement('li');
        const checkImg = document.createElement('img');
        const span = document.createElement('span');
        span.innerHTML = taskObj.taskText;
        const deleteImg = document.createElement('img');
        if (taskObj.status === 'checked') {
            checkImg.className = 'check';
            checkImg.src = 'assets/check-circle.png';
            span.style.textDecoration = 'line-through';
        }
        else {
            checkImg.className = 'uncheck';
            checkImg.src = 'assets/unchecked.png';
        }
        // span.innerHTML = taskObj.text;
        deleteImg.src = "assets/delete-outline.png";
        deleteImg.alt = '';
        deleteImg.style.cursor = 'pointer';

        li.appendChild(checkImg);
        li.appendChild(span);
        li.appendChild(deleteImg);
        taskListUL.appendChild(li);
        console.log(taskObj.id);
        deleteSingleItem(deleteImg, taskObj, taskObj.id);

        // Set up event listener to toggle task status when clicked
        checkImg.addEventListener('click', () => {
            taskObj.status = (taskObj.status === 'checked') ? 'unchecked' : 'checked';
            taskSave(allTaskObj); // Save updated task status to local storage
            taskDisplay(); // Refresh the displayed task list

        })
    })
    controlTask()

}



const createNewTaskObj = function (task, id) {
    return { taskText: task, status: 'unchecked', id: id }
}

//Task storing in local Storage-3
const taskSave = function (arrOfTaskObj) {
    // console.log(arrOfTask);
    localStorage.setItem('allTasks', JSON.stringify(arrOfTaskObj));
}
// Function to retrieve tasks from local storage-2
const getTaskArr = function () {
    // console.log(localStorage.getItem('allTasks'));
    return JSON.parse(localStorage.getItem('allTasks')) || [];
}




// handle task submission form-1
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const inputedTaskText = inputedTask.value.trim();

    if (inputedTaskText === '') {
        alert('You have to enter a task');
        return;
    }
    //Here we will get back an empty array or filled array from getTaskArray
    const tasksArr = getTaskArr();
    const taskObj = createNewTaskObj(inputedTaskText, new Date().getTime());
    tasksArr.push(taskObj);
    console.log(taskObj);
    taskSave(tasksArr);
    inputedTask.value = '';
    taskDisplay();

});



window.onload = taskDisplay;