console.log('javascript sourced');

$(readyNow);

function readyNow() {
    console.log('in readyNow, jQuery sourced');
    getTask();
    $('#task-button').on('click', addTask);
    $('body').on('click', '.complete-button', toggleComplete);
    $('body').on('click', '.delete-button', deleteTask);
}

const taskToPost = {};

/**
 * Makes an AJAX request of type GET to the server. If successful, logs the server's response, empties the element with id task-list, and calls function displayTask. If unsuccessful, alerts an error.
 */

function getTask() {
    console.log('in getTask');
    $.ajax({
        method: 'GET',
        url: '/tasks',
    }).then(function(response) {
        console.log('Response from server is:', response);
        $('#task-list').empty();
        displayTask(response);
    }).catch(function(error) {
        console.log('Error:', error);
        swal({
            text: 'There\'s an error!',
            icon: 'warning',
            button: true,
        });
    });
}

/**
 * Takes in the response, an array of task objects, sent by the server from the GET route. Uses a conditional to check whether the completed property of the task object is true or false. If true, converts the date object from the time_completed property of the task to an hh:mm am/pm format. Also appends the task-item to the task-list container with the description, time completed, complete button, delete button, and completed styling class. If false, appends the task-item to the task-list container with the description, complete button, delete button and default styling for an uncompleted task-item. The complete and delete buttons for completed and uncompleted tasks store the id of each task using the data method. 
 * 
 * @param {[array]} response 
 */

function displayTask(response) {
    console.log('in displayTask');
    for (let task of response) {
        if (task.completed === true) {
            const timeTaskCompleted= new Date(`${task.time_completed}`)
                                    .toLocaleString('en-US', { hour12: true, hour: 'numeric', minute: '2-digit'})
                                    .toLowerCase();
            $('#task-list').append(`
                <div class="task-item completed-task">
                    <div class="description-time">
                        <span class="task-to-complete fade-strike">${task.description}</span>
                        <span class="time-placeholder">${timeTaskCompleted}</span>
                    </div>
                    <div class="button-container">
                        <button class="complete-button" data-id="${task.id}">
                            <i class="fa-solid fa-circle-check"></i>
                        </button>
                        <button class="delete-button" data-id="${task.id}">
                            <i class="fa-solid fa-circle-minus"></i>
                        </button>
                    </div>
                </div>
            `);
        } else {
            $('#task-list').append(`
                <div class="task-item uncompleted-task">
                    <div class="description-time">
                        <span class="task-to-complete">${task.description}</span>
                    </div>
                    <div class="button-container">
                        <button class="complete-button" data-id="${task.id}">
                            <i class="fa-regular fa-circle"></i>
                        </button>
                        <button class="delete-button" data-id="${task.id}">
                            <i class="fa-solid fa-circle-minus"></i>
                        </button>
                    </div>
                </div>
            `);
        }
    }
}

/**
 * On the click of the button with id task-button, uses a conditional to check whether the value of the task-input field is undefined. If not undefined, the description property of the taskToPost object is assigned the value from the element with id task-input. The completed property of the task ojbect is assigned the value of false. A new date object is created. The year, month, date, hour, minutes and seconds at the time of click are stored in a variable timeTaskAdded. The time_added property of the task object is then assigned the value of timeTaskAdded.
 * 
 * @returns Returns false if the value of the task-input field is undefined and alerts the user to enter a task. 
 */

function addTask() {
    console.log('in addTask');
    if ($('#task-input').val() === '') {
        swal({
            text: "Please enter a task!",
            icon: "warning",
            button: true,
        });
        return false;
    } else {
        taskToPost.description = $('#task-input').val();
        taskToPost.completed = false;
        const now = new Date();
        let timeTaskAdded = String(now.getFullYear()) + '-' + 
                            String(now.getMonth()+1).padStart(2,0) + '-' + 
                            String(now.getDate()).padStart(2,0) + ' ' + 
                            String(now.getHours()).padStart(2,0) + ':' + 
                            String(now.getMinutes()).padStart(2, 0) + ':' + 
                            String(now.getSeconds()).padStart(2, 0);
        console.log('Time task added:', timeTaskAdded);
        taskToPost.time_added = timeTaskAdded;
        postTask();
    }
}

/**
 * Makes an AJAX request of type POST to the server with url: /tasks and data as object taskToPost. If successful, logs the server's response and empties the element with id task-input. If unsuccesful, alerts an error. 
 */

