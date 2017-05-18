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
			controller: function (eventsService, commentsService, ratingsService, $state, $stateParams) {
                var vm = this;
                this.valorCorte = 1;

                vm.eventId = $stateParams.id;
                vm.event = eventsService.events.get({ id: vm.eventId });
				
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

				vm.commentEvent = function () {
					var params = { event: vm.eventId, user: 1 };
					$state.go('commentEvent', params);
				};

				vm.rateEvent = function () {
					//CAMBIAR AL ESTADO COMMENTEVENT PASANDOLE EL eventId y userId
					var params = { event: vm.eventId, user: 1 };
					$state.go('rateEvent', params);
				};


			}
		})

}());