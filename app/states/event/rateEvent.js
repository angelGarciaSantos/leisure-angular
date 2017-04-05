(function () {

	angular.module('rateEvent', ['ui.router','services'])
		.config(function ($stateProvider) {
			$stateProvider
				.state('rateEvent', {
					url: '/rateEvent/:event/:user',
					template: '<rate-event></rate-event>'
				})
		})
		.component('rateEvent', {
			templateUrl: './states/event/rateEvent.html',
			controller: function (ratingsService, $state, $stateParams) {
                var vm = this;
				vm.eventId = $stateParams.event;
				vm.userId = $stateParams.user;
                vm.newRating = new ratingsService.rateEvent();             
                vm.rateEvent = function () {
					//vm.nuevoMovimiento.fecha = new Date(vm.nuevoMovimiento.fecha);              
                    vm.newRating.$save({ eventId: vm.eventId, userId: vm.userId })
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