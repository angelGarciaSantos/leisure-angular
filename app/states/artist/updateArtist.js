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
			controller: function (artistsService, $state, $stateParams) {
                var vm = this;
                this.valorCorte = 1;

                var artistId = $stateParams.id;
                vm.editArtist = artistsService.artists.get({ id: artistId });

                vm.updateArtist = function () {
					//vm.nuevoMovimiento.fecha = new Date(vm.nuevoMovimiento.fecha);              
                    vm.editArtist.$update({ id: artistId })
						.then(function (result) {
							// cuando ha terminado el guardado del movimiento
							// es momento de pedir una actualización de datos
							//vm.nuevoMovimiento.importe = 0;
						}, function (error) {
							console.error(error);
							//vm.nuevoMovimiento.importe = -9999;
						});
				};
			}
		})

}());