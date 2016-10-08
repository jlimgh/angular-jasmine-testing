
describe('Users factory', function() {
  var Users;
  var userList = [
	      {
	        id: '1',
	        name: 'Jane',
	        role: 'Designer',
	        location: 'New York',
	        twitter: 'gijane',
	        pokemon: { name: 'blastoise' }
	      },
	      {
	        id: '2',
	        name: 'Bob',
	        role: 'Developer',
	        location: 'New York',
	        twitter: 'billybob',
	        pokemon: { name: 'growlithe' }
	      },
	      {
	        id: '3',
	        name: 'Jim',
	        role: 'Developer',
	        location: 'Chicago',
	        twitter: 'jimbo',
	        pokemon: { name: 'hitmonchan' }
	      },
	      {
	        id: '4',
	        name: 'Bill',
	        role: 'Designer',
	        location: 'LA',
	        twitter: 'dabill',
	        pokemon: { name: 'barney' }
	      }
	];

  var singleUser = {
    id: '2',
    name: 'Bob',
    role: 'Developer',
    location: 'New York',
    twitter: 'billybob',
    pokemon: { name: 'growlithe' }
  };

    // Before each test load our api.users module
  beforeEach(angular.mock.module('api.users'));

  // Before each test set our injected Users factory (_Users_) to our local Users variable
  beforeEach(inject(function(_Users_) {
    Users = _Users_;
  }));

  // A simple test to verify the Users factory exists
  it('should exist', function() {
    expect(Users).toBeDefined();
  });

  describe('.all()', function() {
  	it('should exist', function() {
  		expect(Users.all).toBeDefined();
  	});

  	it('should return hard-coded list of users', function() {
  		expect(Users.all()).toEqual(userList);
  	});
  });

  describe('.findById()', function() {
  	it('should exist', function() {
  		expect(Users.findById).toBeDefined();
  	});

  	it('should return one user object', function() {
  		expect(Users.findById('2')).toEqual(singleUser);
  	});

  	it('should return undefined', function() {
  		expect(Users.findById('ABC')).not.toBeDefined();
  	});
  });
});