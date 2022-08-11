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
    const now = new Date();
    let currentTime = String(now.getHours()).padStart(2,0) + ':' + String(now.getMinutes()).padStart(2, 0);
    console.log(currentTime);
    console.log('in addTask');
    if ($('#task-input').val() === '') {
        swal({
            text: "Please enter a task!",
            icon: "warning",
            button: true,
        });
        // alert('You haven\'t entered a task!');
        return false;
    } else {
        taskToPost.description = $('#task-input').val();
        taskToPost.completed = false;
        taskToPost.time = currentTime;
        console.log(taskToPost);
        postTask();
        $('#task-input').val('');
    }
}

function postTask() {
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: taskToPost,
    }).then(function(response) {
        console.log('Back from POST:', response);
        getTask();
    }).catch(function(error) {
        console.log('Error:', error);
        alert('There\'s an error.');
    });
}

function getTask() {
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then(function(response) {
        console.log('Response from server is:', response);
        $('#task-list').empty();
        for (let task of response) {
            const taskTime = new Date(`01/01/1970 ${task.time}`);
            let formattedTaskTime = taskTime.toLocaleString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit'}).toLowerCase();
            if (task.completed === true) {
                $('#task-list').append(`
                    <div class="task-item completed-task">
                        <div class="task-time">
                            <span class="task-to-complete fade-strike">${task.description}</span>
                            <span class="time-placeholder">Done: ${formattedTaskTime}</span>
                        </div>
                        <div class="button-container">
                            <button class="complete-button" data-id="${task.id}">
                                <i class="fas fa-solid fa-calendar-check"></i>
                            </button>
                            <button class="delete-button" data-id="${task.id}">
                                <i class="fas fa-solid fa-calendar-minus"></i>
                            </button>
                        </div>
                    </div>
                `);
            } else {
                $('#task-list').append(`
                    <div class="task-item">
                        <div class="task-time">
                            <span class="task-to-complete">${task.description}</span>
                        </div>
                        <div class="button-container">
                            <button class="complete-button" data-id="${task.id}">
                                <i class="fas fa-solid fa-calendar-check"></i></i>
                            </button>
                            <button class="delete-button" data-id="${task.id}">
                                <i class="fas fa-solid fa-calendar-minus"></i>
                            </button>
                        </div>
                    </div>
                `);
            }
        }
    }).catch(function(error) {
        console.log('Error:', error);
        alert('There\'s an error.');
    });
}

//update time and completed status to true then getTask()
function completeTask () {
    console.log('in completeTask');
    const taskToUpdateId = $(this).data('id');
    console.log(taskToUpdateId);
    $.ajax({
        method: 'PUT',
        url: `/tasks/${taskToUpdateId}`
    }).then(function(response) {
        console.log('Response from server is:', response);
        getTask();
    }).catch(function(error) {
        console.log('Error:', error);
        alert('There\'s an error');
    });
}
    
function deleteTask () {
    console.log('in deleteTask');
    const taskToDeleteId = $(this).data('id');
    console.log(taskToDeleteId);
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
        alert('There\'s an error');
    });
}

// console.log('in completeTask');
//     const taskToUpdateId = $(this).data('id');
//     console.log(taskToUpdateId);
//     $(this).parent().parent().toggleClass('completed-task');
//     $(this).parent().parent().children('.task-time').children('.task-to-complete').toggleClass('fade-strike');
//     if($(this).parent().parent().children('.task-time').children().hasClass('time-placeholder')) {
//         $(this).parent().parent().children('.task-time').children('.time-placeholder').remove();
//     } else { 
//         $(this).parent().parent().children('.task-time').append(`<span class="time-placeholder">Done: 0:00 a.m.</span>`);
