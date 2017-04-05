(function () {

	angular.module('createLocal', ['ui.router','services'])
		.config(function ($stateProvider) {
			$stateProvider
				.state('createLocal', {
					url: '/createLocal',
					template: '<create-local></create-local>'
				})
		})
		.component('createLocal', {
			templateUrl: './states/local/createLocal.html',
			controller: function (localsService) {
                var vm = this;
                this.valorCorte = 1;
                vm.newLocal = new localsService.locals();             
                vm.createLocal = function () {
					//vm.nuevoMovimiento.fecha = new Date(vm.nuevoMovimiento.fecha);              
                    vm.newLocal.$save()
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