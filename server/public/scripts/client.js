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
        alert('You haven\'t entered a task!');
        return false;
    } else {
        taskToPost.description = $('#task-input').val();
        taskToPost.completed = false;
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
            $('#task-list').append(`
                <div class="task-item">
                    <div class="task-time">
                        <span class="task-to-complete">${task.description}</span>
                    </div>
                    <div class="button-container">
                            <button class="complete-button">
                                <i class="fas fa-solid fa-calendar-check"></i></i>
                                </button>
                            <button class="delete-button">
                            <i class="fas fa-solid fa-calendar-minus"></i>
                        </button>
                    </div>
                </div>
            `);
        }
    }).catch(function(error) {
        console.log('Error:', error);
        alert('There\'s an error.');
    });
}

function completeTask () {
    console.log('in completeTask');
    $(this).parent().parent().toggleClass('completed-task');
    $(this).parent().parent().children('.task-time').children('.task-to-complete').toggleClass('fade-strike');
    if($(this).parent().parent().children('.task-time').children().hasClass('time-placeholder')) {
        $(this).parent().parent().children('.task-time').children('.time-placeholder').remove();
    } else { 
        $(this).parent().parent().children('.task-time').append(`<span class="time-placeholder">Done: 0:00 a.m.</span>`);
        // $.ajax({
        //     method: 'GET',
        //     url: '/tasks'
        // }).then(function(response) {
        // console.log('Response from server is:', response);
        //     for(let task of response) {
        //         console.log(task);
                
        //     }
        // })
    }
}

function deleteTask () {
    console.log('in deleteTask');
    $(this).parent().parent().remove();
}

