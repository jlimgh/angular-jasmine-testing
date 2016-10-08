describe('UsersController', function() {
	var $controller, UsersController, usersFactory;

	// Mock the list of users we expect to use in our controller
	var userList = [
		{ id: '1', name: 'Jane', role: 'Designer', location: 'New York', twitter: 'gijane', pokemon: { name: 'blastoise' } },
		{ id: '2', name: 'Bob', role: 'Developer', location: 'New York', twitter: 'billybob', pokemon: { name: 'growlithe' } },
		{ id: '3', name: 'Jim', role: 'Developer', location: 'Chicago', twitter: 'jimbo', pokemon: { name: 'hitmonchan' } },
		{ id: '4', name: 'Bill', role: 'Designer', location: 'LA', twitter: 'dabill', pokemon: { name: 'barney' } }
	];

	//load ui-router and components.user module that we'll upload next
	beforeEach(angular.mock.module('ui.router'));
	beforeEach(angular.mock.module('components.users'));
	beforeEach(angular.mock.module('api.users'));

	//inject the $controller service to create instances of the controller (UsersController) we want to test
	beforeEach(inject(function(_$controller_, _Users_) {
		$controller = _$controller_;
		UsersFactory = _Users_;

		spyOn(UsersFactory, 'all').and.callFake(function() {
			return userList;
		})


		UsersController = $controller('UsersController', { User: UsersFactory });
	}));

	//verify our controller exists
	it('should be defined', function() {
		expect(UsersController).toBeDefined();
	});

	it('should initialize with a call to Users.all()', function() {
		expect(UsersFactory.all).toHaveBeenCalled();
		expect(UsersController.users).toEqual(userList);
	});


});


