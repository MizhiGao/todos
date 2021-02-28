$(function () {
    load();
    $('#todo-input').on('keyup', addTodo);
    $('#todos-list').on('click', '.todo-item-ft', removeTodo);
    $('#todos-list').on('click', '.todo-item-hd', toggleTodo);
    $('.filters').on('click', '.filter-item', filterTodo);
    $('.remove-completed').on('click',clearCompleted)
    function addTodo(e) {
        var inputValue = $.trim($('#todo-input').val());
        if (e.keyCode === 13 && inputValue) {
            var local = getTodo();//获取本地数据保存到local数组中
            local.push({
                title: inputValue,
                completed: false
            });
            saveTodo(local);
            load();
            $(this).val('');
        }
    }
    function getTodo() {
        var data = localStorage.getItem('todos');
        if (data !== null) {
            return JSON.parse(data);
        } else return [];
    }
    function saveTodo(data) {
        localStorage.setItem('todos', JSON.stringify(data));
    }
    function load() {
        var data = getTodo();
        $('#todos-list').empty();
        $.each(data, function (index, ele) {
            $('#todos-list').prepend(
                `<div class="todo-item ${ele.completed ? 'active' : ''}" data-index="${index}">
            <div class="todo-item-hd"></div>
            <div class="todo-item-bd">${ele.title}</div>
            <div class="todo-item-ft">x</div></div>`)
        }
        );
        if($('#todos-list').children().hasClass('active')){
            $('.remove-completed').show();
        }else{
            $('.remove-completed').hide();
        }
        todoCount();

    }
    function removeTodo() {
        var data = getTodo();
        var index = $(this).parent().attr('data-index');
        data.splice(index, 1);
        saveTodo(data);
        load();
    }

    function toggleTodo() {
        var data = getTodo();
        var index = $(this).parent().attr('data-index');
        data[index].completed = !$(this).parent().hasClass('active');
        saveTodo(data);
        load();
    }
    function todoCount() {
        var data = getTodo();
        $('.todo-count').text(data.filter(data => data.completed === false).length);
    }
    function clearCompleted(){
        var data=getTodo();
        data=data.filter(data=>data.completed!==true);
        saveTodo(data);
        load();
    }
    function filterTodo() {
        $('.filter-item.active').removeClass('active');
        $(this).addClass('active');
        var id=$(this).attr('id');
        switch ($(this).text()) {
            case '进行中':
                $('.todo-item').each(function () {
                    if ($(this).hasClass('active')) { $(this).hide('fast'); } else {
                        $(this).show();
                    }
                });
                break;
            case '已完成':
                $('.todo-item').each(function () {
                    if ($(this).hasClass('active')) { $(this).show('slow'); } else {
                        $(this).hide();
                    }
                });
                break;
            default:
                $('.todo-item').each(function () { $(this).show('slow'); });
                break;
        }
        /*switch (id){
            case '1':
                $('.todo-item').each(function () {
                    if ($(this).hasClass('active')) { $(this).hide(); } else {
                        $(this).show();
                    }
                });
                $('.todo-item.active').hide();
                break;
            case 2:                
                $('.todo-item.active').show();
                break;
            default:
                $('.todo-item').show();
                break;

        }*/
    }

})