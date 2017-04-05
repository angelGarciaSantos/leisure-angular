(function () {

	angular.module('updateLocal', ['ui.router', 'services'])
		.config(function ($stateProvider) {
			$stateProvider
				.state('updateLocal', {
					url: '/updateLocal/:id',
					template: '<update-local></update-local>'
				})
		})
		.component('updateLocal', {
			templateUrl: './states/local/updateLocal.html',
			controller: function (localsService, $state, $stateParams) {
                var vm = this;
                this.valorCorte = 1;

                var localId = $stateParams.id;
                vm.editLocal = localsService.locals.get({ id: localId });

                vm.updateLocal = function () {
					//vm.nuevoMovimiento.fecha = new Date(vm.nuevoMovimiento.fecha);              
                    vm.editLocal.$update({ id: localId })
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