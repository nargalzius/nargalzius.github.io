/*
	BASIC [EXPANDING] LIGHTBOX AD PSEUDO CLASS FOR HTML5
	v1.5
	(c) 2013 Carlo Santos

	DOCS: nargalzius.github.io/ajax/joystick/expanding_lightbox
*/

var debug 	  = false;
var spinner;
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
	expandBar: null, expandText: null, isExpanded: false, isReady: false, isTweening: false, isError: false, isLegacy: false,

	init : function(obj) {

		expanding.col_bg 	= $("#col_bg");
		expanding.exp_frame = $("#expandFrame");	
		expanding.exp_btn 	= $("#exp_btn");
		expanding.exp_unit 	= $('#expanded');
		expanding.col_unit 	= $('#content');
		expanding.expandBar = $("#expandBar");
		expanding.expandText= $("#expandText");
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
		
		if(spinner)
			spinner.stop();
		
		if(expanding.intro)
		{
			if(expanding.exit)
				expanding.exp_btn.show().click(expanding.clickthrough);

			TweenLite.to(expanding.col_unit, 0, { autoAlpha:1 });
			expanding.intro();
			
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

		var useWidth;
		var d = 0;
			
		if(expanding.isLegacy)
		{
			d = .5
			useWidth = 128;
			expanding.expandBar.css({
				'background':'#BBB',
				'opacity':'.8'
			});
			expanding.expandText.css({
				'color': '#000',
				'font-size':'14px',
				'font-weight':'normal',
				'bottom': '3px',
				'font-family': '"Verdana", "Arial", sans-serif'
			});
		}
		else
			useWidth = expanding.col_unit.width();

		if(expanding.rollover)
		{
			expanding.trigger.mouseover(function(){

				if(!expanding.isTweening)
				{
					expanding.isTweening = true;

					TweenLite.to(expanding.expandBar, expanding.delay, {
						delay: d,
						width: useWidth, 
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

		$('.btn').css('cursor', 'pointer');
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

		spinner = new Spinner(expanding.spinConfig).spin(document.getElementById($(expanding.col_unit.parent()).attr('id').toString()));
		
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
			'border'  	: 'none',
			'margin'  	: '0',
			'overflow'	: 'hidden',
			'padding' 	: '19px 20px',
			'width'   	: (maxW) + 'px', 
			'height'  	: (maxH) + 'px'
		});

		expanding.exp_unit.css({
			'border'  	: 'none',
			'margin'  	: '0',
			'overflow'	: 'hidden',
			'width'	  	: (maxW + buffer) + 'px', 
			'height'  	: (maxH + buffer) + 'px',
			'display' 	: 'none'
		});

		// COLLAPSED
		
		expanding.col_unit.parent().css({
			'display' 	: 'block',
			'position'	: 'absolute',
			'overflow'	: 'hidden',
			'width'   	: minW+'px',
			'height'  	: minH+'px'
		});

		expanding.col_unit.css({
			'display' 	: 'block',
			'position'	: 'absolute',
			'overflow'	: 'hidden',
			'width'   	: minW+'px',
			'height'  	: minH+'px',
			'opacity' 	: '0'
		});

		expanding.col_bg.css({
			'display' 	: 'block',
			'position'	: 'absolute',
			'z-index' 	: '0',
			'top'	  	: '0',
			'left'	  	: '0',
			'width'   	: minW+'px',
			'height'  	: minH+'px',
			'background': '#DDD'
		});

		expanding.exp_btn.css({
			'display' 	: 'block',
			'position'	: 'absolute',
			'width'	  	: '100%',
			'height'  	: '100%',
			'top'	  	: '0',
			'left'	  	: '0',
			'opacity' 	: '0',
			'z-index' 	: '20',
			'color'	  	: 'transparent',
			'background': 'transparent'
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

		// KILL SERIFS
		$('.sans').css('font-family', '"Helvetica", "Arial"');

		// FORCE PARENT TO SHOW
		expanding.exp_unit.parent().show().css('opacity','1');
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