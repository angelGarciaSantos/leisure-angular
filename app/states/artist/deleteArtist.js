(function () {

	angular.module('deleteArtist', ['ui.router', 'services'])
		.config(function ($stateProvider) {
			$stateProvider
				.state('deleteArtist', {
					url: '/deleteArtist/:id',
					template: '<delete-artist></delete-artist>'
				})
		})
		.component('deleteArtist', {
			templateUrl: './states/artist/deleteArtist.html',
			controller: function (artistsService, $state, $stateParams) {
                var vm = this;
                this.valorCorte = 1;
                var artistId = $stateParams.id;
                vm.artist = artistsService.artists.get({ id: artistId });
      
				vm.artist.$delete({ id: artistId })
					.then(function (result) {

					}, function (error) {
						console.error(error);
					});

			}
		})

}());