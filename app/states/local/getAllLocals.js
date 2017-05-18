(function () {

	angular.module('getAllLocals', ['ui.router','services', 'ngMaterial','ngAnimate','ngAria'])
		.config(function ($stateProvider) {
			$stateProvider
				.state('getAllLocals', {
					url: '/getAllLocals',
					template: '<get-all-locals></get-all-locals>'
				})
		})
		.component('getAllLocals', {
			templateUrl: './states/local/getAllLocals.html',
			controller: function (localsService,$state) {
                var vm = this;
				vm.keywords = "";
				localsService.locals.query().$promise.then(function(data) {
					vm.locals = data;
				});

				vm.searchLocals = function () {
					if (vm.keywords && !(vm.keywords === "")) {
						localsService.localsByKeywords.query({ keywords: vm.keywords}).$promise.then(function(data) {
							vm.locals = data;
						});
					}
					else {
						localsService.locals.query().$promise.then(function(data) {
							vm.locals = data;
						});
					}
				};

				vm.localDetails = function (id) {
					var params = { id: id };
					$state.go('getLocal', params);
				}
			}
		})

}());