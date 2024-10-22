/*Start of stage 3.

const addTaskButton = document.getElementById('add-task-button');
const taskInput = document.getElementById('input-task');
const taskList = document.getElementById('task-list');

// Function to remove task when delete button is clicked
function removeTask(event) {
    const taskItem = event.target.closest('li');
    taskList.removeChild(taskItem);
}

// Function to toggle task completion status
function toggleTaskCompletion(event) {
    const checkbox = event.target;
    const taskSpan = checkbox.nextElementSibling; // Get the <span> next to the checkbox

    if (checkbox.checked) {
        taskSpan.classList.add('completed'); // Add the completed class to apply line-through
    } else {
        taskSpan.classList.remove('completed'); // Remove the completed class
    }
}

// Add event listener for the Add Task button
addTaskButton.addEventListener('click', function () {
    const taskName = taskInput.value.trim(); // Get task name and trim white spaces

    // Check if task name is not empty
    if (taskName === '') {
        alert('Task name cannot be empty!');
        return;
    }

    // Create a new task (li element)
    const newTask = document.createElement('li');

    // Create the checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task';

    // Add event listener to the checkbox for marking task complete
    checkbox.addEventListener('change', toggleTaskCompletion);

    // Create the span to hold the task name
    const taskSpan = document.createElement('span');
    taskSpan.className = 'task';
    taskSpan.textContent = taskName;

    // Create the delete button
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-btn';
    deleteButton.textContent = 'Delete';

    // Add event listener to delete button to remove the task
    deleteButton.addEventListener('click', removeTask);

    // Append checkbox, task name, and delete button to the new task
    newTask.appendChild(checkbox);
    newTask.appendChild(taskSpan);
    newTask.appendChild(deleteButton);

    // Add the new task to the task list
    taskList.appendChild(newTask);

    // Clear the input field
    taskInput.value = '';
});

// Add delete and checkbox toggle functionality to hardcoded tasks
const deleteButtons = document.querySelectorAll('.delete-btn');
deleteButtons.forEach(button => {
    button.addEventListener('click', removeTask);
});

const taskCheckboxes = document.querySelectorAll('#task-list');
taskCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', toggleTaskCompletion);
});

End of stage 3.
 */

const addTaskButton = document.getElementById('add-task-button');
const taskInput = document.getElementById('input-task');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {
        addTaskToDOM(task.name, task.completed);
    });
}

// Function to save tasks to localStorage
function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(taskItem => {
        const taskName = taskItem.querySelector('span.task').textContent;
        const completed = taskItem.querySelector('input[type="checkbox"]').checked;
        tasks.push({name: taskName, completed: completed});
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to remove task from the list
function removeTask(event) {
    const taskItem = event.target.closest('li');
    taskList.removeChild(taskItem);
    saveTasksToLocalStorage(); // Save to localStorage after removing a task
}

// Function to toggle task completion status
function toggleTaskCompletion(event) {
    const checkbox = event.target;
    const taskSpan = checkbox.nextElementSibling; // Get the <span> next to the checkbox

    if (checkbox.checked) {
        taskSpan.classList.add('completed'); // Add the completed class to apply line-through
    } else {
        taskSpan.classList.remove('completed'); // Remove the completed class
    }

    saveTasksToLocalStorage(); // Save to localStorage after toggling task completion
}

// Add event listener for the Add Task button
addTaskButton.addEventListener('click', function () {
    const taskName = taskInput.value.trim(); // Get task name and trim white spaces

    // Check if task name is not empty
    if (taskName === '') {
        alert('Task name cannot be empty!');
        return;
    }

    // Add task to the DOM and save to local storage
    addTaskToDOM(taskName, false);
    saveTasksToLocalStorage();

    // Clear the input field
    taskInput.value = '';
});

// Function to add a task to the DOM
function addTaskToDOM(taskName, isCompleted) {
    // Create a new task (li element)
    const newTask = document.createElement('li');
    newTask.className = 'task'; // Add the 'task' class to the new li element

    // Create the checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isCompleted; // Set the checkbox status

    // Add event listener to the checkbox for marking task complete
    checkbox.addEventListener('change', toggleTaskCompletion);

    // Create the span to hold the task name
    const taskSpan = document.createElement('span');
    taskSpan.className = 'task'; // Add 'task' class to the span
    taskSpan.textContent = taskName;

    if (isCompleted) {
        taskSpan.classList.add('completed'); // Add the completed class if task is already completed
    }

    // Create the delete button
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-btn';
    deleteButton.textContent = 'Delete';

    // Add event listener to delete button to remove the task
    deleteButton.addEventListener('click', removeTask);

    // Append checkbox, task name, and delete button to the new task
    newTask.appendChild(checkbox);
    newTask.appendChild(taskSpan); // This span holds the task name and has the 'task' class
    newTask.appendChild(deleteButton);

    // Add the new task to the task list
    taskList.appendChild(newTask);
}