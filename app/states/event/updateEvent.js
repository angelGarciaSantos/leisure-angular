(function () {

	angular.module('updateEvent', ['ui.router', 'services'])
		.config(function ($stateProvider) {
			$stateProvider
				.state('updateEvent', {
					url: '/updateEvent/:id',
					template: '<update-event></update-event>'
				})
		})
		.component('updateEvent', {
			templateUrl: './states/event/updateEvent.html',
			controller: function (eventsService, $state, $stateParams) {
                var vm = this;
                vm.eventId = $stateParams.id;
                vm.editEvent = eventsService.events.get({ id: vm.eventId });


				// $scope.license = {
        		// 	expirationdate: '2015-12-15T23:00:00.000Z'
    			// };

    			// $scope.dt = new Date($scope.license.expirationdate);
        
                vm.updateEvent = function () {
					//vm.nuevoMovimiento.fecha = new Date(vm.nuevoMovimiento.fecha);
					// var bd = new Date(vm.editEvent.beginDate)
					// var ed = new Date(vm.editEvent.endDate)              
					// vm.editEvent.beginDate = JSON.stringify(bd);
					// vm.editEvent.endDate = JSON.stringify(ed);

                    vm.editEvent.$update({ id: vm.eventId })
						.then(function (result) {
							// cuando ha terminado el guardado del movimiento
							// es momento de pedir una actualización de datos
							//vm.nuevoMovimiento.importe = 0;
							vm.editEvent = eventsService.events.get({ id: vm.eventId });

						}, function (error) {
							console.error(error);
							//vm.nuevoMovimiento.importe = -9999;
						});
				};

				vm.$onInit = function() {
      			};
			}
		})

}());