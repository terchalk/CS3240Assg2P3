/* global AFRAME */

/**
 * Component that listens to an event on the object and zooms into it
 */
AFRAME.registerComponent('zoom-in', {
    schema: {
        on: { type: 'string' },
        target: { type: 'selector' }, // the camera
        dur: { type: 'number', default: 300 }, // zoom duration
        counter: { type: 'selector' } //the text that shows how many times user zoomed in
    },

    init: function () {
        var data = this.data;
        var targetEl = this.data.target;
        var el = this.el;
        var counterEl = this.data.counter;
        
        // Putting these variables into the camera's dataset
        targetEl.dataset.isZoomed = false;
        targetEl.dataset.zoomInCounter = 0;  
        
        el.addEventListener(data.on, function () {
            // Ignore zooming in if already zoomed or has reached the max counter
            if(targetEl.dataset.isZoomed === "true") {
                return;
            }
            if(targetEl.dataset.zoomInCounter > 2){
                counterEl.setAttribute('text', "anchor:center;width:2.5;color:#fff;value:You ran out of counts");
                return;
            }
            targetEl.dataset.zoomInCounter++;
            targetEl.dataset.isZoomed = true;
            targetEl.setAttribute('fov', 30);

            if(targetEl.dataset.zoomInCounter == 1) {
                counterEl.setAttribute('text', "anchor:center;width:2.5;color:#fff;value:You have 2 more examines left");
            } else if (targetEl.dataset.zoomInCounter == 2) {
                counterEl.setAttribute('text', "anchor:center;width:2.5;color:#fff;value:You have 1 more examine left");             
           }
            
            setTimeout(function () {
                // Set image.
                targetEl.setAttribute('fov', 80);
                targetEl.dataset.isZoomed = false;
            }, data.dur);
        });
    },
});

AFRAME.registerComponent('select-answer', {
    schema: {
        isCorrect: { type: 'boolean'},
        target: { type: 'selector' },
        text: { type: 'string', default: 'dansgame explain?'}
    },
    
    init: function() {
        var data = this.data;
        var targetEl = this.data.target; 
        
        this.el.addEventListener('click', function () {
            if (data.isCorrect) {            
                targetEl.setAttribute('text', "anchor:center;width:2.5;color:#fff;value:Hurray!"); 
            } else {
                targetEl.setAttribute('text', "anchor:center;width:2.5;color:#fff;value:Oh No!"); 
            }
        })
    }
});