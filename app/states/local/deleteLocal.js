(function () {

	angular.module('deleteLocal', ['ui.router', 'services'])
		.config(function ($stateProvider) {
			$stateProvider
				.state('deleteLocal', {
					url: '/deleteLocal/:id',
					template: '<delete-local></delete-local>'
				})
		})
		.component('deleteLocal', {
			templateUrl: './states/local/deleteLocal.html',
			controller: function (localsService, $state, $stateParams) {
                var vm = this;
                this.valorCorte = 1;
                var localId = $stateParams.id;
                vm.local = localsService.locals.get({ id: localId });
      
				vm.local.$delete({ id: localId })
					.then(function (result) {
						$state.go('getAllLocals');
					}, function (error) {
						console.error(error);
					});

			}
		})

}());