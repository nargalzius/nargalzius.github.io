/*
	BASIC LIGHTBOX AD PSEUDO CLASS FOR HTML5
	v1.3
	(c) 2013 Carlo Santos

	USAGE: http://cdpn.io/LGpDJ
*/

var debug 	  = false;
var expanding = {
	// REQUIRED PROPERTIES
	minW		: 300,				// COLLAPSED WIDTH
	minH		: 250,				// COLLAPSED HEIGHT
	maxW		: 900,				// EXPANDED WIDTH
	maxH		: 400,				// EXPANDED HEIGHT

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
	exp_url		: 'expanded.html',	// IFRAME CONTENT HTML

	// DO NOT TOUCH THESE
	expandBar: null, expandText: null, isExpanded: false, isReady: false, isTweening: false, isError: false,

	init : function(obj) {

		expanding.col_bg 	= $("#col_bg");
		expanding.exp_frame = $("#expandFrame");	
		expanding.exp_btn 	= $("#exp_btn");
		expanding.exp_unit 	= $('#expanded');
		expanding.col_unit 	= $('#content');
		expanding.expandBar = $("#expandBar");
		expanding.expandText= $("#expandText");
		expanding.spinner 	= $("#spinner");
		expanding.close 	= $("#close");

		// (OPTIONAL) VALUE OVERRIDE
		if(obj)
			for(var property in obj)
				expanding[property] = obj[property];
	
		expanding.setCommon();
		expanding.resetCollapsed();

		if(expanding.preload)
			expanding.preloadImages(expanding.preload);
		else
			expanding.initCollapsed();
		
		expanding.exp_frame.attr('src','about:blank');

	},
	initCollapsed : function() {
		expanding.spinner.hide();
		if(expanding.intro)
		{
			if(expanding.exit)
				expanding.exp_btn.show().click(expanding.clickthrough);
			expanding.intro();
			TweenLite.to(expanding.col_unit, 0, { autoAlpha:1 });
			trace('Using custom intro. Be sure to call expanding.ready() when done.');
		}
		else
		{
			TweenLite.to(expanding.col_unit, 1, { autoAlpha:1 });
			expanding.ready();
		}
	},
	setButtons: function() {

		if(expanding.trigger)
		{
			if(expanding.exit)
				expanding.exp_btn.click(expanding.clickthrough);
			else
				expanding.exp_btn.click(expanding.int_expand);

			expanding.trigger.css('z-index','20');
			expanding.exp_btn.css('z-index','19');
		}
		else
			expanding.trigger = expanding.exp_btn;
			
		expanding.trigger.css("cursor","pointer");

		if(expanding.rollover)
		{
			expanding.trigger.mouseover(function(){

				if(!expanding.isTweening)
				{
					expanding.isTweening = true;

					TweenLite.to(expanding.expandBar, expanding.delay, {
						width: expanding.col_unit.width(), 
						height: 22, 
						ease: Linear.easeNone,
						onComplete: expanding.int_expand 
					} );
					TweenLite.to(expanding.expandText, 0, { autoAlpha:1 } );
				}
			});

			if(expanding.hold)
			{
				expanding.trigger.mouseleave(function(){
					expanding.isTweening = false;
					TweenLite.to(expanding.expandBar, 0, { width: 0, height:22 } );
					TweenLite.to(expanding.expandText, 0, { autoAlpha:0 } );
				});
			}

		}
		else
			expanding.trigger.click(expanding.int_expand);

		expanding.close.click(function(e) {
			e.preventDefault();
			expanding.exp_unit.trigger('close');
		});
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
			expanding.isTweening = false;
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
	            	expanding.isError = true;
	            	expanding.initCollapsed();
	            };
				img.src = img_array[i];
		}
	},
	clickthrough: function() {
		trace('clickthrough: '+expanding.exit);
		window.open(expanding.exit, '_blank');
	},
	setCommon : function() {

		// IFRAME
		var minW   = expanding.minW;
		var minH   = expanding.minH;
		var maxW   = expanding.maxW;
		var maxH   = expanding.maxH;
		var buffer = 38;

		// SPINNER
		expanding.spinner.css({
			'display' : 'block',
			'position': 'absolute',
			'border'  : 'none',
			'margin'  : '0',
			'overflow': 'hidden',
			'left'	  : (minW/2 - 15)+'px', 
			'top'	  : (minH/2 - 15)+'px',
			'z-index' : '1'
		});

		// CLOSE
		expanding.close.css({
			'display' 	 : 'block',
			'position'	 : 'absolute',
			'width'   	 : '36px',
			'height'  	 : '35px',
			'right'   	 : '0',
			'top'     	 : '0'
		});

		// EXPAND
		expanding.exp_frame.css({
			'border'  : 'none',
			'margin'  : '0',
			'overflow': 'hidden',
			'padding' : '19px 20px',
			'width'   : (maxW) + 'px', 
			'height'  : (maxH) + 'px'
		});

		expanding.exp_unit.css({
			'border'  : 'none',
			'margin'  : '0',
			'overflow': 'hidden',
			'width'	  : (maxW + buffer) + 'px', 
			'height'  : (maxH + buffer) + 'px',
			'display' : 'none'
		});

		// COLLAPSED
		
		expanding.col_unit.parent().css({
			'display' 	 : 'block',
			'position'	 : 'absolute',
			'overflow'	 : 'hidden',
			'width'   	 : minW+'px',
			'height'  	 : minH+'px'
		});

		expanding.col_unit.css({
			'display' 	 : 'block',
			'position'	 : 'absolute',
			'overflow'	 : 'hidden',
			'width'   	 : minW+'px',
			'height'  	 : minH+'px',
			'opacity' 	 : '0',
			'background' : '#DDD'
		});

		expanding.col_bg.css({
			'display' 	 : 'block',
			'position'	 : 'absolute',
			'z-index' 	 : '0',
			'top'	  	 : '0',
			'left'	  	 : '0'
		});

		expanding.exp_btn.css({
			'display' 	 : 'block',
			'position'	 : 'absolute',
			'width'	  	 : '100%',
			'height'  	 : '100%',
			'top'	  	 : '0',
			'left'	  	 : '0',
			'opacity' 	 : '0',
			'z-index' 	 : '20',
			'color'	  	 : 'transparent'
		});

		expanding.expandBar.css({
			'display' 	 : 'block',
			'position'	 : 'absolute',
			'bottom'  	 : '-1px',
			'height'  	 : '22px',
			'left'	  	 : '0',
			'z-index' 	 : '15',
			'opacity' 	 : '.7',
			'background' : '#EEE'
		});

		expanding.expandText.css({
			'display' 	 : 'block',
			'position'	 : 'absolute',
			'bottom'  	 : '5px',
			'left'	  	 : '5px',
			'z-index' 	 : '16',
			'opacity' 	 : '0',
			'font-family': '"Helvetica", "Arial"',
			'font-size'	 : '10px',
			'font-weight': 'bold'
		});

		// FORCE SHOW PARENT CONTAINER
		expanding.exp_unit.parent().css('opacity', '1').show();
	},
	ready : function() {
		expanding.isReady = true;
		expanding.exp_btn.unbind();
		if(expanding.isError)
		{
			TweenLite.to(expanding.col_unit, 0, { autoAlpha:1 });
			if(expanding.trigger)
				expanding.trigger.unbind();
			expanding.col_bg.unbind();
			expanding.exp_btn.show();
			expanding.trigger = expanding.exp_btn;
			if(expanding.exit)
				expanding.trigger.click(expanding.clickthrough);

			console.log('error... disabling expand');
		}
		else
		{
			trace('ad ready');
			expanding.setButtons();
		}
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