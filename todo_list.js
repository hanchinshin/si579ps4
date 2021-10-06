
//selectors
const todoList = document.getElementById("task_list");
const addButton = document.getElementById("add_task");
const todoInput = document.querySelector(".input-group");
const descriptionInput = document.getElementById("task_description_input");
const dd = document.getElementById("duedate_input");
const dt = document.getElementById("duetime_input");

//functions
function addTask(description, dueTime=""){
    const newTodoElement = document.createElement('li');
    newTodoElement.textContent = description;

    // console.log(newTodoElement);
    // if duetime true
    if (dueTime) {
        const dueTimeElement = document.createElement('span');
        dueTimeElement.classList.add("due");
        const date = new Date(dueTime);
        // console.log(date);
        dueTimeElement.innerHTML = "due " + date.toLocaleDateString() + " " + date.toLocaleTimeString();
        console.log(dueTimeElement);
        newTodoElement.appendChild(dueTimeElement);
    }

    // done button setting
    const doneButton = document.createElement("button");
    doneButton.textContent = "Done";
    doneButton.setAttribute('type', "button");
    doneButton.classList.add("btn", "btn-sm", "btn-outline-danger", "done");
    doneButton.addEventListener('click', () => {
        doneButton.parentNode.remove();
    });
    newTodoElement.appendChild(doneButton);
    todoList.appendChild(newTodoElement);
}


//Part 3: Making the "Add Task" button work
function dateAndTimeToTimestamp(dateInputElement, timeInputElement) {
    const dueDate = dateInputElement.valueAsNumber; // Returns the timestamp at midnight for the given date
    const dueTime = timeInputElement.valueAsNumber; // Returns the number of milliseconds from midnight to the time

    if(dueDate && dueTime) { // The user specified both a due date & due time
        //Add the timezone offset to account for the fact that timestamps are specified by UTC
        const timezoneOffset =  (new Date()).getTimezoneOffset() * 60 * 1000;
        return dueDate + dueTime + timezoneOffset;
    } else {
        // if the user did not specify both a due date and due time, return false
        return false;
    }
}


//addTask listener
addButton.addEventListener('click', () => {
    const description = descriptionInput.value;
    const dueTime = dateAndTimeToTimestamp(dd, dt);
    //description
    addTask(description, dueTime);
    //reset input
    document.getElementById("task_description_input").value = "";
});

// enter key listener
descriptionInput.addEventListener('keypress', function(e) {
    if (e.key === "Enter") {
        addButton.click();
    }
});

