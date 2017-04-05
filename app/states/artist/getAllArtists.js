(function () {

	angular.module('getAllArtists', ['ui.router','services', 'ngMaterial','ngAnimate','ngAria'])
		.config(function ($stateProvider) {
			$stateProvider
				.state('getAllArtists', {
					url: '/getAllArtists',
					template: '<get-all-artists></get-all-artists>'
				})
		})
		.component('getAllArtists', {
			templateUrl: './states/artist/getAllArtists.html',
			controller: function (artistsService,$state) {
                var vm = this;
                this.valorCorte = 1;
				/*
				movimientosService.gettingMovimientos()
					.success(function (result) {
						vm.movimientos = result;
					})
				*/

 				// scope.user = User.get( {username: 'bob'}  );    // GET
				
				// User.get( {username: 'bob'} ).$promise.then(function(data) {
				// 	scope.user = data.toJSON();
				// });


				//vm.artists = artistsService.artists.query();

				artistsService.artists.query().$promise.then(function(data) {
					vm.artists = data;
				});

				vm.artistDetails = function (id) {
					var params = { id: id };
					$state.go('getArtist', params);
				}


			}
		})

}());