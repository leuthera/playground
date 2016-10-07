/*global window, window.RUM */

(function ( window ) {
    'use strict';

    var app = {
        init: function () {
            var processor = app.attrReader( 'RUMprocessor' );
            app.process( app.data(), processor );
        },

        attrReader: function ( name ) {
            var attr = 'data-' + name,
                node = document.querySelector( 'script[' + attr + ']');

            return node ? node.getAttribute( attr ) : '';
        },

        performanceAPI: function () {
            var performance,
                browserImplementation = [ 'performance', 'webkitPerformance', 'mozPerformance', 'msPerformance' ];

            browserImplementation.forEach(function ( value ) {
                if ( window[ value ] ) performance = window[ value ];
            });

            return performance;
        },

        pageInfo: function () {
            return {
                host : window.location.host,
                id   : app.attrReader( 'RUMid' )
            };
        },

        timeline: function ( API ) {
            var timing = API.timing,
                times  = {};

            times.loadTime         = timing.loadEventEnd - timing.fetchStart;
            times.domReadyTime     = timing.domComplete  - timing.domInteractive;
            times.domContentLoaded = times.loadTime      - times.domReadyTime;

            return times;
        },

        resources: function ( API ) {
            return API.getEntries().map(function ( value ) {
                return {
                    name      : value.name,
                    duration  : value.duration,
                    initiator : value.initiatorType
                };
            });
        },

        data: function () {
            var performance = app.performanceAPI();
            if ( ! performance ) return {};

            return {
                page      : app.pageInfo( performance ),
                times     : app.timeline( performance ),
                resources : app.resources( performance )
            };
        },

        process: function ( data, processor ) {
            if ( ! processor ) return;

            if ( typeof window[ processor ] === 'function' ) {
                window[ processor ]( data );
            }
            else if ( typeof processor === 'string' && processor.match(/^http(s)?:/) ) {
                var xhr = new XMLHttpRequest();

                xhr.open( 'POST', processor );
                xhr.setRequestHeader( 'Content-Type', 'application/json');
                xhr.send( JSON.stringify( data ) );
            }
        }
    };

    window.RUM = app;
    window.addEventListener('load', function () {
        // trigger delayed execution to gather cruical data
        return window.setTimeout(window.RUM.init, 100);
    }, false);
}( window ));
