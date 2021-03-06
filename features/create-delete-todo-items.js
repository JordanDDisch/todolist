casper.test.begin('Create and delete multiple todo items', 4, function(test) {
    casper.start('http://todolist.dev', function() {

        casper.evaluate(function(){
            localStorage.clear();
            localStorage.setItem("todoList","[]");
        });

        casper.reload();

        casper.then(function(){

            casper.fill('form', {
                'todo': 'asdf'
            });

            casper.click("input[type='submit']");

            test.assertExists('#todo-item-1');

            casper.fill('form', {
                'todo': 'task 2'
            });

            casper.click("input[type='submit']");

            test.assertExists('#todo-item-2');

            this.click(".delete-task-1");

            test.assertDoesntExist('#todo-item-1');

            this.click(".delete-task-2");

            test.assertDoesntExist('#todo-item-2');

        });


    }).run(function() {
        test.done();
    });
});