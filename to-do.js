// JavaScript code goes here
const tasks = [];

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskDescription = taskInput.value.trim();
    if (taskDescription === "") return;

    tasks.push({ description: taskDescription, completed: false });
    taskInput.value = "";
    displayTasks();
}
if (taskDueDate) {
    const notificationTime = new Date(taskDueDate).getTime();
    const currentTime = new Date().getTime();
    const timeUntilDue = notificationTime - currentTime;

    if (timeUntilDue > 0) {
        setTimeout(() => {
            alert(`Task "${taskDescription}" is due now!`);
        }, timeUntilDue);
    }
}

function displayTasks(taskArray) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    if (!taskArray) taskArray = tasks;

    taskArray.forEach((task, index) => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");

        // Add a class based on the priority
        taskElement.classList.add(task.priority + "-priority");

        // Rest of the code remains the same
    });
}
// Save tasks to localStorage
localStorage.setItem("tasks", JSON.stringify(tasks));

// Retrieve tasks from localStorage
const savedTasks = JSON.parse(localStorage.getItem("tasks"));
if (savedTasks) {
    tasks = savedTasks;
    displayTasks();
}
function deleteTask(index) {
    const confirmation = confirm("Are you sure you want to delete this task?");
    if (confirmation) {
        tasks.splice(index, 1);
        displayTasks();
    }
}



function showAllTasks() {
    displayTasks(tasks);
}

function showCompletedTasks() {
    const completedTasks = tasks.filter(task => task.completed);
    displayTasks(completedTasks);
}

function showPendingTasks() {
    const pendingTasks = tasks.filter(task => !task.completed);
    displayTasks(pendingTasks);
}

function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

function displayTasks(taskArray) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    if (!taskArray) taskArray = tasks;

    taskArray.forEach((task, index) => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        if (task.completed) {
            taskElement.classList.add("completed");
        }

        const taskText = document.createElement("span");
        taskText.textContent = task.description;

        const completeButton = document.createElement("button");
        completeButton.textContent = "Complete";
        completeButton.onclick = () => toggleTaskCompletion(index);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteTask(index);

        taskElement.appendChild(taskText);
        taskElement.appendChild(completeButton);
        taskElement.appendChild(deleteButton);

        taskList.appendChild(taskElement);
    });
}

// Initial display of tasks
displayTasks();
// Task class with Memento pattern
class Task {
    constructor(description) {
        this.description = description;
        this.completed = false;
    }

    // Create a memento (snapshot) of the task's state
    createMemento() {
        return { ...this };
    }

    // Restore the task's state from a memento
    restoreMemento(memento) {
        Object.assign(this, memento);
        //display with due date
        const taskText = document.createElement("span");
        taskText.textContent = `${task.description}, Due: ${task.dueDate}`;
        taskElement.appendChild(taskText);
    }
}

// Task manager with undo and redo functionality
class TaskManager {
    constructor() {
        this.tasks = [];
        this.undoStack = [];
        this.redoStack = [];
    }

    addTask(description) {
        const task = new Task(description);
        this.tasks.push(task);

        // Save the task state to the undo stack
        this.undoStack.push(task.createMemento());

        // Clear the redo stack since a new action was taken
        this.redoStack = [];
    }

    deleteTask(index) {
        if (index >= 0 && index < this.tasks.length) {
            const deletedTask = this.tasks.splice(index, 1)[0];

            // Save the task state to the undo stack
            this.undoStack.push(deletedTask.createMemento());

            // Clear the redo stack since a new action was taken
            this.redoStack = [];
        }
    }

    undo() {
        if (this.undoStack.length > 0) {
            const taskMemento = this.undoStack.pop();
            const task = this.tasks.find(t => t.description === taskMemento.description);
            
            if (task) {
                // Save the current task state to the redo stack
                this.redoStack.push(task.createMemento());

                // Restore the task's state from the memento
                task.restoreMemento(taskMemento);
            }
        }
    }

    redo() {
        if (this.redoStack.length > 0) {
            const taskMemento = this.redoStack.pop();
            const task = this.tasks.find(t => t.description === taskMemento.description);

            if (task) {
                // Save the current task state to the undo stack
                this.undoStack.push(task.createMemento());

                // Restore the task's state from the memento
                task.restoreMemento(taskMemento);
            }
        }
    }
}

// Example usage:
const taskManager = new TaskManager();
taskManager.addTask("Buy groceries");
taskManager.addTask("Walk the dog");
console.log(taskManager.tasks); // Original tasks

taskManager.deleteTask(1); // Delete "Walk the dog"
console.log(taskManager.tasks); // Tasks after deletion

taskManager.undo(); // Undo the deletion
console.log(taskManager.tasks); // Tasks after undo

taskManager.redo(); // Redo the deletion
console.log(taskManager.tasks); // Tasks after redo

