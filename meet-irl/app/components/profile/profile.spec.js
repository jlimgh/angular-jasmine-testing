describe('components.profile', function() {
  var $controller, PokemonFactory, $q, $httpBackend;
  var API = 'http://pokeapi.co/api/v2/pokemon/';
  var RESPONSE_SUCCESS = {
    'id': 58,
    'name': 'growlithe',
    'sprites': {
      'front_default': 'http://pokeapi.co/media/sprites/pokemon/58.png'
    },
    'types': [{
      'type': { 'name': 'fire' }
    }]
  };

  // Load ui.router and our components.profile module which we'll create next
  //load pokemon service
  beforeEach(angular.mock.module('ui.router'));
  beforeEach(angular.mock.module('components.profile'));
  beforeEach(angular.mock.module('api.pokemon'));

  // Inject the $controller service
  // Inject Pokemon factory, $q, and $httpBackend for testing HTTP requests
  beforeEach(inject(function(_$controller_, _$q_, _$httpBackend_, _Pokemon_) {
    $controller = _$controller_;
    $q = _$q_;
    $httpBackend = _$httpBackend_;
    PokemonFactory = _Pokemon_;
  }));

  describe('ProfileController', function() {
    var ProfileController, singleUser;

    beforeEach(function() {
      singleUser = {
        id: '2',
        name: 'Bob',
        role: 'Developer',
        location: 'New York',
        twitter: 'billybob',
        pokemon: { name: 'growlithe' }
      };
      // Create an instance of our controller
      // Add Pokemon dependency
      ProfileController = $controller('ProfileController', {resolvedUser: singleUser, Pokemon: PokemonFactory});
    });

    // Verify our controller exists
    it('should be defined', function() {
      expect(ProfileController).toBeDefined();
    });
  });

  describe('Profile Controller with a valid resolvedUser', function() {
  	var ProfileController, singleUser;

  	beforeEach(function() {
  	  singleUser = {
        id: '2',
        name: 'Bob',
        role: 'Developer',
        location: 'New York',
        twitter: 'billybob',
        pokemon: { name: 'growlithe' }
      };

      ProfileController = $controller('ProfileController', {resolvedUser: singleUser});
  	});

  	it('should set the view model user object to the resolvedUser', function() {
  		expect(ProfileController.user).toEqual(singleUser);
  	});

  });
});