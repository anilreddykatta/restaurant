/*
 * Copyright (c) Optum 2015 - All Rights Reserved.
 */
var supportedBrowsers = {
	'Internet Explorer': [ 9, 10, 11 ],
	'Chrome': 39,
	'Firefox': 35,
	'iPhone': [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
	'iPad': [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
	'Safari': 4
};
var unsupportedBrowsers = {
	'Internet Explorer': [ 4, 5, 6, 7, 8 ]
};
var contextPath = window.location.pathname.substring ( 0,
	window.location.pathname.indexOf ( "/", 2 ) );

checkBrowserForSupport ();

function checkBrowserForSupport () {
	if ( bowser ) {
		var unsupported = unsupportedBrowsers[ bowser.name ];
		var supported = supportedBrowsers[ bowser.name ];
		var version = parseFloat ( bowser.version );

		if ( unsupported != undefined ) {
			if ( isArray ( unsupported ) ) {
				if ( include ( unsupported, version ) ) {
					window.location = contextPath
						+ "/app/shared/html/unsupportedBrowser.html";
					return;
				}
			} else {
				if ( version <= unsupported ) {
					window.location = contextPath
						+ "/app/shared/html/unsupportedBrowser.html";
					return;
				}// if
			}// else
		}

		if ( supported == undefined ) {
			window.location = contextPath
				+ "/app/shared/html/unsupportedBrowser.html";
			return;
		} else {
			if ( readCookie ( "hideBrowserDetectionMessage" ) != 'true' ) {
				if ( isArray ( supported ) ) {
					if ( ! include ( supported, version ) ) {
						if ( version < getMin ( supported ) ) {
							window.onload = function () {
								var scope = angular
									.element (
										document
											.getElementsByClassName ( 'uitk-lightbox' )[ 0 ] )
									.isolateScope ();
								scope.$apply ( function () {
									scope.show = true;
								} );
							}
							return;
						}
						if ( version > getMax ( supported ) ) {
							window.onload = function () {
								var scope = angular
									.element (
										document
											.getElementsByClassName ( 'uitk-lightbox' )[ 0 ] )
									.isolateScope ();
								scope.$apply ( function () {
									scope.show = true;
								} );
							}
							return;
						}
					}
				} else {
					if ( version < supported ) {
						window.onload = function () {
							var scope = angular
								.element (
									document
										.getElementsByClassName ( 'uitk-lightbox' )[ 0 ] )
								.isolateScope ();
							scope.$apply ( function () {
								scope.show = true;
							} );
						}
						return;
					}
					if ( version > supported ) {
						window.onload = function () {
							var scope = angular
								.element (
									document
										.getElementsByClassName ( 'uitk-lightbox' )[ 0 ] )
								.isolateScope ();
							scope.$apply ( function () {
								scope.show = true;
							} );
						}
						return;
					}
				}// else
			}// cookie != true
		}// else
	}// main if
}

function readCookie ( name ) {
	var nameEQ = name + "=";
	var ca = document.cookie.split ( ';' );
	for ( var i = 0; i < ca.length; i ++ ) {
		var c = ca[ i ];
		while ( c.charAt ( 0 ) == ' ' )
			c = c.substring ( 1, c.length );
		if ( c.indexOf ( nameEQ ) == 0 )
			return c.substring ( nameEQ.length, c.length );
	}
	return null;
}

function isArray ( arr ) {
	return arr.constructor.toString ().indexOf ( "Array" ) > - 1;
}

function include ( arr, obj ) {
	for ( var i = 0; i < arr.length; i ++ ) {
		if ( arr[ i ] == obj )
			return true;
	}
}

function getMax ( arr ) {
	var max = arr[ 0 ];
	for ( var i = 1; i < arr.length; i ++ ) {
		if ( arr[ i ] > max )
			max = arr[ i ];
	}
	return max;
}

function getMin ( arr ) {
	var min = arr[ 0 ];
	for ( var i = 1; i < arr.length; i ++ ) {
		if ( arr[ i ] < min )
			min = arr[ i ];
	}
	return min;
}
