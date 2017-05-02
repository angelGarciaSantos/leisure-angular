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
			controller: function ($scope, eventsService, artistsService, $state, $stateParams, $mdToast) {
                var vm = this;
				vm.addArtistToEvent = new eventsService.addArtistToEvent();

				$scope.selected = [];
                vm.eventId = $stateParams.id;
                vm.editEvent = eventsService.events.get({ id: vm.eventId });
				
				vm.selectedArtist;

				artistsService.artistsByEvent.query({ id: vm.eventId }).$promise.then(function(data) {
					vm.artists = data;
				});
				artistsService.artists.query().$promise.then(function(data) {
					vm.allArtists = data;
				});


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

                vm.addSelectedArtist = function () {
                   	vm.addArtistToEvent.$save({ eventId: vm.eventId, artistId: vm.selectedArtist })
						.then(function (result) {
							artistsService.artistsByEvent.query({ id: vm.eventId }).$promise.then(function(data) {
								vm.artists = data;
							});

							$mdToast.show(
								$mdToast.simple()
									.textContent('Artista añadido correctamente!')
									.position('top right')
									.hideDelay(3000)
								);


							// cuando ha terminado el guardado del movimiento
							// es momento de pedir una actualización de datos
							//vm.nuevoMovimiento.importe = 0;
						}, function (error) {
							$mdToast.show(
								$mdToast.simple()
									.textContent('Error añadiendo el artista.')
									.position('top right')
									.hideDelay(3000)
								);
							console.error(error);
							//vm.nuevoMovimiento.importe = -9999;
						});				
				};
				
                vm.deleteSelectedArtist = function (artistId) {					
                   	vm.addArtistToEvent.$delete({ eventId: vm.eventId, artistId: artistId })
						.then(function (result) {
							artistsService.artistsByEvent.query({ id: vm.eventId }).$promise.then(function(data) {
								vm.artists = data;
							});
							$mdToast.show(
								$mdToast.simple()
									.textContent('Artista eliminado correctamente!')
									.position('top right')
									.hideDelay(3000)
								);
							// cuando ha terminado el guardado del movimiento
							// es momento de pedir una actualización de datos
							//vm.nuevoMovimiento.importe = 0;
						}, function (error) {
							$mdToast.show(
								$mdToast.simple()
									.textContent('Error eliminando el artista.')
									.position('top right')
									.hideDelay(3000)
								);
							console.error(error);
							//vm.nuevoMovimiento.importe = -9999;
						});				
				};


				vm.$onInit = function() {
      			};
			}
		})

}());