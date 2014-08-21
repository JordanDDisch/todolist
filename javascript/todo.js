todo = {
    getTodoValue: function() {
        return document.getElementsByClassName('new-todoItem')[0].value;
    },
    checkIfTodoItemIsEmpty: function(todoItem, callback, error) {
        if(todoItem == "") {
            if(error) {
                error();
            } else {
                alert('Error. Cannot put empty item');
            }
        } else {
            callback();
        }
    },
    buildTodoList: function() {
        var node = document.createElement("ul");
        node.id = "todo-list";
        document.getElementsByTagName("body")[0].appendChild(node);
        todo.todoItems.forEach(function(todoItem){
            todo.buildTodoItem(todoItem);
        });

    },
    buildTodoItem: function(todoItem) {
        var node = document.createElement("LI");
        node.id = "todo-item";
        var textnode = document.createTextNode(todoItem);
        node.appendChild(textnode);
        var closeButton = document.createElement("div");
        closeButton.id = "close-button";
        var closeTextNode = document.createTextNode("close");
        closeButton.appendChild(closeTextNode);
        document.getElementById("todo-list").appendChild(node).appendChild(closeButton);
        todo.saveTodoListLocally();
    },
    removeTodoItem: function($) {
        $('#close-button').click(function(){
            $('#todo-item').remove();
        });
    },
    saveTodoListLocally: function() {
        todo.todoItems.push(todo.getTodoValue());
        localStorage.setItem('todoList', JSON.stringify(todo.todoItems));
    },
    buildListFromLocalStorage: function() {
       todo.todoItems = JSON.parse(localStorage.getItem("todoList"));
       if(todo.todoItems) {
           todo.buildTodoList();
       }
    },
    build: function() {

        todo.buildListFromLocalStorage();

        $("form").submit(function(e) {
            e.preventDefault(); // this will prevent from submitting the form.

            var todoItem = todo.getTodoValue();

            todo.checkIfTodoItemIsEmpty(todoItem, function() {

                todo.buildTodoList();

                todo.removeTodoItem($);

            });
        });
    }
};
