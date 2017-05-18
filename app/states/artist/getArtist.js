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
				//vm.imageUrl = "http://i.imgur.com/1asNWI9.png";
                vm.artistId = $stateParams.id;


				vm.isFollowing = function(){
					artistsService.followArtist.query({ artistId: vm.artistId, userId:1 }).$promise.then(function(data) {
						var result = data;
						vm.isFollowingArtist = result[0]; 
					});	
				}

				artistsService.artists.get({ id: vm.artistId  }).$promise.then(function(data) {
					vm.artist = data;
				});	

				vm.deleteArtist = function () {
					vm.artist.$delete({ id: vm.artistId })
						.then(function (result) {
							$state.go('getAllArtists');
						}, function (error) {
							console.error(error);
						});
				}

				vm.isFollowing();

				ratingsService.globalRatingArtist.query({ id: vm.artistId }).$promise.then(function(data) {
					vm.globalRating = data;
				});
				vm.follow = new artistsService.followArtist(); 

				vm.followArtist = function () {
					vm.follow.$save({ artistId: vm.artistId, userId: 1 }) //TODO: user id forzado
						.then(function (result) {
							vm.isFollowing();	
						}, function (error) {
							console.error(error);
						});
				}

				vm.unfollowArtist = function () {
					vm.follow.$delete({ artistId: vm.artistId, userId: 1 })
						.then(function (result) {
							vm.isFollowing();
						}, function (error) {
							console.error(error);
						});
				}

				vm.$onInit = function() {

				};
			}
		})

}());