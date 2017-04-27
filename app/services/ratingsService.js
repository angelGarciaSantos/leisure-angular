(function () {
	angular.module('services').service('ratingsService', ratingsService);

	function ratingsService($resource) {
		/**  Estamos devolviendo recursos, que internamente usan promesas */

		this.ratings = $resource(
            "http://localhost:8080/leisure/ratings/:id", // plantilla de la url del api
			{ id: '@id' }, // la plantilla se rellena con la propiedad id
			{ 'update': { method: 'PUT' } }// un método custom con el verobo put para actualizaciones
		); 

        this.ratingsByEvent = $resource(
            "http://localhost:8080/leisure/ratings/event/:id", // plantilla de la url del api
			{ id: '@id' }, // la plantilla se rellena con la propiedad id
			{ 'update': { method: 'PUT' } }// un método custom con el verobo put para actualizaciones
		); 

		this.rateEvent = $resource(
            "http://localhost:8080/leisure/ratings/:eventId/:userId", // plantilla de la url del api
			{ eventId: '@eventId',userId: '@userId' }, // la plantilla se rellena con la propiedad id
			{ 'update': { method: 'PUT' } }// un método custom con el verobo put para actualizaciones
		); 

		this.globalRatingEvent = $resource(
            "http://localhost:8080/leisure/rating/event/:id", // plantilla de la url del api
			{ id: '@id' }, // la plantilla se rellena con la propiedad id
			{ 'update': { method: 'PUT' } }// un método custom con el verobo put para actualizaciones
		); 

		this.globalRatingArtist = $resource(
            "http://localhost:8080/leisure/rating/artist/:id", // plantilla de la url del api
			{ id: '@id' }, // la plantilla se rellena con la propiedad id
			{ 'update': { method: 'PUT' } }// un método custom con el verobo put para actualizaciones
		); 

	};
} ());