(function () {

	angular.module('updateEvent', ['ui.router', 'services'])
		.config(function ($stateProvider) {
			$stateProvider
				.state('updateEvent', {
					url: '/updateEvent/:id',
					template: '<update-event></update-event>'
				})
		})
		.component('updateEvent', {
			templateUrl: './states/event/updateEvent.html',
			controller: function ($timeout, $scope, $mdDialog, eventsService, artistsService, localsService, $state, $stateParams, $mdToast) {
                var vm = this;
				
				vm.addArtistToEvent = new eventsService.addArtistToEvent();
				vm.modifyLocal = new eventsService.modifyLocalFromEvent();   
				
				vm.selectedArtist = -1;
				vm.selectedLocal = -1;
				$scope.selected = [];									

				vm.reloadAllLocals = function() {
					localsService.locals.query().$promise.then(function(data) {
						vm.allLocals = data;
					});
				}

				vm.reloadAllArtists = function () {
					artistsService.artists.query().$promise.then(function(data) {
						vm.allArtists = data;
					});
				}

				vm.reloadEventArtists = function () {
					artistsService.artistsByEvent.query({ id: vm.eventId }).$promise.then(function(data) {
						vm.artists = data;	
						artistsService.artistsByEvent.query({ id: vm.eventId }).$promise.then(function(data) {
							vm.artists = data;	
							artistsService.artistsByEvent.query({ id: vm.eventId }).$promise.then(function(data) {
								vm.artists = data;	
							});
						});
					});
				};
        
                vm.updateEvent = function () {
                    vm.editEvent.$update({ id: vm.eventId })
						.then(function (result) {
							vm.editEvent = eventsService.events.get({ id: vm.eventId });
						}, function (error) {
							console.error(error);
							//vm.nuevoMovimiento.importe = -9999;
						});
				};

				function changeSelectedArtist (id)  {
					vm.selectedArtist = id;
				}

                vm.addSelectedArtist = function () {
                   	vm.addArtistToEvent.$save({ eventId: vm.eventId, artistId: vm.selectedArtist })
						.then(function (result) {
							vm.reloadEventArtists();							
							$mdToast.show(
								$mdToast.simple()
									.textContent('Artista añadido correctamente!')
									.position('top right')
									.hideDelay(3000)
								);
							//$state.reload();	
							



							// cuando ha terminado el guardado del movimiento
							// es momento de pedir una actualización de datos
							//vm.nuevoMovimiento.importe = 0;
						}, function (error) {
							$mdToast.show(
								$mdToast.simple()
									.textContent('Error añadiendo el artista.')
									.position('top right')
									.hideDelay(3000)
								);
							console.error(error);
							//vm.nuevoMovimiento.importe = -9999;
						});				
				};

				vm.modifySelectedLocal = function () {
					vm.modifyLocal.$update({ eventId: vm.eventId, localId: vm.selectedLocal  })
						.then(function (result) {
							// cuando ha terminado el guardado del movimiento
							// es momento de pedir una actualización de datos
							//vm.nuevoMovimiento.importe = 0;
						}, function (error) {
							console.error(error);
							//vm.nuevoMovimiento.importe = -9999;
						});		
				};
				
                vm.deleteSelectedArtist = function (artistId) {					
                   	vm.addArtistToEvent.$delete({ eventId: vm.eventId, artistId: artistId })
						.then(function (result) {
							vm.reloadEventArtists();
							$mdToast.show(
								$mdToast.simple()
									.textContent('Artista eliminado correctamente!')
									.position('top right')
									.hideDelay(3000)
								);
							//$state.reload();	

							// cuando ha terminado el guardado del movimiento
							// es momento de pedir una actualización de datos
							//vm.nuevoMovimiento.importe = 0;
						}, function (error) {
							alert(error);
							$mdToast.show(
								$mdToast.simple()
									.textContent('Error eliminando el artista.')
									.position('top right')
									.hideDelay(3000)
								);
							console.error(error);
							//vm.nuevoMovimiento.importe = -9999;
						});				
				};


				vm.showPrompt = function(ev) {
					// // Appending dialog to document.body to cover sidenav in docs app
					// var confirm = $mdDialog.prompt()
					// .title('What would you name your dog?')
					// .textContent('Bowser is a common name.')
					// .placeholder('Dog name')
					// .ariaLabel('Dog name')
					// .initialValue('Buddy')
					// .targetEvent(ev)
					// .ok('Okay!')
					// .cancel('I\'m a cat person');

					// $mdDialog.show(confirm).then(function(result) {
					// $scope.status = 'You decided to name your dog ' + result + '.';
					// }, function() {
					// $scope.status = 'You didn\'t name your dog.';
					// });
					$mdDialog.show({
						clickOutsideToClose: true,

						scope: this,        // use parent scope in template
						preserveScope: true,  // do not forget this if use parent scope

						// Since GreetingController is instantiated with ControllerAs syntax
						// AND we are passing the parent '$scope' to the dialog, we MUST
						// use 'vm.<xxx>' in the template markup

						template: '<md-dialog>' +
									'  <md-dialog-content>' +
									'     Hi There {{vm.eventId}}' +
									'  </md-dialog-content>' +
									'</md-dialog>',

						controller: function DialogController($scope, $mdDialog) {
							$scope.closeDialog = function() {
							$mdDialog.hide();
							}
						}
					});
				};

				function showCustomGreeting(ev) {

					$mdDialog.show({
						clickOutsideToClose: true,

						scope: $scope,        // use parent scope in template
						preserveScope: true,  // do not forget this if use parent scope

						// Since GreetingController is instantiated with ControllerAs syntax
						// AND we are passing the parent '$scope' to the dialog, we MUST
						// use 'vm.<xxx>' in the template markup

						template: '<md-dialog>' +
									'  <md-dialog-content>' +
									'     Hi There {{vm.eventId}}' +
									'  </md-dialog-content>' +
									'</md-dialog>',

						controller: function DialogController($scope, $mdDialog) {
							$scope.closeDialog = function() {
							$mdDialog.hide();
							}
						}
					});
					};

					vm.greeting = 'Hello';
					vm.hideDialog = $mdDialog.hide;
					vm.showDialog = vm.showDialog;

					vm.showDialog = function(evt) {
						vm.dialogOpen = true;
						$mdDialog.show({
						targetEvent: evt,
						controller: function () { 
							this.parent = vm; 
							},
						controllerAs: 'ctrl',
						templateUrl: './states/event/manageArtistsDialog.html'
							// '<md-dialog>' +
							// '  <md-content>{{ctrl.parent.greeting}}, world !</md-content>' +
							// '  <div class="md-actions">' +
							// '    <md-button ng-click="ctrl.parent.dialogOpen=false;ctrl.parent.hideDialog()">' +
							// '      Close' +
							// '    </md-button>' +
							// '  </div>' +
							// '</md-dialog>'
						});
					}

					vm.modifyLocalDialog = function(evt) {
					vm.dialogOpen = true;
					$mdDialog.show({
						targetEvent: evt,
						controller: function () { 
							this.parent = vm; 
							},
						controllerAs: 'ctrl',
						templateUrl: './states/event/manageLocalDialog.html'
							// '<md-dialog>' +
							// '  <md-content>{{ctrl.parent.greeting}}, world !</md-content>' +
							// '  <div class="md-actions">' +
							// '    <md-button ng-click="ctrl.parent.dialogOpen=false;ctrl.parent.hideDialog()">' +
							// '      Close' +
							// '    </md-button>' +
							// '  </div>' +
							// '</md-dialog>'
						});
					}

					vm.$onInit = function() {
						vm.eventId = $stateParams.id;
						vm.editEvent = eventsService.events.get({ id: vm.eventId });			
						vm.reloadEventArtists();
						vm.reloadAllArtists();
						vm.reloadAllLocals();
					};
			}
		})

}());