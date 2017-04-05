(function () {

	angular.module('createUser', ['ui.router','services'])
		.config(function ($stateProvider) {
			$stateProvider
				.state('createUser', {
					url: '/createUser',
					template: '<create-user></create-user>'
				})
		})
		.component('createUser', {
			templateUrl: './states/user/createUser.html',
			controller: function (usersService) {
                var vm = this;
                vm.newUser = new usersService.users();             
                vm.createUser = function () {
					//vm.nuevoMovimiento.fecha = new Date(vm.nuevoMovimiento.fecha);              
                    vm.newUser.$save()
						.then(function (result) {
							// cuando ha terminado el guardado del movimiento
							// es momento de pedir una actualización de datos
							//vm.nuevoMovimiento.importe = 0;
						}, function (error) {
							console.error(error);
							//vm.nuevoMovimiento.importe = -9999;
						});
				};
			}
		})
}());