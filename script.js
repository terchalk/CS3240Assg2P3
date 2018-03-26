/* global AFRAME */

/**
 * Component that listens to an event on the object and zooms into it
 */
AFRAME.registerComponent('zoom-in', {
    schema: {
        on: { type: 'string' },
        target: { type: 'selector' }, // the camera
        dur: { type: 'number', default: 300 } // zoom duration
    },

    init: function () {
        var data = this.data;
        var targetEl = this.data.target;
        var el = this.el;

        el.addEventListener(data.on, function () {
            // targetEl.setAttribute('zoom', 1.5);
            targetEl.setAttribute('fov', 40);
            // Wait for fade to complete.
            setTimeout(function () {
                // Set image.
                // targetEl.setAttribute('zoom', 1);
                targetEl.setAttribute('fov', 80);
            }, data.dur);
        });
    },
});