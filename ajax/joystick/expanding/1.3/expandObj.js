/*
	BASIC EXPANDABLE AD PSEUDO CLASS FOR HTML5
	v1.3
	(c) 2013 Carlo Santos
	
	DOCS: nargalzius.github.io/ajax/joystick/expanding
	
*/

var debug	  = false;
var expanding = {

	// REQUIRED PROPERTIES
	minW		: 300,		// COLLAPSED HEIGHT
	minH		: 250,		// COLLAPSED WIDTH
	maxW		: 500,		// EXPANDED WIDTH
	maxH		: 250,		// EXPANDED HEIGH

	// OPTIONAL PROPERTIES
	direction	: "LEFT",	// EXPAND DIRECTION UP/DOWN/LEFT/RIGHT
	preload		: null,		// ARRAY OF IMAGES
	rollover	: true,		// EXPAND ON ROLLOVER
	mouseout	: false,	// COLLAPSE ON MOUSEOUT
	exit		: null,		// CLICKTHROUGH URL
	trigger		: null,		// EXPAND TRIGGER
	fade		: false,	// FADE IN/OUT DURING EXPAND/COLLAPSE
	delay		: .5,		// TWEEN/ANIMATION DELAY
	expand		: null,		// CUSTOM EXPAND ACTIONS
	collapse	: null,		// CUSTOM COLLAPSE ACTIONS
	intro 		: null,		// CUSTOM INTRO ANIMATION

	MIN_X:0, MIN_Y:0, MAX_X:0, MAX_Y:0, FMIN:0, isExpanded:false, isReady: false, isError: false,
	init : function(obj){

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

		spinner.stop();
		$('#tempSpin').remove();

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

		var p = expanding.col_obj.position();

		$('<div>')
			.attr('id','tempSpin')
			.css({
				'display': 'block',
				'position': 'absolute',
				'width': expanding.minW,
				'height': expanding.minH,
				top: p.top,
				left: p.left
			})
			.appendTo($(expanding.content.parent()));

		spinner = new Spinner(expanding.spinConfig).spin(document.getElementById('tempSpin'));

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
			"width"		: expanding.maxW+"px",
			"height"	: expanding.maxH+"px"
		})

		expanding.exp_obj.css({
			'display'	: 'block',
			'position'	: 'absolute',
			"width"		: expanding.maxW+"px",
			"height"	: expanding.maxH+"px",
			'z-index'	: '30'
		}).find('.background').css({
			'display'	: 'block',
			'position'	: 'absolute',
			"background": '#CCC',
			'top'		: 0,
			'left'		: 0,
			"width"		: expanding.maxW+"px",
			"height"	: expanding.maxH+"px"
		});

		expanding.col_obj.css({
			'display'	: 'block',
			'position'	: 'absolute',
			'overflow'	: 'hidden',
			"width"		: expanding.minW+"px",
			"height"	: expanding.minH+"px"
		}).find('.background').css({
			'display'	: 'block',
			'position'	: 'absolute',
			'background': '#EEE',
			'top'		: 0,
			'left'		: 0,
			"width"		: expanding.minW+"px",
			"height"	: expanding.minH+"px"
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

		switch(expanding.direction)
		{
			case "UP":
				expanding.MIN_Y = expanding.maxH;
				expanding.col_obj.css('bottom','0');
				expanding.exp_obj.css('top',expanding.MIN_Y+'px');
			break;
			case "LEFT":
				expanding.MIN_X = expanding.maxW;
				expanding.col_obj.css('right','0');
				expanding.exp_obj.css('left',expanding.MIN_X+'px');
			break;
			case "RIGHT":
				expanding.MIN_X = expanding.maxW*-1;
				expanding.exp_obj.css('left',expanding.MIN_X+'px');
			break;
			default:
				expanding.MIN_Y = expanding.maxH * -1;
				expanding.exp_obj.css('top',expanding.MIN_Y+'px');
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

		// KILL SERIFS
		$('.sans').css('font-family', '"Helvetica", "Arial"');

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

		$('.btn').css('cursor', 'pointer');
	},
	ready : function()
	{
		if(!expanding.isError)
			expanding.isReady = true;
		expanding.setButtons();
	},
	spinConfig : {
		lines 		: 11,
		length 		: 3,
		width 		: 5,
		radius 		: 10,
		corners 	: 0.8,
		rotate 		: 0,
		direction 	: 1,
		color 		: '#000',
		speed 		: 1.1,
		trail 		: 60,
		shadow 		: false,
		hwaccel 	: false,
		className 	: 'spinner',
		zIndex 		: 2e9,
		top 		: 'auto',
		left 		: 'auto'
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

// SPIN.JS 1.2.7
!function(e,t,n){function o(e,n){var r=t.createElement(e||"div"),i;for(i in n)r[i]=n[i];return r}function u(e){for(var t=1,n=arguments.length;t<n;t++)e.appendChild(arguments[t]);return e}function f(e,t,n,r){var o=["opacity",t,~~(e*100),n,r].join("-"),u=.01+n/r*100,f=Math.max(1-(1-e)/t*(100-u),e),l=s.substring(0,s.indexOf("Animation")).toLowerCase(),c=l&&"-"+l+"-"||"";return i[o]||(a.insertRule("@"+c+"keyframes "+o+"{"+"0%{opacity:"+f+"}"+u+"%{opacity:"+e+"}"+(u+.01)+"%{opacity:1}"+(u+t)%100+"%{opacity:"+e+"}"+"100%{opacity:"+f+"}"+"}",a.cssRules.length),i[o]=1),o}function l(e,t){var i=e.style,s,o;if(i[t]!==n)return t;t=t.charAt(0).toUpperCase()+t.slice(1);for(o=0;o<r.length;o++){s=r[o]+t;if(i[s]!==n)return s}}function c(e,t){for(var n in t)e.style[l(e,n)||n]=t[n];return e}function h(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var i in r)e[i]===n&&(e[i]=r[i])}return e}function p(e){var t={x:e.offsetLeft,y:e.offsetTop};while(e=e.offsetParent)t.x+=e.offsetLeft,t.y+=e.offsetTop;return t}var r=["webkit","Moz","ms","O"],i={},s,a=function(){var e=o("style",{type:"text/css"});return u(t.getElementsByTagName("head")[0],e),e.sheet||e.styleSheet}(),d={lines:12,length:7,width:5,radius:10,rotate:0,corners:1,color:"#000",speed:1,trail:100,opacity:.25,fps:20,zIndex:2e9,className:"spinner",top:"auto",left:"auto",position:"relative"},v=function m(e){if(!this.spin)return new m(e);this.opts=h(e||{},m.defaults,d)};v.defaults={},h(v.prototype,{spin:function(e){this.stop();var t=this,n=t.opts,r=t.el=c(o(0,{className:n.className}),{position:n.position,width:0,zIndex:n.zIndex}),i=n.radius+n.length+n.width,u,a;e&&(e.insertBefore(r,e.firstChild||null),a=p(e),u=p(r),c(r,{left:(n.left=="auto"?a.x-u.x+(e.offsetWidth>>1):parseInt(n.left,10)+i)+"px",top:(n.top=="auto"?a.y-u.y+(e.offsetHeight>>1):parseInt(n.top,10)+i)+"px"})),r.setAttribute("aria-role","progressbar"),t.lines(r,t.opts);if(!s){var f=0,l=n.fps,h=l/n.speed,d=(1-n.opacity)/(h*n.trail/100),v=h/n.lines;(function m(){f++;for(var e=n.lines;e;e--){var i=Math.max(1-(f+e*v)%h*d,n.opacity);t.opacity(r,n.lines-e,i,n)}t.timeout=t.el&&setTimeout(m,~~(1e3/l))})()}return t},stop:function(){var e=this.el;return e&&(clearTimeout(this.timeout),e.parentNode&&e.parentNode.removeChild(e),this.el=n),this},lines:function(e,t){function i(e,r){return c(o(),{position:"absolute",width:t.length+t.width+"px",height:t.width+"px",background:e,boxShadow:r,transformOrigin:"left",transform:"rotate("+~~(360/t.lines*n+t.rotate)+"deg) translate("+t.radius+"px"+",0)",borderRadius:(t.corners*t.width>>1)+"px"})}var n=0,r;for(;n<t.lines;n++)r=c(o(),{position:"absolute",top:1+~(t.width/2)+"px",transform:t.hwaccel?"translate3d(0,0,0)":"",opacity:t.opacity,animation:s&&f(t.opacity,t.trail,n,t.lines)+" "+1/t.speed+"s linear infinite"}),t.shadow&&u(r,c(i("#000","0 0 4px #000"),{top:"2px"})),u(e,u(r,i(t.color,"0 0 1px rgba(0,0,0,.1)")));return e},opacity:function(e,t,n){t<e.childNodes.length&&(e.childNodes[t].style.opacity=n)}}),function(){function e(e,t){return o("<"+e+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',t)}var t=c(o("group"),{behavior:"url(#default#VML)"});!l(t,"transform")&&t.adj?(a.addRule(".spin-vml","behavior:url(#default#VML)"),v.prototype.lines=function(t,n){function s(){return c(e("group",{coordsize:i+" "+i,coordorigin:-r+" "+ -r}),{width:i,height:i})}function l(t,i,o){u(a,u(c(s(),{rotation:360/n.lines*t+"deg",left:~~i}),u(c(e("roundrect",{arcsize:n.corners}),{width:r,height:n.width,left:n.radius,top:-n.width>>1,filter:o}),e("fill",{color:n.color,opacity:n.opacity}),e("stroke",{opacity:0}))))}var r=n.length+n.width,i=2*r,o=-(n.width+n.length)*2+"px",a=c(s(),{position:"absolute",top:o,left:o}),f;if(n.shadow)for(f=1;f<=n.lines;f++)l(f,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(f=1;f<=n.lines;f++)l(f);return u(t,a)},v.prototype.opacity=function(e,t,n,r){var i=e.firstChild;r=r.shadow&&r.lines||0,i&&t+r<i.childNodes.length&&(i=i.childNodes[t+r],i=i&&i.firstChild,i=i&&i.firstChild,i&&(i.opacity=n))}):s=l(t,"animation")}(),typeof define=="function"&&define.amd?define(function(){return v}):e.Spinner=v}(window,document);
var spinner;