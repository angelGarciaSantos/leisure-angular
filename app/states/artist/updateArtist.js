(function () {

	angular.module('updateArtist', ['ui.router', 'services'])
		.config(function ($stateProvider) {
			$stateProvider
				.state('updateArtist', {
					url: '/updateArtist/:id',
					template: '<update-artist></update-artist>'
				})
		})
		.component('updateArtist', {
			templateUrl: './states/artist/updateArtist.html',
			controller: function ($mdToast, artistsService, $state, $stateParams) {
                var vm = this;
                this.valorCorte = 1;

                var artistId = $stateParams.id;
                vm.editArtist = artistsService.artists.get({ id: artistId });

                vm.updateArtist = function () {
					//vm.nuevoMovimiento.fecha = new Date(vm.nuevoMovimiento.fecha);              
                    vm.editArtist.$update({ id: artistId })
						.then(function (result) {
							$mdToast.show(
								$mdToast.simple()
									.textContent('¡Artista actualizado correctamente!')
									.position('top right')
									.hideDelay(3000)
								);
							$state.go('getAllArtists');
						}, function (error) {
							console.error(error);
								$mdToast.show(
									$mdToast.simple()
										.textContent('Error: el artista no ha podido actualizarse.')
										.position('top right')
										.hideDelay(4000)
									);
						});
				};
			}
		})

}());