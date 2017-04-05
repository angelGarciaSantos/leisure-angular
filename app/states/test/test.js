(function () {

	angular.module('test', ['ui.router','ngMaterial','ngAnimate','ngAria'])
		.config(function ($stateProvider) {
			$stateProvider
				.state('test', {
					url: '/test',
					template: '<test></test>'
				})
		})
		.component('test', {
			templateUrl: './states/test/test.html',
			controller: function () {
                var vm = this;
                

			}
		})

}());