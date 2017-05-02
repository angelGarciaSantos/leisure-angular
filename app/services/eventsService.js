(function () {
	angular.module('services').service('eventsService', eventsService);

	function eventsService($resource) {
		/**  Estamos devolviendo recursos, que internamente usan promesas */

		this.events = $resource(
            "http://localhost:8080/leisure/events/:id", // plantilla de la url del api
			{ id: '@id' }, // la plantilla se rellena con la propiedad id
			{ 'update': { method: 'PUT' } }// un método custom con el verobo put para actualizaciones
		); 

		this.addArtistToEvent = $resource(
            "http://localhost:8080/leisure/events/artist/:eventId/:artistId", // plantilla de la url del api
			{ eventId: '@eventId', artistId: '@artistId' }, // la plantilla se rellena con la propiedad id
			{ 'update': { method: 'PUT' } }// un método custom con el verobo put para actualizaciones
		); 

	};
} ());