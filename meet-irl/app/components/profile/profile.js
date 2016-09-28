(function() {
	'use strict';

	angular.module('components.profile', [])
	.controller('ProfileController', function(resolvedUser, Pokemon) { //add pokemon dependency
		var vm = this;
		vm.user = resolvedUser;

		// Call our Pokemon service using our resolved user's Pokemon
		Pokemon.findByName(vm.user.pokemon.name)
		.then(function(result) {
			vm.user.pokemon.id = result.id;
			vm.user.pokemon.image = result.sprites.front_default;
			vm.user.pokemon.type = result.types[0].type.name;
		})
		.catch(function(result) {
			vm.user.pokemon.image = 'http://i.imgur.com/HddtBOT.png';
		});
	})
	.config(function($stateProvider) {
		$stateProvider
		.state('profile', {
			url: '/user/:id',
	        templateUrl: 'components/profile/profile.html',
	        controller: 'ProfileController as pc',
	        resolve: {
	        	resolvedUser: function(Users, $stateParams) {
	        		return Users.findById($stateParams.id);
	        	}
	        }
		});
	});


})();