(function () {

	angular.module('deleteEvent', ['ui.router', 'services'])
		.config(function ($stateProvider) {
			$stateProvider
				.state('deleteEvent', {
					url: '/deleteEvent/:id',
					template: '<delete-event></delete-event>'
				})
		})
		.component('deleteEvent', {
			templateUrl: './states/event/deleteEvent.html',
			controller: function (eventsService, $state, $stateParams) {
                var vm = this;
                this.valorCorte = 1;
                var eventId = $stateParams.id;
                vm.event = eventsService.events.get({ id: eventId });
      
				vm.event.$delete({ id: eventId })
					.then(function (result) {

					}, function (error) {
						console.error(error);
					});

			}
		})

}());