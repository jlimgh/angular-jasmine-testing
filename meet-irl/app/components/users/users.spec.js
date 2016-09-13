describe('UsersController', function() {
	var $controller, UsersController, usersFactory;

	// Mock the list of users we expect to use in our controller
	var userList = [
		{ id: '1', name: 'Jane', role: 'Designer', location: 'New York', twitter: 'gijane' },
		{ id: '2', name: 'Bob', role: 'Developer', location: 'New York', twitter: 'billybob' },
		{ id: '3', name: 'Jim', role: 'Developer', location: 'Chicago', twitter: 'jimbo' },
		{ id: '4', name: 'Bill', role: 'Designer', location: 'LA', twitter: 'dabill' }
	];

	//load ui-router and components.user module that we'll upload next
	beforeEach(angular.mock.module('ui.router'));
	beforeEach(angular.mock.module('components.users'));

	//inject the $controller service to create instances of the controller (UsersController) we want to test
	beforeEach(inject(function(_$controller_) {
		$controller = _$controller_;
		UsersController = $controller('UsersController', {});
	}));

	//verify our controller exists
	it('should be defined', function() {
		expect(UsersController).toBeDefined();
	});


});


