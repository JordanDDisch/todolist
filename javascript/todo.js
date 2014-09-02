todo = {
    todoItems: [],
    getHighestTodoItemID: function() {
        var ids = [];
        if(!todo.todoItems.length === 0){
            for (var i=0; i < todo.todoItems.length; i++) {
                ids.push(todo.todoItems[i].id);
            }   
            var max = Math.max.apply(Math, ids);
            todo.todoItemCount = max;
        } else {
            todo.todoItemCount = 0;
        }  

    },
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
        todo.todoItems.forEach(function(todoItem){
            todo.buildTodoItemLI(todoItem);
        });
    },
    buildTodoItemLI: function(todoItem) {
        var node = document.createElement("LI");
        node.id = "todo-item-" + todoItem.id;
        var textnode = document.createTextNode(todoItem.value);
        node.appendChild(textnode);
        var deleteTask = document.createElement("div");
        deleteTask.className = "delete-task delete-task-" + todoItem.id;
        var deleteTextNode = document.createTextNode("delete");
        deleteTask.appendChild(deleteTextNode);
        document.getElementById("todo-list").appendChild(node).appendChild(deleteTask);
        node.appendChild(deleteTask);
    },
    buildTodoItem: function(todoItem) {
        todo.todoItemCount++;
        todoItem.id = todo.todoItemCount;
        todo.saveTodoItemLocally(todoItem);
    },
    removeTodoItem: function(todoItem) {

        var els = document.getElementsByClassName("delete-task");

        if(els) {
            for(var i = 0; i < els.length; i++) {
                els[i].addEventListener("click", function() {
                    var todoItemID = this.parentNode.getAttribute('id');
                    todoItemID = todoItemID.replace("todo-item-", "");
                    this.parentNode.remove();
                    todoItem = {
                       "id": todoItemID
                    }
                    todo.removeTodoItemLocally(todoItem);
                }, false);
            }
        }
    },
    saveTodoItemLocally: function(todoItem) {

        todoItemWithKey = {
            "id": todoItem.id,
            "value": todoItem.value
        };
        todo.todoItems.push(todoItemWithKey);
        localStorage.setItem('todoList', JSON.stringify(todo.todoItems));
    },
    removeTodoItemLocally: function(todoItem) {

        for (var k in todo.todoItems) {
          if (!todo.todoItems.hasOwnProperty(k)) continue;
          if (todo.todoItems[k].id === todoItem.id) {
            delete todo.todoItems[k];
          }
        }

        todo.todoItems.splice(todoItem, 1);
        localStorage.setItem('todoList', JSON.stringify(todo.todoItems));
    },
    onFormSubmit: function() {
        var formID =  document.getElementById("inputForm");
        var submitBtnID = document.getElementById("submitBtn");

        submitBtnID.addEventListener("click", function(event) {
            event.preventDefault(); // this will prevent submitting the form.
                todo.todoItems = JSON.parse(localStorage.getItem("todoList"));

                todoItem = {
                    value: todo.getTodoValue(),
                }

                todo.checkIfTodoItemIsEmpty(todoItem, function() {

                    todo.buildTodoItem(todoItem);
                    todo.buildTodoItemLI(todoItem);

                });

                todo.removeTodoItem();
        }, false);
    },
    checkIfLocalTodoItems: function(callback, empty) {
        todo.todoItems = JSON.parse(localStorage.getItem("todoList"));
        if(todo.todoItems) {
            callback();
        }
        else {
            if(empty) {
                empty();
            } else {
                alert("Your local storage is empty");
            }
        }
    },
    build: function() {

        // creates todo.todoItems
        todo.checkIfLocalTodoItems(
            function() {
                todo.buildTodoList();
            }, 
            function() {
                localStorage.setItem('todoList', "[]");
            }
        );

        todo.getHighestTodoItemID();

        todo.removeTodoItem();

        todo.onFormSubmit();
    }
};
