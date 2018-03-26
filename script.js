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
        // Putting these variables into the camera's dataset
        targetEl.dataset.isZoomed = false;
        targetEl.dataset.zoomInCounter = 0;

        el.addEventListener(data.on, function () {
            // Ignore zooming in if already zoomed or has reached the max counter
            if(targetEl.dataset.isZoomed === "true") {
                return;
            }
            if(targetEl.dataset.zoomInCounter > 2){
                return;
            }
            targetEl.dataset.zoomInCounter++;
            targetEl.dataset.isZoomed = true;
            targetEl.setAttribute('fov', 30);
            setTimeout(function () {
                // Set image.
                targetEl.setAttribute('fov', 80);
                targetEl.dataset.isZoomed = false;
            }, data.dur);
        });
    },
});