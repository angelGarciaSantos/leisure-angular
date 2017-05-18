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
				vm.keywords = "";
				usersService.users.query().$promise.then(function(data) {
					vm.users = data;
				});

				vm.searchUsers = function () {
					if (vm.keywords && !(vm.keywords === "")) {
						usersService.usersByKeywords.query({ keywords: vm.keywords}).$promise.then(function(data) {
							vm.users = data;
						});
					}
					else {
						usersService.users.query().$promise.then(function(data) {
							vm.users = data;
						});
					}
				};

				vm.userDetails = function (id) {
					var params = { id: id };
					$state.go('getUser', params);
				}
			}
		})

}());