function postTask() {
    console.log('in postTask');
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: taskToPost,
    }).then(function(response) {
        console.log('Back from POST:', response);
        $('#task-input').val('');
        getTask();
    }).catch(function(error) {
        console.log('Error:', error);
        swal({
            text: 'There\'s an error!',
            icon: 'warning',
            button: true,
        });
    });
}

/**
 * On click of an element with a class of complete-button, uses the data method to retrieve the task object id stored in the element from when function displayTask ran. Assigns the value of the id to variable taskToUpdateId. Then uses a conditional to check if the grandparent of the element clicked on has a class of completed-task or uncompleted-task. 
 * 
 * If the grandparent element has a class of uncompleted-task, the completed property of the taskToPost object is assigned the value of true. A new date object is created. The year, month, date, hour, minutes, and seconds at the time of click are stored in a variable timeTaskCompleted. The time_added property of the task object is then assigned the value of timeTaskCompleted. Calls function updateTask.
 * 
 * If the grandparent element has a class of completed-task, the completed property of the taskToPost object is assigned the value of false. The time_completed property of the task object is assigned the value undefined through the creation of an undefined property empty_time. Calls function updateTask.
 */

function toggleComplete() {
    console.log('in toggleComplete');
    const taskToUpdateId = $(this).data('id');
    if ($(this).parent().parent().hasClass('uncompleted-task')) {
        taskToPost.completed = true;
        const now = new Date();
        let timeTaskCompleted = String(now.getFullYear()) + '-' + 
                                String(now.getMonth()+1).padStart(2,0) + '-' + 
                                String(now.getDate()).padStart(2,0) + ' ' + 
                                String(now.getHours()).padStart(2,0) + ':' + 
                                String(now.getMinutes()).padStart(2, 0) + ':' + 
                                String(now.getSeconds()).padStart(2, 0);
        taskToPost.time_completed = timeTaskCompleted;
        console.log('Time task completed:', timeTaskCompleted);
        updateTask(taskToUpdateId);
    } else if ($(this).parent().parent().hasClass('completed-task')) {
        taskToPost.completed = false;
        taskToPost.time_completed = taskToPost.empty_time; //workaround for DateTimeParseError, can't set time_completed directly to undefined or null
        console.log('Task marked incomplete.');
        updateTask(taskToUpdateId);
    }
}

/**
 * Takes in taskToUpdateId, a number that is the value of the id property of the task object stored in the element clicked on from function toggleComplete. Makes an AJAX request of type PUT to the server with url: /tasks/taskToUpdateId and data as object taskToPost. If successful, logs the server's response. Calls function getTask. The time_completed property of the task object is assigned the value undefined through the creation of an undefined property empty_time. If unsuccessful, alerts an error. 
 * 
 * @param {number} taskToUpdateId 
 */
        
function updateTask (taskToUpdateId) {
    console.log('in updateTask');
    console.log(taskToPost);
    $.ajax({
        method: 'PUT',
        url: `/tasks/${taskToUpdateId}`,
        data: taskToPost,
    }).then(function(response) {
        console.log('Response from server is:', response);
        getTask();
        taskToPost.time_completed = taskToPost.empty_time; //workaround for DateTimeParseError, can't set time_completed directly to undefined or null
    }).catch(function(error) {
        console.log('Error:', error);
        swal({
            text: 'There\'s an error!',
            icon: 'warning',
            button: true,
        });
    });
}

/**
 * On click of an element with a class of delete-button, uses the data method to retrieve the task object id stored in it after function displayTask runs and assigns the id to variable taskToDeleteId. Alerts to check if record should be deleted. If delete is canceled, returns false. If delete is confirmed, makes an AJAX request of type DELETE to the server with url: /tasks/taskToDeleteId.  If successful, logs the server's response and alerts the task was deleted. If unsuccessful, alerts an error. 
 */

function deleteTask () {
    console.log('in deleteTask');
    const taskToDeleteId = $(this).data('id');
    swal({
        text: 'Are you sure you want to remove this?',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                method: 'DELETE',
                url: `/tasks/${taskToDeleteId}`,
            }).then(function(response) {
                console.log('Response from server is:', response);
                getTask();
            }).catch(function(error) {
                console.log('Error:', error);
                swal({
                    text: 'There\'s an error!',
                    icon: 'warning',
                    button: true,
                });
            });
            swal('Success: Task deleted!', {
                icon: 'success',
            });
        } else {
            return false;
        } 
    }).catch(function(error) {
        console.log('Error:', error);
        swal({
            text: 'There\'s an error!',
            icon: 'warning',
            button: true,
        });
    });
}


