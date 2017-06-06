(function () {

	angular.module('home', ['ui.router','ngMaterial','ngAnimate','ngAria'])
		.config(function ($stateProvider) {
			$stateProvider
				.state('home', {
					url: '/',
					template: '<home></home>'
				})
		})
		.component('home', {
			templateUrl: './states/home/home.html',
			controller: function ($state, interestsService, artistsService, eventsService) {
                var vm = this;
				//TODO: de momento userId va forzado a 1.
				artistsService.recommendedArtists.query({id: 1}).$promise.then(function(data) {
					vm.recommendedArtists = data;
				});

				//TODO: de momento userId va forzado a 1.
				eventsService.recommendedEvents.query({id: 1}).$promise.then(function(data) {
					vm.recommendedEvents = data;
				});

				vm.artistDetails = function (id) {
					var params = { id: id };
					$state.go('getArtist', params);
				};

				vm.eventDetails = function (id) {
					var params = { id: id };
					$state.go('getEvent', params);
				};


				// function sortFunction(a, b) {
				// 	if (a[1] === b[1]) {
				// 		return 0;
				// 	}
				// 	else {
				// 		return (a[1] > b[1]) ? -1 : 1;
				// 	}
				// }



				// //TODO: en lugar de forzar el 1 recuperar el id del usuario actual.
				// interestsService.interestsByUser.query({id: 1}).$promise.then(function(data) {
				// 	vm.interests = data;

				// 	vm.tagsPoints = [];
				// 	for (i=0;i<vm.interests.length;i++) {
				// 		vm.tagsPoints.push([vm.interests[i].tag.id,vm.interests[i].points]);
				// 	}
				// 	vm.tagsPoints.sort(sortFunction);
					
				// 	artistsService.artists.query().$promise.then(function(data2) {
				// 		vm.allArtists = data2;
				// 		//falta rellenar artistas points y luego sumarle
				// 		vm.artistsPoints = [];
				// 		for (i=0;i<vm.allArtists.length;i++){
				// 			//por cada tag del artista buscar en tagsPoints el id y 
				// 			//sumar esos points a una variable, luego pasarla
				// 			//a artistsPoints
				// 			var sum = 0;
				// 			for(j=0;j<vm.allArtists[i].tags.length;j++){
				// 				for(k=0;k<vm.tagsPoints.length;k++){
				// 					if(vm.tagsPoints[k][0] == vm.allArtists[i].tags[j].id){
				// 						sum += vm.tagsPoints[k][1];
				// 					}
				// 				}
				// 			}
				// 			vm.artistsPoints.push([vm.allArtists[i].id, sum]);
				// 		}
				// 		var prueba = vm.artistsPoints;
				// 		vm.artistsPoints.sort(sortFunction);

				// 		//Ahora ya tenemos los artistas recomendados (los ids).
				// 		//Los recuperamos uno a uno y los mostramos en una lista.
				// 		vm.recomendedArtists = [];
				// 		for (i=0;i<vm.artistsPoints.length;i++) {
				// 			artistsService.artists.get({id: vm.artistsPoints[i][0]}).$promise.then(function(data) {
				// 				vm.recomendedArtists.push(data)
				// 			});
				// 		}
				// 	});



				// });









			}
		})

}());