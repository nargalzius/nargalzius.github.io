/* STUDIO POLITE */
if (!Enabler.isInitialized()) 
	Enabler.addEventListener( studio.events.StudioEvent.INIT, enablerInitialized ); 
else
	enablerInitialized();

function enablerInitialized() { 
	if (!Enabler.isPageLoaded()) 
		Enabler.addEventListener( studio.events.StudioEvent.PAGE_LOADED, pageLoaded); 
	else
		pageLoaded(); 
}

function pageLoaded() {
    init();
}

// INITIALIZE VIDEO METRICS
// Enabler.loadModule(studio.module.ModuleId.VIDEO);
// studio.video.Reporter.attach('VIDEO_ID', VIDEO_ELEMENT);

/* SELECTOR SHORTCUT */
var $ = function(str) { return document.querySelector(str); }

/* STUDIO RESOLVE URL */

function getURL(arg) {
    
    var value;

    switch(typeof arg)
    {
        case "object":
            value = [];
            for(var i = 0; i < arg.length; i++)
                value.push( Enabler.getUrl( arg[i] ) );
        break;
        default:
            value = Enabler.getUrl(arg);

    }
    
    return value;
}

/* TRACE FUNCTION */
var trace = function(str) { console.log(str); }

/* IMAGE PRELOADER */
var preload = function(arg, callback)
{
	switch(typeof arg)
	{
		case "object":
			var lcounter  = 0;

			for(var i = 0; i < arg.length; i++)
			{
				var img = new Image();

					img.onload = function() {
						if(++lcounter == arg.length && callback)
							callback();
					};
    		        
    		        img.onerror = function(e) { console.log(e); };
					img.src = arg[i];
			}
		break;
		default:
			var img = new Image();
				img.onload = callback; 
				img.onerror = function(e) { console.log(e); };
				img.src = arg;

	}
};

/* SCRIPT PRELOADER */
var Loader = function () {};
	
Loader.prototype = {
    queue: function (scripts, callback) {

    	if(typeof scripts === 'string')
    	{
    		this.scriptArray = new Array(String(scripts));
    		this.totalRequired  = 1;
    	}
    	else
    	{
    		this.scriptArray	= scripts;
    		this.totalRequired  = scripts.length;
    	}
        
        this.loadCount      = 0;
        this.callback       = callback;
    	this.processScript( this.loadCount );
    },
    processScript: function(num) {
    	trace( 'loading script '+ (num+1) + ' of ' + this.totalRequired );
		this.writeScript( this.scriptArray[ num ] );
    },
    loaded: function (evt) {
        this.loadCount++;

        if ( this.loadCount == this.totalRequired && typeof this.callback === 'function' ) 
        {
        	trace('all scripts loaded');
        	this.callback.call();
        }
        else
        	this.processScript( this.loadCount );	
        
    },
    writeScript: function (src) {
        var self = this;
        var s = document.createElement('script');
        	s.type = "text/javascript";
        	s.async = true;
        	s.src = src;
        	s.addEventListener('load', function (e) { self.loaded(e); }, false);

        var head = document.getElementsByTagName('head')[0];
        	head.appendChild(s);
    }
}

function loadScript(scripts, cb)
{
	var l = new Loader();
		l.queue( scripts, cb );
}

/* CLASS RELATED */
function hasClass(el, className) {
    return (' ' + el.className + ' ').indexOf(' ' + className + ' ') > -1;
}

function addClass(el, className) {
    if (el.classList)
        el.classList.add(className);
    else
        el.className += ' ' + className;
}

function removeClass(el, className) {
    if (el.classList)
        el.classList.remove(className);
    else
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}

// @ codekit-prepend "includes/HTMLvideo.js";
// @ codekit-prepend "includes/YTvideo.js";
// @ codekit-prepend "includes/MapHelper.js";
// @codekit-prepend "includes/DCSexpanding.js";