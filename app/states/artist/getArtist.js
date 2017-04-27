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

				ratingsService.globalRatingArtist.query({ id: vm.artistId }).$promise.then(function(data) {
					vm.globalRating = data;
				});
			}
		})

}());