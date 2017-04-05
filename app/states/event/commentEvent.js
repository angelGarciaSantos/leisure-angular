(function () {

	angular.module('commentEvent', ['ui.router','services'])
		.config(function ($stateProvider) {
			$stateProvider
				.state('commentEvent', {
					url: '/commentEvent/:event/:user',
					template: '<comment-event></comment-event>'
				})
		})
		.component('commentEvent', {
			templateUrl: './states/event/commentEvent.html',
			controller: function (commentsService, $state, $stateParams) {
                var vm = this;
				vm.eventId = $stateParams.event;
				vm.userId = $stateParams.user;
                vm.newComment = new commentsService.commentEvent();             
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
			}
		})
}());