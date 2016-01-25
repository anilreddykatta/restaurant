//@popover  rules for different modules
//@datepickerPopupDirective directive to allow masking for  date picker Angular-UI

var app = angular.module ( 'Alacarte.food' );

app.directive ( 'cataloghelppopover', function ( $compile, $templateCache, $q, $http ) {

	var getTemplate = function ( contentType ) {
		var def = $q.defer ();

		var template = '';
		switch ( contentType ) {
			case 'user':
				template = $templateCache.get ( "app/shared/js/directive/cataloghelppopover.html" );
				if ( typeof template === "undefined" ) {
					$http.get ( "app/shared/js/directive/cataloghelppopover.html" )
						.success ( function ( data ) {
							$templateCache.put ( "app/shared/js/directive/cataloghelppopover.html", data );
							def.resolve ( data );
						} );
				} else {
					def.resolve ( template );
				}
				break;
		}
		return def.promise;
	}
	return {
		restrict: "A",
		replace: true,
		scope: { title: "@", content: "@", placement: "@", animation: "&", isOpen: "&" },
		link: function ( scope, element, attrs ) {
			getTemplate ( "user" ).then ( function ( popOverContent ) {
				var options = {
					content: popOverContent,
					placement: "bottom",
					html: true,
					template: '<div class="popover catalog-popover-help"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
					date: scope.date
				};
				$ ( element ).popover ( options );
			} );
		}
	};
} );


app.directive ( 'finderhelppopover', function ( $compile, $templateCache, $q, $http ) {

	var getTemplate = function ( contentType ) {
		var def = $q.defer ();

		var template = '';
		switch ( contentType ) {
			case 'user':
				template = $templateCache.get ( "app/shared/js/directive/finderhelppopover.html" );
				if ( typeof template === "undefined" ) {
					$http.get ( "app/shared/js/directive/finderhelppopover.html" )
						.success ( function ( data ) {
							$templateCache.put ( "app/shared/js/directive/finderhelppopover.html", data );
							def.resolve ( data );
						} );
				} else {
					def.resolve ( template );
				}
				break;
		}
		return def.promise;
	}
	return {
		restrict: "A",
		replace: true,
		scope: { title: "@", content: "@", placement: "@", animation: "&", isOpen: "&" },
		link: function ( scope, element, attrs ) {
			getTemplate ( "user" ).then ( function ( popOverContent ) {
				var options = {
					content: popOverContent,
					placement: "bottom",
					html: true,
					template: '<div class="popover visible-lg visible-md finder-popover-help"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
					date: scope.date
				};
				$ ( element ).popover ( options );
			} );
		}
	};
} );


app.directive ( 'applicationhelppopover', function ( $compile, $templateCache, $q, $http ) {

	var getTemplate = function ( contentType ) {
		var def = $q.defer ();

		var template = '';
		switch ( contentType ) {
			case 'user':
				template = $templateCache.get ( "app/shared/js/directive/applicationhelppopover.html" );
				if ( typeof template === "undefined" ) {
					$http.get ( "app/shared/js/directive/applicationhelppopover.html" )
						.success ( function ( data ) {
							$templateCache.put ( "app/shared/js/directive/applicationhelppopover.html", data );
							def.resolve ( data );
						} );
				} else {
					def.resolve ( template );
				}
				break;
		}
		return def.promise;
	}
	return {
		restrict: "A",
		replace: true,
		scope: { title: "@", content: "@", placement: "@", animation: "&", isOpen: "&" },
		link: function ( scope, element, attrs ) {
			getTemplate ( "user" ).then ( function ( popOverContent ) {
				var options = {
					content: popOverContent,
					placement: "bottom",
					html: true,
					template: '<div class="popover visible-lg visible-md application-popover-help"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
					date: scope.date
				};
				$ ( element ).popover ( options );
			} );
		}
	};
} );


app.directive ( 'profilepopover', function ( $compile, $templateCache, $q, $http ) {

	var getTemplate = function ( contentType ) {
		var def = $q.defer ();

		var template = '';
		switch ( contentType ) {
			case 'user':
				template = $templateCache.get ( "app/shared/js/directive/popover.html" );
				if ( typeof template === "undefined" ) {
					$http.get ( "app/shared/js/directive/popover.html" )
						.success ( function ( data ) {
							$templateCache.put ( "app/shared/js/directive/popover.html", data );
							def.resolve ( data );
						} );
				} else {
					def.resolve ( template );
				}
				break;
		}
		return def.promise;
	}
	return {
		restrict: "A",
		replace: true,
		scope: { title: "@", lang: "@", content: "@", placement: "@", animation: "&", isOpen: "&" },
		link: function ( scope, element, attrs ) {
			getTemplate ( "user" ).then ( function ( popOverContent ) {
				var options = {
					content: $compile ( "<div>" + popOverContent + "</div>" ) ( scope ),
					placement: "bottom",
					html: true,
					template: '<div  class="popover  visible-lg visible-md custom-popover" ><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
					date: scope.date
				};
				$ ( element ).popover ( options );
			} );
		}
	};
} );


app.directive ( 'customtooltip', function () {
	return {
		restrict: 'A',
		link: function ( scope, element, attrs ) {
			$ ( element ).hover ( function () {
				// on mouseenter
				$ ( element ).tooltip ( 'show' );
			}, function () {
				// on mouseleave
				$ ( element ).tooltip ( 'hide' );
			} );
		}
	};
} );

app.directive ( 'datepickertpattern', function () {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function ( scope, elem, attrs, ngModelCtrl ) {
			var dRegex = new RegExp ( attrs.datepickertpattern );

			ngModelCtrl.$parsers.unshift ( function ( value ) {

				if ( typeof value === 'string' ) {
					var isValid = dRegex.test ( value );
					ngModelCtrl.$setValidity ( attrs.id, isValid );
					if ( ! isValid ) {
						return undefined;
					}
				}

				return value;
			} );

		}
	};
} );

