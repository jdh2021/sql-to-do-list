console.log('javascript sourced');

$(readyNow);

function readyNow() {
    console.log('in readyNow, jQuery sourced');
    $('#task-button').on('click', addTask);
}

const taskToPost = {};

function addTask() {
    console.log('in addTask');
    taskToPost.description = $('#task-input').val();
    console.log(taskToPost);
    postTask();
    $('#task-input').val('');
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
                <li class="task-item">
                    <span class="task-to-complete">${task.description}</span>
                    <button class="complete-button">
                        <i class="fas fa-solid fa-calendar-check"></i></i>
                    </button>
                    <button class="delete-button">
                        <i class="fas fa-solid fa-calendar-minus"></i>
                    </button>
                </li>
            `);
        }
    }).catch(function(error) {
        console.log('Error:', error);
        alert('There\'s an error.');
    });
}
