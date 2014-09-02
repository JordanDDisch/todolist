casper.test.begin('Persist local tasks', 2, function(test) {
    casper.start('http://todolist.dev', function() {

        localStorage.clear();
        localStorage.setItem("todoList","[]");

        casper.fill('form', {
            'todo': 'persist task 1'
        });

        casper.click("input[type='submit']");

        casper.reload();

        test.assertExists('#todo-item-1');

        casper.fill('form', {
            'todo': 'persist task 1'
        });

        casper.click("input[type='submit']");

        test.assertExists('#todo-item-2');

    }).run(function() {
        test.done();
    });
});