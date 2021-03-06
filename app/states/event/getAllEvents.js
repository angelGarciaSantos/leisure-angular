(function () {

	angular.module('getAllEvents', ['ui.router','services', 'ngMaterial','ngAnimate','ngAria'])
		.config(function ($stateProvider) {
			$stateProvider
				.state('getAllEvents', {
					url: '/getAllEvents',
					template: '<get-all-events></get-all-events>'
				})
		})
		.component('getAllEvents', {
			templateUrl: './states/event/getAllEvents.html',
			controller: function (eventsService,$state) {
                var vm = this;
				vm.keywords = "";

				vm.searchEvents = function () {
					if (vm.keywords && !(vm.keywords === "")) {
						eventsService.eventsByKeywords.query({ keywords: vm.keywords}).$promise.then(function(data) {
							vm.events = data;
						});
					}
					else {
						vm.reloadAllEvents();
					}
				};

				vm.reloadAllEvents = function() {
					eventsService.events.query().$promise.then(function(data) {
						vm.events = data;
					});
				}

				vm.eventDetails = function (id) {
					var params = { id: id };
					$state.go('getEvent', params);
				}

				vm.$onInit = function() {
					vm.reloadAllEvents();
				};





			}
		})

}());