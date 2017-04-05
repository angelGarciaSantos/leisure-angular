(function () {

	angular.module('home', ['ui.router','ngMaterial','ngAnimate','ngAria'])
		.config(function ($stateProvider) {
			$stateProvider
				.state('home', {
					url: '/',
					template: '<home></home>'
				})
		})
		.component('home', {
			templateUrl: './states/home/home.html',
			controller: function ($state) {
                var vm = this;
			}
		})

}());