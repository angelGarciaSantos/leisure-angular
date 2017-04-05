(function () {
	angular.module('services').service('artistsService', artistsService);

	function artistsService($resource) {
		/**  Estamos devolviendo recursos, que internamente usan promesas */

		this.artists = $resource(
            "http://localhost:8080/leisure/artists/:id", // plantilla de la url del api
			{ id: '@id' }, // la plantilla se rellena con la propiedad id
			{ 'update': { method: 'PUT' } }// un método custom con el verobo put para actualizaciones
		); 
		
		//this.total = $resource("/api/priv/movimientos/totales/");

	};
} ());