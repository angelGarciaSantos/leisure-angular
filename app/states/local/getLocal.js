(function () {

	angular.module('getLocal', ['services'])
		.config(function ($stateProvider) {
			$stateProvider
				.state('getLocal', {
					url: '/getLocal/:id',
					template: '<get-local></get-local>'
				})
		})
		.component('getLocal', {
			templateUrl: './states/local/getLocal.html',
			controller: function (localsService, $state, $stateParams) {
                var vm = this;
                this.valorCorte = 1;

                var localId = $stateParams.id;
                vm.local = localsService.locals.get({ id: localId });
			}
		})

}());