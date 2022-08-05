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
}
