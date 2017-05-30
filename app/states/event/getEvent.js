(function () {

	angular.module('getEvent', ['services'])
		.config(function ($stateProvider) {
			$stateProvider
				.state('getEvent', {
					url: '/getEvent/:id',
					template: '<get-event></get-event>'
				})
		})
		.component('getEvent', {
			templateUrl: './states/event/getEvent.html',
			controller: function (eventsService, commentsService, ratingsService, $state, $stateParams, $mdDialog) {
                var vm = this;
                vm.hideDialog = $mdDialog.hide;

				vm.userId = 1; //TODO: cambiarlo al poner autenticacion
                vm.eventId = $stateParams.id;
                vm.event = eventsService.events.get({ id: vm.eventId }); //TODO: poner con then y cargar el resto dentro, coments y ratings
				vm.newRating = new ratingsService.rateEvent();  
				vm.newComment = new commentsService.commentEvent();  
				
				vm.deleteEvent = function () {
					vm.event.$delete({ id: vm.eventId })
						.then(function (result) {
							$state.go('getAllEvents');
						}, function (error) {
							console.error(error);
						});
				}

				commentsService.commentsByEvent.query({ id: vm.eventId }).$promise.then(function(data) {
					vm.comments = data;
				});

				//vm.globalRating = ratingsService.globalRating.get({ id: vm.eventId });


				ratingsService.ratingsByEvent.query({ id: vm.eventId }).$promise.then(function(data) {
					vm.ratings = data;
				});

				ratingsService.globalRatingEvent.query({ id: vm.eventId }).$promise.then(function(data) {
					vm.globalRating = data;
				});

				// vm.commentEvent = function () {
				// 	var params = { event: vm.eventId, user: 1 };
				// 	$state.go('commentEvent', params);
				// };
           
                vm.commentEvent = function () {
					//vm.nuevoMovimiento.fecha = new Date(vm.nuevoMovimiento.fecha);              
                    vm.newComment.$save({ eventId: vm.eventId, userId: vm.userId })
						.then(function (result) {
							// cuando ha terminado el guardado del movimiento
							// es momento de pedir una actualización de datos
							//vm.nuevoMovimiento.importe = 0;
						}, function (error) {
							console.error(error);
							//vm.nuevoMovimiento.importe = -9999;
						});
				};

				
				//vm.showDialog = vm.showDialog;
				vm.commentEventDialog = function(evt) {
					vm.dialogOpen = true;
					$mdDialog.show({
						targetEvent: evt,
						controller: function () { 
							this.parent = vm; 
						},
						controllerAs: 'ctrl',
						templateUrl: './states/event/commentEventDialog.html'
					});
				}

				// vm.rateEvent = function () {
				// 	//CAMBIAR AL ESTADO COMMENTEVENT PASANDOLE EL eventId y userId
				// 	var params = { event: vm.eventId, user: 1 };
				// 	$state.go('rateEvent', params);
				// };

				           
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

				vm.rateEventDialog = function(evt) {
					vm.dialogOpen = true;
					$mdDialog.show({
						targetEvent: evt,
						controller: function () { 
							this.parent = vm; 
						},
						controllerAs: 'ctrl',
						templateUrl: './states/event/rateEventDialog.html'
					});
				}

				

			}
		})

}());