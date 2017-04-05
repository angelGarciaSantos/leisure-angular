(function () {

	angular.module('getAllUsers', ['ui.router','services', 'ngMaterial','ngAnimate','ngAria'])
		.config(function ($stateProvider) {
			$stateProvider
				.state('getAllUsers', {
					url: '/getAllUsers',
					template: '<get-all-users></get-all-users>'
				})
		})
		.component('getAllUsers', {
			templateUrl: './states/user/getAllUsers.html',
			controller: function (usersService,$state) {
                var vm = this;
				usersService.users.query().$promise.then(function(data) {
					vm.users = data;
				});

				vm.userDetails = function (id) {
					var params = { id: id };
					$state.go('getUser', params);
				}
			}
		})

}());