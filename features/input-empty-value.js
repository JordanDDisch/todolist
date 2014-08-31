casper.test.begin('Create and delete a todo item', 1, function(test) {
    casper.start('http://todolist.dev', function() {

        casper.fill('form', {
    	    'todo': ''
		});

        casper.click("input[type='submit']");

        test.assertDoesntExist('#todo-item-1');

    }).run(function() {
        test.done();
    });
});