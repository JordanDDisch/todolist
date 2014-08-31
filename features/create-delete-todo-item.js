casper.test.begin('Create and delete a todo item', 2, function(test) {
    casper.start('http://todolist.dev', function() {

        casper.fill('form', {
    	    'todo': 'asdf'
		});

        casper.click("input[type='submit']");

        test.assertExists('#todo-item-1');

        this.click(".close-button");

        test.assertDoesntExist('#todo-item-1');

    }).run(function() {
        test.done();
    });
});