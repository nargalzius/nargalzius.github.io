/*
	GENERIC DOM LOADER
	v1.2
	(c) 2013 Carlo Santos
	
	REQUIRES 
		JQUERY	http://jquery.com
		GSAP	http://www.greensock.com/gsap-js
	
	SAMPLE USAGE (SEE COMMENTS BELOW FOR MORE DETAILS)
	
	dom.init({
		preload	: ARRAY,
		content	: DOM ELEMENT
		intro 	: FUNCTION
	});
*/

var domReady = false;

var dom = {
	preload : null,			// PRELOAD IMAGES
	content : null,			// CONTAINER ELEMENT
	intro	: null,			// CUSTOM INTRO
	init : function(obj) {
		
		this.content = $('#content');
		
		if(obj)
			for(var property in obj)
				this[property] = obj[property];
		
		this.content.css('opacity', '0');

		if(this.preload)
			this.preloader(this.preload);
		else
			this.initExpandChild();
	},
	preloader : function(img_array) {
		var lcounter  = 0;
		for(var i = 0, j = img_array.length; i < j; i++)
		{
			var img = new Image();
				img.onload = function() { 
					if(++lcounter == img_array.length) 
						dom.initExpandChild();
				};
	            img.onerror = function(e){ console.log(e); };
				img.src = img_array[i];
		}
	},
	initExpandChild : function() {
		domReady = true;
		$('#spinner').hide();

		dom.content.show();
		if(dom.intro)
		{
			dom.intro();
			TweenLite.fromTo(dom.content, 0, {autoAlpha:0}, {autoAlpha:1});
		}
		else
			TweenLite.fromTo(dom.content, 1, {autoAlpha:0}, {autoAlpha:1});
	}
}