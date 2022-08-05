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
    }).catch(function(error) {
        console.log('Error:', error);
        alert('There\'s an error.');
    });
}
