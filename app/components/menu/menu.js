(function () {
	angular.module('menu', ['ui.router','services', 'ngMaterial','ngAnimate','ngAria'])
		.component('menu', {
			templateUrl: './components/menu/menu.html',
			controller: function ($timeout, $mdSidenav) {
                var vm = this;
				vm.toggleLeft = buildToggler('left');
				vm.toggleRight = buildToggler('right');

				 function buildToggler (componentId) {
					return function() {
						$mdSidenav(componentId).toggle();
					};
				}
			}
		})

}());