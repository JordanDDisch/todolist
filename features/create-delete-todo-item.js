casper.test.begin('Create and delete a todo item', 2, function(test) {
    casper.start('http://casperjs.local', function() {

        casper.fill('form', {
    	    'todo': 'asdf'
		});

        casper.click("input[type='submit']");

        test.assertExists('#todo-item');

        this.click("#close-button");

        test.assertDoesntExist('#todo-item');

    }).run(function() {
        test.done();
    });
});