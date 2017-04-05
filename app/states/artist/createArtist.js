(function () {

	angular.module('createArtist', ['ui.router','services'])
		.config(function ($stateProvider) {
			$stateProvider
				.state('createArtist', {
					url: '/createArtist',
					template: '<create-artist></create-artist>'
				})
		})
		.component('createArtist', {
			templateUrl: './states/artist/createArtist.html',
			controller: function (artistsService) {
                var vm = this;
                this.valorCorte = 1;
                vm.newArtist = new artistsService.artists();             
                vm.createArtist = function () {
					//vm.nuevoMovimiento.fecha = new Date(vm.nuevoMovimiento.fecha);              
                    vm.newArtist.$save()
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