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
			controller: function (eventsService, localsService, $mdDialog) {
                var vm = this;
                vm.selectedLocal = [];
                vm.newEvent = new eventsService.events();      
				vm.newEvent = new eventsService.createEvent();             
                vm.myDate;

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

                vm.createEvent = function () {           
					vm.newEvent.$save({ localId: vm.selectedLocal[0]})
						.then(function (result) {
							// cuando ha terminado el guardado del movimiento
							// es momento de pedir una actualización de datos
							//vm.nuevoMovimiento.importe = 0;
						}, function (error) {
							console.error(error);
							//vm.nuevoMovimiento.importe = -9999;
						});
				};

				vm.reloadAllLocals = function () {
					localsService.locals.query().$promise.then(function(data) {
						vm.allLocals = data;
					});
				};

				// vm.addSelectedLocal = function () {
				// 	//en vm.selectedLocal tendremos el id del local a añadir.
				// 	//hacermos un get local por id, y cuando la promesa esté resuelta, 
				// 	//lo chantamos dentro del objeto vm.newEvent, vm.newEvent.local = ...
				// 	if (vm.selectedLocal != -1) {
				// 		vm.local = localsService.locals.get({ id: vm.selectedLocal });
				// 		vm.newEvent.local = vm.local;
				// 	}
				// 	else {
				// 		alert("Aqui no hay local ninguno! y pon un mdToast cutron!");
				// 	}			
				// };

				vm.hideDialog = $mdDialog.hide;
				vm.selectLocalDialog = vm.selectLocalDialog;
				vm.selectLocalDialog = function(evt) {
					vm.dialogOpen = true;
					$mdDialog.show({
					targetEvent: evt,
					controller: function () { 
						this.parent = vm; 
						},
					controllerAs: 'ctrl',
					templateUrl: './states/event/selectLocalDialog.html'
					});
				};

				vm.logItem = function (item) {
   					console.log(item.name, 'was selected');
  				};

				vm.license = {
        			expirationdate: '2015-12-15T23:00:00.000Z'
    			};

    			vm.dt = new Date(vm.license.expirationdate);

				vm.$onInit = function() {
					vm.reloadAllLocals();
					// vm.eventId = $stateParams.id;
					// vm.editEvent = eventsService.events.get({ id: vm.eventId });			
					// vm.reloadEventArtists();
					// vm.reloadAllArtists();
					// vm.reloadAllLocals();
				};
			}
		})
}());