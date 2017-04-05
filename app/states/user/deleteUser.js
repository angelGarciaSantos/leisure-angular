(function () {

	angular.module('deleteUser', ['ui.router', 'services'])
		.config(function ($stateProvider) {
			$stateProvider
				.state('deleteUser', {
					url: '/deleteUser/:id',
					template: '<delete-user></delete-user>'
				})
		})
		.component('deleteUser', {
			templateUrl: './states/user/deleteUser.html',
			controller: function (usersService, $state, $stateParams) {
                var vm = this;
                this.valorCorte = 1;
                var userId = $stateParams.id;
                vm.user = usersService.users.get({ id: userId });
      
				vm.user.$delete({ id: userId })
					.then(function (result) {

					}, function (error) {
						console.error(error);
					});

			}
		})

}());