(function () {

	angular.module('getArtist', ['services'])
		.config(function ($stateProvider) {
			$stateProvider
				.state('getArtist', {
					url: '/getArtist/:id',
					template: '<get-artist></get-artist>'
				})
		})
		.component('getArtist', {
			templateUrl: './states/artist/getArtist.html',
			controller: function (artistsService, $state, $stateParams, ratingsService) {
                var vm = this;
                this.valorCorte = 1;

                vm.artistId = $stateParams.id;
                vm.artist = artistsService.artists.get({ id: vm.artistId });
				//vm.isFollowingArtist = artistsService.followArtist.get({ artistId: vm.artistId, userId: 1 });
				
				artistsService.followArtist.query({ artistId: vm.artistId, userId:1 }).$promise.then(function(data) {
					vm.isFollowingArtist = data;
				});	

				ratingsService.globalRatingArtist.query({ id: vm.artistId }).$promise.then(function(data) {
					vm.globalRating = data;
				});
				vm.follow = new artistsService.followArtist(); 

				vm.followArtist = function () {
					vm.follow.$save({ artistId: vm.artistId, userId: 1 }) //TODO: user id forzado
						.then(function (result) {
							artistsService.followArtist.query({ artistId: vm.artistId, userId:1 }).$promise.then(function(data) {
								vm.isFollowingArtist = data;
							});		
							// cuando ha terminado el guardado del movimiento
							// es momento de pedir una actualización de datos
							//vm.nuevoMovimiento.importe = 0;
						}, function (error) {
							console.error(error);
							//vm.nuevoMovimiento.importe = -9999;
						});
				}

				vm.unfollowArtist = function () {
					vm.follow.$delete({ artistId: vm.artistId, userId: 1 })
						.then(function (result) {
							artistsService.followArtist.query({ artistId: vm.artistId, userId:1 }).$promise.then(function(data) {
								vm.isFollowingArtist = data;
							});	
						}, function (error) {
							console.error(error);
						});
				}

				vm.$onInit = function() {

				};
			}
		})

}());