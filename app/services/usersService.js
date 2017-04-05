(function () {
	angular.module('services').service('usersService', usersService);

	function usersService($resource) {
		/**  Estamos devolviendo recursos, que internamente usan promesas */

		this.users = $resource(
            "http://localhost:8080/leisure/users/:id", // plantilla de la url del api
			{ id: '@id' }, // la plantilla se rellena con la propiedad id
			{ 'update': { method: 'PUT' } }// un método custom con el verobo put para actualizaciones
		); 
	};
} ());