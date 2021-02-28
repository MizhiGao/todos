$(function () {
    $('#todo-input').on('keyup', addTodo);
    $('#todos-list').on('click', '.todo-item-hd', toggleTodo);
    $('#todos-list').on('click', '.todo-item-ft', removeTodo);
    $('.filters').on('click', '.filter-item', filterTodo);
    todoCount();
    clearCompleted();
    //1.新增todo
    function addTodo(e) {
        var inputValue = $.trim($('#todo-input').val());
        if (e.keyCode == 13 && inputValue) {
            $('#todos-list').prepend(`<div class="todo-item"><span class="todo-item-hd"></span><span class="todo-item-bd">${inputValue}</span><span class="todo-item-ft">X</span></div>`);
            $(this).val('');
        };
        todoCount();
    };
    //2.切换todo完成状态
    function toggleTodo() {
        $(this).parent().toggleClass('active');
        todoCount();
        clearCompleted();
    };
    //3.删除todo
    function removeTodo() {
        $(this).parent().remove();
        todoCount();
    };
    //4.筛选todo
    function filterTodo(obj) {
        $('.filter-item').each(function (index) {
            if ($(this).hasClass('active')) { $(this).removeClass('active'); };
        });
        $(this).addClass(' active');
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
        todoCount();
    };
    //5.todo数量
    function todoCount() { $('.todo-count').text($('.todos-list').children().length - $('.todo-item.active').length); }
    function clearCompleted() {
        if ($('.todo-item').hasClass('active')) {
            $('.remove-completed').show();
            //$('#todos-foot').append(`<span class="remove-completed">删除已完成</span>`)
            $('.remove-completed').click(function clear() {
                $('.todo-item.active').each(function () {
                    $(this).remove();
                })
            });
        } else {
            $('.remove-completed').hide();
        }

    }


})
