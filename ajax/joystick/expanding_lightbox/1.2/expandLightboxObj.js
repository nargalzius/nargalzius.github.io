/*
	BASIC LIGHTBOX AD PSEUDO CLASS FOR HTML5
	v1.2
	(c) 2013 Carlo Santos
	
	REQUIRES 
		JQUERY	http://jquery.com
		GSAP	http://www.greensock.com/gsap-js
	
	SAMPLE USAGE (SEE COMMENTS BELOW FOR MORE DETAILS)
	
	expanding.init({
		preload	: ARRAY,
		trigger	: DOM ELEMENT,
		rollover: BOOLEAN,
		hold	: BOOLEAN,
		delay	: NUMBER,
		expand	: FUNCTION,
		collapse: FUNCTION,
		intro	: FUNCTION,
		exit	: STRING
	});
*/

var debug 	  = false;
var expanding = {

	// OPTIONAL PROPERTIES
	preload		: null,				// PRELOAD IMAGES (ARRAY)
	trigger		: null,				// EXPAND TRIGGER
	rollover	: true,				// EXPAND ON ROLLOVER (SET TO FALSE TO CLICK)
	hold		: true,				// REQUIRE ROLLOVER HOLD TO ACTIVATE EXPAND
	delay		: 1,				// HOLD ANIMATION TIME
	expand		: function() {},	// CUSTOM EXPAND ACTIONS
	collapse	: function() {},	// CUSTOM COLLAPSE ACTIONS
	intro		: null,				// CUSTOM INTRO (FUNCTION)
	exit		: null,				// CLICKTHROUGH URL (STRING) 

	// ONLY TOUCH THESE IF YOU REALLY KNOW WHAT YOU'RE DOING
	col_bg		: null, 
	exp_frame	: null, 
	col_unit	: null, 
	exp_unit	: null, 
	exp_btn		: null,
	exp_url		: 'expanded.html',

	// DO NOT TOUCH THESE
	expandBar: null, expandText: null, isExpanded: false, isReady: false,

	init : function(obj) {

		this.col_bg 	= $("#col_bg");
		this.exp_frame 	= $("#expandFrame");	
		this.exp_btn 	= $("#exp_btn");
		this.exp_unit 	= $('#expanded');
		this.col_unit 	= $('#content');
		this.expandBar 	= $("#expandBar");
		this.expandText	= $("#expandText");

		// (OPTIONAL) VALUE OVERRIDE
		if(obj)
			for(var property in obj)
				this[property] = obj[property];

		$("#close").click(function(e) {
			e.preventDefault();
			expanding.exp_unit.trigger('close');
		});

		if(!this.trigger)
			this.trigger = this.exp_btn;
		else
			this.exp_btn.hide();

		this.trigger.css("cursor","pointer");

		if(this.rollover)
		{

			this.trigger.mouseover(function(){
				TweenLite.to(expanding.expandBar, expanding.delay, { 
					width: expanding.col_unit.width(), 
					height: 22, 
					ease: Linear.easeNone,
					onComplete: expanding.int_expand 
				} );
				TweenLite.to(expanding.expandText, 0, { autoAlpha:1 } );
			});

			if(this.hold)
			{
				this.trigger.mouseleave(function(){
	
					TweenLite.to(expanding.expandBar, 0, { width: 0, height:22 } );
					TweenLite.to(expanding.expandText, 0, { autoAlpha:0 } );
				});
			}

		}
		else
			this.trigger.click(this.int_expand);

		this.resetCollapsed();

		if(this.preload)
			this.preloadImages(this.preload);
		else
			this.initCollapsed();
		
		expanding.exp_frame.attr('src','about:blank');
		
		if(this.exit)
		{
			this.col_bg.click(function(){
				expanding.clickthrough(this.exit);
			});
		}
	},
	initCollapsed : function() {
		expanding.isReady = true;
		trace('ad ready');
		$('#spinner').fadeOut();
		if(expanding.intro)
		{
			expanding.intro();
			TweenLite.to(expanding.col_unit, 0, { autoAlpha:1 });
		}
		else
			TweenLite.to(expanding.col_unit, 1, { autoAlpha:1 });
	},
	resetCollapsed : function() {
		if(expanding.rollover)
			setTimeout(function() { 
				expanding.isExpanded = false 
			}, 600);
		else
			expanding.isExpanded = false;

		TweenLite.to(expanding.expandBar, 0, { width:0, height:22 } );
		TweenLite.to(expanding.expandText, 0, { autoAlpha:0 } );
	},
	int_collapse : function() {
		expanding.exp_frame.attr('src','about:blank');
		expanding.resetCollapsed();
		expanding.collapse();
		expanding.col_unit.show();
		trace('collapsing');
	},
	int_expand : function() {
		if(!expanding.isExpanded && expanding.isReady)
		{
			expanding.isExpanded = true;

				expanding.col_unit.hide();

				expanding.exp_frame.attr('src', expanding.exp_url);

				expanding.exp_unit.lightbox_me({
					centered: true,
					overlayCSS: { 
						background: '#000', 
						opacity: .7 
					},
					onClose: function() {
						expanding.int_collapse();
					}
				});

				expanding.expand();

			trace('expanding');
		}
	},
	preloadImages : function(img_array) {
		trace('preloading '+img_array);
		var lcounter  = 0;
		for(var i = 0, j = img_array.length; i < j; i++)
		{
			var img = new Image();
				img.onload = function(){ 
					if(++lcounter == img_array.length)
						expanding.initCollapsed();
				};
	            img.onerror = function(e) { 
	            	TweenLite.to(expanding.col_unit, 0, { autoAlpha:1 });
					expanding.trigger.unbind();
	            	expanding.col_bg.unbind();
					expanding.exp_btn.show();
					expanding.trigger = expanding.exp_btn;
					$('#spinner').fadeOut();
	            	if(expanding.exit)
	            		expanding.trigger.click(expanding.clickthrough).addClass('btn');

	            	console.log('error... disabling expand');

	            };
				img.src = img_array[i];
		}
	},
	clickthrough: function() {
		trace('clickthrough: '+expanding.exit);
		window.open(expanding.exit, '_blank');
	}
}

function trace(val)
{
	if(debug)
	{
		$('<p>').text(val).appendTo('#debug');
		console.log(val);
	}
}