console.log('javascript sourced');

$(readyNow);

function readyNow() {
    console.log('in readyNow, jQuery sourced');
    getTask();
    $('#task-button').on('click', addTask);
    $('body').on('click', '.complete-button', completeTask);
    $('body').on('click', '.delete-button', deleteTask);
}

const taskToPost = {};

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
        const now = new Date();
        let timeTaskAdded = String(now.getFullYear()) + '-' + 
                            String(now.getMonth()+1).padStart(2,0) + '-' + 
                            String(now.getDate()).padStart(2,0) + ' ' + 
                            String(now.getHours()).padStart(2,0) + ':' + 
                            String(now.getMinutes()).padStart(2, 0) + ':' + 
                            String(now.getSeconds()).padStart(2, 0);
        console.log(timeTaskAdded);
        taskToPost.description = $('#task-input').val();
        taskToPost.completed = false;
        taskToPost.time_added = timeTaskAdded;
        console.log(taskToPost);
        postTask();
    }
}

function postTask() {
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
            text: "There's an error!",
            icon: "warning",
            button: true,
        });
    });
}

function getTask() {
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then(function(response) {
        console.log('Response from server is:', response);
        displayTask(response);
    }).catch(function(error) {
        console.log('Error:', error);
        swal({
            text: "There's an error!",
            icon: "warning",
            button: true,
        });
    });
}

function displayTask(response) {
    $('#task-list').empty();
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

function completeTask () {
    console.log('in completeTask');
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
        console.log('Time task was completed:', timeTaskCompleted);
        updateTask(taskToUpdateId);
    } else if ($(this).parent().parent().hasClass('completed-task')) {
        taskToPost.completed = false;
        let emptyTime = taskToPost.empty_time;
        taskToPost.time_completed = emptyTime;
        console.log('Task marked incomplete.');
        console.log(taskToPost);
        updateTask(taskToUpdateId);
    }
}
        
function updateTask (taskToUpdateId) {
    $.ajax({
        method: 'PUT',
        url: `/tasks/${taskToUpdateId}`,
        data: taskToPost,
    }).then(function(response) {
        console.log('Response from server is:', response);
        getTask();
        delete taskToPost.time_completed;
    }).catch(function(error) {
        console.log('Error:', error);
        swal({
            text: "There's an error!",
            icon: "warning",
            button: true,
        });
    });
}

function deleteTask () {
    console.log('in deleteTask');
    const taskToDeleteId = $(this).data('id');
    swal({
        text: "Are you sure you want to remove this?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            $.ajax({
                method: 'DELETE',
                url: `/tasks/${taskToDeleteId}`
            }).then(function(response) {
                console.log('Response from server is:', response);
                getTask();
            }).catch(function(error) {
                console.log('Error:', error);
                alert('There\'s an error.');
            });
            swal("Success: Task deleted!", {
                icon: "success",
            });
        } 
    }).catch(function(error) {
        console.log('Error:', error);
        swal({
            text: "There's an error!",
            icon: "warning",
            button: true,
        });
    });
}


