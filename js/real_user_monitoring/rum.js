/*global window, window.RUMpageId, window.RUMcollectedData, window.RUMsendDataTo */

(function ( window ) {
    function RUM() {
        'use strict';

        var performance,
            browserImplementation = [ 'performance', 'webkitPerformance', 'mozPerformance', 'msPerformance' ];

        browserImplementation.forEach(function ( value ) {
            if ( window[ value ] ) performance = window[ value ];
        });

        if ( ! performance ) return;

        // page
        var pageId = window.RUMpageId,
            uri    = {
                host : location.host,
                id   : pageId
            };

        // timeline
        var timing = performance.timing,
            times  = {};

        times.loadTime         = timing.loadEventEnd - timing.fetchStart;
        times.domReadyTime     = timing.domComplete  - timing.domInteractive;
        times.domContentLoaded = times.loadTime      - times.domReadyTime;

        // resources
        var resources = [];
        window.performance.getEntries().forEach(function ( value ) {
            resources.push({
                name      : value.name,
                duration  : value.duration,
                initiator : value.initiatorType
            });
        });

        // data
        var data = {
            uri       : uri,
            times     : times,
            resources : resources
        };

        window.RUMcollectedData = data;

        // send data
        if ( window.RUMsendDataTo ) {
            if ( typeof window.RUMsendDataTo === 'function' ) {
                window.RUMsendDataTo( data );
            }
            else {
                var xhr = new XMLHttpRequest();
                xhr.open( 'POST', window.RUMsendDataTo );
                xhr.setRequestHeader( 'Content-Type', 'application/json');
                xhr.send( JSON.stringify( data ) );
            }
        }
    }

    // trigger delayed execution
    window.addEventListener('load', function () {
        return window.setTimeout(RUM, 100);
    }, false);
}( window ));
