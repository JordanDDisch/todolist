casper.test.begin('Create and delete multiple todo items', 3, function(test) {
    casper.start('http://todolist.dev', function() {

        casper.fill('form', {
    	    'todo': 'task 1'
		});

        casper.click("input[type='submit']");

        test.assertExists('#todo-item-1');

        casper.fill('form', {
            'todo': 'task 2'
        });

        casper.click("input[type='submit']");

        test.assertExists('#todo-item-2');

        this.click(".delete-task");

        test.assertDoesntExist('#todo-item-1');

    }).run(function() {
        test.done();
    });
});