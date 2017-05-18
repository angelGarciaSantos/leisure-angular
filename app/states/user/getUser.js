(function () {

	angular.module('getUser', ['services'])
		.config(function ($stateProvider) {
			$stateProvider
				.state('getUser', {
					url: '/getUser/:id',
					template: '<get-user></get-user>'
				})
		})
		.component('getUser', {
			templateUrl: './states/user/getUser.html',
			controller: function (usersService, $state, $stateParams) {
                var vm = this;
                this.valorCorte = 1;

                vm.userId = $stateParams.id;
                vm.user = usersService.users.get({ id: vm.userId });

				vm.deleteUser = function() {
					vm.user.$delete({ id: vm.userId })
						.then(function (result) {

						}, function (error) {
							console.error(error);
						});
				}

			}
		})

}());