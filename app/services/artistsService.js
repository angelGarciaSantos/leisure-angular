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
		
		this.artistsByEvent = $resource(
            "http://localhost:8080/leisure/artists/event/:id", // plantilla de la url del api
			{ id: '@id' }, // la plantilla se rellena con la propiedad id
			{ 'update': { method: 'PUT' } }// un método custom con el verobo put para actualizaciones
		); 

		this.followArtist = $resource(
            "http://localhost:8080/leisure/artist/user/:artistId/:userId", // plantilla de la url del api
			{ artistId: '@artistId', userId:'@userId' }, // la plantilla se rellena con la propiedad id
			{ 'update': { method: 'PUT' } }// un método custom con el verobo put para actualizaciones
		); 
	};
} ());