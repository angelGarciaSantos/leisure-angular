(function () {

	angular.module('createEvent', ['ui.router','services'])
		.config(function ($stateProvider) {
			$stateProvider
				.state('createEvent', {
					url: '/createEvent',
					template: '<create-event></create-event>'
				})
		})
		.component('createEvent', {
			templateUrl: './states/event/createEvent.html',
			controller: function (eventsService) {
                var vm = this;
                this.valorCorte = 1;
                vm.newEvent = new eventsService.events();             
                vm.createEvent = function () {
					//vm.nuevoMovimiento.fecha = new Date(vm.nuevoMovimiento.fecha);              
                    vm.newEvent.$save()
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