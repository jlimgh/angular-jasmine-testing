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

  // Add mocked Pokéapi response
  var RESPONSE_ERROR = {
    'detail': 'Not found.'
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

  describe('Profile Controller with a valid resolvedUser and a valid Pokemon', function() {
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

      spyOn(PokemonFactory, "findByName").and.callThrough();

      ProfileController = $controller('ProfileController', {resolvedUser: singleUser, Pokemon: PokemonFactory});
  	});

  	it('should set the view model user object to the resolvedUser', function() {
  		expect(ProfileController.user).toEqual(singleUser);
  	});

  	it('should call Pokemon.findByName and return a Pokemon object', function() {
  		// Add expectations before the request is finished
  		expect(ProfileController.user.pokemon.id).toBeUndefined();
  		expect(ProfileController.user.pokemon.name).toEqual('growlithe');
  		expect(ProfileController.user.pokemon.image).toBeUndefined();
  		expect(ProfileController.user.pokemon.type).toBeUndefined();

  		$httpBackend.whenGET(API + singleUser.pokemon.name).respond(200, $q.when(RESPONSE_SUCCESS));
  		$httpBackend.flush();

  		expect(PokemonFactory.findByName).toHaveBeenCalledWith('growlithe');
      	expect(ProfileController.user.pokemon.id).toEqual(58);
      	expect(ProfileController.user.pokemon.name).toEqual('growlithe');
      	expect(ProfileController.user.pokemon.image).toContain('.png');
      	expect(ProfileController.user.pokemon.type).toEqual('fire');
  	});
  });

  describe('Profile Controller with a valid resolved user and an invalid Pokemon', function () {
    var singleUser, ProfileController;

    beforeEach(function() {
      // Update Pokémon name
      singleUser = {
        id: '2',
        name: 'Bob',
        role: 'Developer',
        location: 'New York',
        twitter: 'billybob',
        pokemon: { name: 'godzilla' }
      };

      spyOn(PokemonFactory, "findByName").and.callThrough();

      ProfileController = $controller('ProfileController', { resolvedUser: singleUser, Pokemon: PokemonFactory });
    });

    it('should call Pokemon.findByName and default to a placeholder image', function() {
      expect(ProfileController.user.pokemon.image).toBeUndefined();

      // Declare the endpoint we expect our service to hit and provide it with our mocked return values
      $httpBackend.whenGET(API + singleUser.pokemon.name).respond(404, $q.reject(RESPONSE_ERROR));
      $httpBackend.flush();

      // Add expectation that our image will be set to a placeholder image
      expect(PokemonFactory.findByName).toHaveBeenCalledWith('godzilla');
      expect(ProfileController.user.pokemon.image).toEqual('http://i.imgur.com/HddtBOT.png');
    });
  });
});