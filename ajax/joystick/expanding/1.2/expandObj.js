/*
	BASIC EXPANDABLE AD PSEUDO CLASS FOR HTML5
	v1.2
	(c) 2013 Carlo Santos
	
	SAMPLE USAGE: http://cdpn.io/KLaDz
	
*/

var debug	  = false;
var expanding = {

	// REQUIRED PROPERTIES
	min_width		: 300,		// COLLAPSED HEIGHT
	min_height		: 250,		// COLLAPSED WIDTH
	max_width		: 500,		// EXPANDED WIDTH
	max_height		: 250,		// EXPANDED HEIGH

	// OPTIONAL PROPERTIES
	direction		: "LEFT",	// EXPAND DIRECTION UP/DOWN/LEFT/RIGHT
	preload			: null,		// ARRAY OF IMAGES
	rollover		: true,		// EXPAND ON ROLLOVER
	mouseout		: false,	// COLLAPSE ON MOUSEOUT
	exit			: null,		// CLICKTHROUGH URL
	trigger			: null,		// EXPAND TRIGGER
	fade			: false,	// FADE IN/OUT DURING EXPAND/COLLAPSE
	delay			: .5,		// TWEEN/ANIMATION DELAY
	expand			: null,		// CUSTOM EXPAND ACTIONS
	collapse		: null,		// CUSTOM COLLAPSE ACTIONS
	intro 			: null,		// CUSTOM INTRO ANIMATION

	MIN_X:0, MIN_Y:0, MAX_X:0, MAX_Y:0, FMIN:0, isExpanded:false, isReady: false, isError: false,
	init : function(obj){

		expanding.spinner = $("#spinner");
		expanding.container = $("#unit");
		expanding.content = $("#content");
		expanding.col_obj = $("#collapsed");
		expanding.exp_obj = $("#expanded");
		expanding.exp_btn = $("#exp_btn");
		expanding.btn_close = $("#close");

		for(var property in obj)
			expanding[property] = obj[property];

		if(expanding.fade)
			expanding.FMIN = 0;
		else
			expanding.FMIN = 1;

		trace("Initializing expand: "+expanding.direction);

		expanding.setCommon();

		if(expanding.preload)
			expanding.preloadIMG(expanding.preload);
		else
			expanding.initCollapsed();
	},
	initCollapsed : function() {

		expanding.spinner.hide();

		if(expanding.exit)
			expanding.exp_btn.click(expanding.clickthrough);

		if(expanding.intro)
		{
			expanding.intro();
			TweenLite.to(expanding.content, 0, {autoAlpha: 1});
			trace('using intro, be sure to call the expanding.ready() at the end of your animation')
		}
		else
		{
			expanding.ready();
			TweenLite.to(expanding.content, 1, {autoAlpha: 1});
		}	
	},
	int_expand : function(){
		if(!expanding.isExpanded && expanding.isReady)
		{
			expanding.isExpanded = true;

			trace("expanding");
			TweenLite.fromTo(expanding.exp_obj, expanding.delay, 
				{top:expanding.MIN_Y, left:expanding.MIN_X, opacity:expanding.FMIN},
				{top:expanding.MAX_Y, left:expanding.MAX_X, opacity:1, onComplete:function(){
					if(expanding.mouseout)
						expanding.exp_obj.mouseleave(expanding.int_collapse);
				}});
	
			if(expanding.expand)
				expanding.expand();
		}
		else
			trace("prevented expand");
	},
	int_collapse : function(){		
		if(expanding.isExpanded && expanding.isReady)
		{
			if(expanding.mouseout)
				expanding.exp_obj.unbind('mouseleave');
			
			TweenLite.fromTo(expanding.exp_obj, expanding.delay, 
				{top:expanding.MAX_Y, left:expanding.MAX_X, opacity:1},
				{top:expanding.MIN_Y, left:expanding.MIN_X, opacity:expanding.FMIN});
				
			if(!expanding.rollover)
			{
				trace("collapsing (immediate)");
				expanding.isExpanded = false;
			}
			else
			{
				trace("collapsing (with timeout)");
				setTimeout(function(){ expanding.isExpanded = false },expanding.delay+1000)
			}
			
			if(expanding.collapse)
				expanding.collapse();
		}
	},
	preloadIMG : function(img_array) {
		trace("preloading: "+ img_array);
		var lcounter  = 0;
		for(var i = 0, j = img_array.length; i < j; i++)
		{
			var img = new Image();
				img.onload = function() { 
					if(++lcounter == img_array.length)
						expanding.initCollapsed();
				}
				img.onerror = function(e) {
					expanding.isError = true;
					expanding.initCollapsed();
				}

				img.src = img_array[i];
		}
	},
	clickthrough : function() {
		trace('clickthrough: '+expanding.exit);
		window.open(expanding.exit, '_blank');
		expanding.int_collapse();
	},
	setCommon : function() {
		expanding.content.css({'opacity':'0'});

		expanding.container.css({
			'display'	: 'block',
			'position'	: 'absolute',
			'overflow'	: 'hidden',
			"width"		: expanding.max_width+"px",
			"height"	: expanding.max_height+"px"
		})

		expanding.exp_obj.css({
			'display'	: 'block',
			'position'	: 'absolute',
			"width"		: expanding.max_width+"px",
			"height"	: expanding.max_height+"px",
			'z-index'	: '30'
		}).find('.background').css({
			'display'	: 'block',
			'position'	: 'absolute',
			"background": '#CCC',
			'top'		: 0,
			'left'		: 0,
			"width"		: expanding.max_width+"px",
			"height"	: expanding.max_height+"px"
		});

		expanding.col_obj.css({
			'display'	: 'block',
			'position'	: 'absolute',
			'overflow'	: 'hidden',
			"width"		: expanding.min_width+"px",
			"height"	: expanding.min_height+"px"
		}).find('.background').css({
			'display'	: 'block',
			'position'	: 'absolute',
			'background': '#EEE',
			'top'		: 0,
			'left'		: 0,
			"width"		: expanding.min_width+"px",
			"height"	: expanding.min_height+"px"
		});

		expanding.btn_close.css({
			'display'	: 'block',
			'position'	: 'absolute',
			'margin'	: '5px',
			'right'		: '0',
			'top'		: '0',
			'font-size'	: '9px',
			'font-weight': 'bold'
		});

		expanding.spinner.css({
			'display'	: 'block',
			'position'	: 'absolute',
			'width'		: '30px',
			'height'	: '30px'
		});

		switch(expanding.direction)
		{
			case "UP":
				expanding.MIN_Y = expanding.max_height;
				expanding.col_obj.css('bottom','0');
				expanding.exp_obj.css('top',expanding.MIN_Y+'px');
				expanding.spinner.css({'left': (expanding.min_width/2 - 15)+'px', 'bottom': (expanding.min_height/2 - 15)+'px'});
			break;
			case "LEFT":
				expanding.MIN_X = expanding.max_width;
				expanding.col_obj.css('right','0');
				expanding.exp_obj.css('left',expanding.MIN_X+'px');
				expanding.spinner.css({'right': (expanding.min_width/2 - 15)+'px', 'top': (expanding.min_height/2 - 15)+'px'});
			break;
			case "RIGHT":
				expanding.MIN_X = expanding.max_width*-1;
				expanding.exp_obj.css('left',expanding.MIN_X+'px');
				expanding.spinner.css({'left': (expanding.min_width/2 - 15)+'px', 'top': (expanding.min_height/2 - 15)+'px'});
			break;
			default:
				expanding.MIN_Y = expanding.max_height * -1;
				expanding.exp_obj.css('top',expanding.MIN_Y+'px');
				expanding.spinner.css({'left': (expanding.min_width/2 - 15)+'px', 'top': (expanding.min_height/2 - 15)+'px'});
		}

		expanding.exp_btn.css({
			'display': 'block',
			'position': 'absolute',
			'width': '100%',
			'height': '100%',
			'background': 'transparent',
			'border': 'none',
			'z-index':'20'
		});

		// FORCE PARENT TO SHOW
		expanding.container.parent().show().css('opacity','1');

	},
	setButtons : function() {

		expanding.exp_btn.unbind();

		if(expanding.isError)
		{
			trace("disabling expand");

			if(expanding.exit)
				expanding.exp_btn.click(expanding.clickthrough);
		}
		else
		{
			if(expanding.trigger)
			{
				expanding.trigger.css({'z-index':'20'});
				expanding.exp_btn.css({'z-index':'19'});
			}
			else
				expanding.trigger = expanding.exp_btn;
	
			expanding.btn_close.click(expanding.int_collapse);
	
			if(expanding.rollover)
				expanding.trigger.mouseover(expanding.int_expand);
			else
				expanding.trigger.click(expanding.int_expand);
				
			if(expanding.exit)
			{
				expanding.exp_btn.click(expanding.clickthrough);
			}
			else
				expanding.exp_btn.click(expanding.int_expand);
		}
	},
	ready : function()
	{
		if(!expanding.isError)
			expanding.isReady = true;
		expanding.setButtons();
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