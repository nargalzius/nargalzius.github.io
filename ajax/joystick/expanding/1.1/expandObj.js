/*
	BASIC EXPANDABLE AD PSEUDO CLASS FOR HTML5
	v1.1
	(c) 2013 Carlo Santos
	
	SAMPLE USAGE: http://cdpn.io/KLaDz
	
*/

var debug	  = false;
var expanding = {

	// REQUIRED PROPERTIES
	min_width		: 50,				// COLLAPSED HEIGHT
	min_height		: 50,				// COLLAPSED WIDTH
	max_width		: 100,				// EXPANDED WIDTH
	max_height		: 100,				// EXPANDED HEIGHT

	// OPTIONAL PROPERTIES
	direction		: "DOWN",			// EXPAND DIRECTION UP/DOWN/LEFT/RIGHT
	preload			: null,				// ARRAY OF IMAGES
	rollover		: true,				// EXPAND ON ROLLOVER
	mouseout		: false,			// COLLAPSE ON MOUSEOUT
	exit			: null,				// CLICKTHROUGH URL
	trigger			: null,				// EXPAND TRIGGER
	fade			: false,			// FADE IN/OUT DURING EXPAND/COLLAPSE
	delay			: .5,				// TWEEN/ANIMATION DELAY
	userExpand		: function() { },	// CUSTOM EXPAND ACTIONS
	userCollapse	: function() { },	// CUSTOM COLLAPSE ACTIONS
	intro 			: function() { },	// CUSTOM INTRO ANIMATION

	btn_close: null, container: null, content: null, col_obj: null, exp_obj: null,
	MIN_X:0, MIN_Y:0, MAX_X:0, MAX_Y:0, FMIN:0, isExpanded:false, spinner: null, expandReady: false,
	init: function(obj){

		this.spinner = $("#spinner");
		this.container = $("#unit");
		this.content = $("#content");
		this.col_obj = $("#collapsed");
		this.exp_obj = $("#expanded");
		this.trigger = this.col_obj
		this.btn_close = $("#close");

		for(var property in obj)
			this[property] = obj[property];

		this.content.css('opacity', '0');

		this.btn_close.click(expanding.collapse);
		
		if(this.rollover)
			this.trigger.mouseover(expanding.expand);
		else
			this.trigger.click(expanding.expand);
			
		if(this.exit)
		{
			this.col_obj.unbind('click');
			$('.background').click(expanding.clickthrough);
		}

		if(this.fade)
			this.FMIN = 0;
		else
			this.FMIN = 1;

		trace("Initializing expand: "+this.direction);

		this.container.css({
			"width": this.max_width+"px",
			"height": this.max_height+"px"
		})

		this.exp_obj.css({
			"width": this.max_width+"px",
			"height": this.max_height+"px"
		}).find('.background').css({
			"width": this.max_width+"px",
			"height": this.max_height+"px"
		});

		this.col_obj.css({
			"width": this.min_width+"px",
			"height": this.min_height+"px"
		}).find('.background').css({
			"width": this.min_width+"px",
			"height": this.min_height+"px"
		});

		switch(this.direction)
		{
			case "UP":
				this.MIN_Y = this.max_height;
				this.col_obj.css('bottom','0');
				this.exp_obj.css('top',this.MIN_Y+'px');
				this.spinner.css({'left': (this.min_width/2 - 15)+'px', 'bottom': (this.min_height/2 - 15)+'px'});
			break;
			case "LEFT":
				this.MIN_X = this.max_width;
				this.col_obj.css('right','0');
				this.exp_obj.css('left',this.MIN_X+'px');
				this.spinner.css({'right': (this.min_width/2 - 15)+'px', 'top': (this.min_height/2 - 15)+'px'});
			break;
			case "RIGHT":
				this.MIN_X = this.max_width*-1;
				this.exp_obj.css('left',this.MIN_X+'px');
				this.spinner.css({'left': (this.min_width/2 - 15)+'px', 'top': (this.min_height/2 - 15)+'px'});
			break;
			default:
				this.MIN_Y = this.max_height * -1;
				this.exp_obj.css('top',this.MIN_Y+'px');
				this.spinner.css({'left': (this.min_width/2 - 15)+'px', 'top': (this.min_height/2 - 15)+'px'});
		}
		
		if(this.preload)
			this.preloadIMG(this.preload);
		else
			this.onReadyAd();
	},
	onReadyAd: function() {
		trace("ad ready");
		this.spinner.hide();
		TweenLite.to(this.content, 0, {autoAlpha: 1});
		this.intro();
	},
	expand: function(){
		if(!expanding.isExpanded)
		{
			trace("expanding");
			TweenLite.fromTo(expanding.exp_obj, expanding.delay, 
				{top:expanding.MIN_Y, left:expanding.MIN_X, opacity:expanding.FMIN},
				{top:expanding.MAX_Y, left:expanding.MAX_X, opacity:1, onComplete:function(){
					if(expanding.mouseout)
						expanding.exp_obj.mouseleave(expanding.collapse);
				}});

			expanding.isExpanded = true;
			expanding.userExpand();
		}
		else
			trace("prevented double-expand");
	},
	collapse: function(){
		
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
		
		expanding.userCollapse();
	},
	preloadIMG: function(img_array) {
		trace("preloading: "+ img_array);
		var lcounter  = 0;
		for(var i = 0, j = img_array.length; i < j; i++)
		{
			var img = new Image();
				img.onload = function() { 
					if(++lcounter == img_array.length)
						expanding.onReadyAd();
				}
				img.onerror = function(e) {
					trace(e.type+", disabling expand");
					expanding.trigger.unbind();
					if(expanding.exit)
						expanding.trigger.click(expanding.clickthrough);
					expanding.onReadyAd();
				}

				img.src = img_array[i];
		}
	},
	clickthrough: function() {
		trace('clickthrough: '+expanding.exit);
		window.open(expanding.exit, '_blank');
		expanding.collapse();
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