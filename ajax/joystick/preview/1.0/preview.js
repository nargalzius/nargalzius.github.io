/*
	JOYSTICK QUICK-PREVIEW SCRIPT
	v1.0
	(c) 2013 Carlo Santos

	DOCS: http://nargalzius.github.io/ajax/joystick/preview
*/
var debug = false;
var spinner;
var preview = {
	isError: false,
	init: function(obj) {

		this.content = $('#container');
		this.backgroundColor = '#FFF';
		this.color = '#222';
		this.flashunit = $('#flashcontent');

		$('#preloadText').text('LOADING');
		spinner = new Spinner(preview.spinConfig).spin(document.getElementById('preloadIcon'));

		// (OPTIONAL) VALUE OVERRIDE
		if(obj)
			for(var property in obj)
				preview[property] = obj[property];

		$(document.documentElement).css({'background-color':this.backgroundColor});
		$(document.body).css({
			'background-color':this.backgroundColor,
			'color':this.color
		});

		/* DECIDE WHAT TO DO */

		if(this.page)
		{
			if(this.img && !this.flash)
				this.preloadIMG(this.img);
			else
				this.loadBG(this.page);
		}
		else
			if(this.flash)
				this.initFlash(this.flash);
		else
			if(this.img)
				this.preloadIMG(this.img);

		
		/* END DECIDE WHAT TO DO */

		var titlestring = 'Joystick Interactive: ';

		if(this.title)
			document.title = titlestring+this.title;
		else
			document.title = titlestring+"Preview";

		if(this.title) 
			$('#header').html(this.title);
		else
			$('#header').html('');

		if(this.desc) {
			$('#byline').html(this.desc);
			$('#header').css('margin-bottom','0');
		}
		else
			$('#byline').html('');
	},
	initImage: function() {

		preview.killLoader();
		var pics = preview.img;

		preview.content.html('');
		
		for(var i=0; i < pics.length; i++)
		{
			// IMAGE HOLDER		
			var td = $('<div>').addClass('image').attr('id','img'+i)
				.append($('<h2>').addClass('header'))
				.append($('<img />').addClass('image').attr("src", pics[i].src))
				.append($('<div>').addClass('description'));

			if(pics[i].title) td.find('.header').text(pics[i].title);
			if(pics[i].desc) td.find('.description').text(pics[i].desc);

			if(pics[i].group)
			{
				td.addClass('grouped');

				if ($('#'+pics[i].group).length)
					td.appendTo('#'+pics[i].group);
				else
				{	
					var groupDiv = $('<div>')
					.attr('id',pics[i].group)
					.html(td);

					groupDiv.appendTo(preview.content);
				}
			}
			else
				td.appendTo(preview.content);
		}
	},
	initFlash: function(obj) {
		trace('Flash SWF detected... ');
		preview.killLoader();

		var params = {
			scale 	: "noscale",
			loop 	: "false",
			quality : "high",
			allowScriptAccess : "always"
		};
		var attributes = { id: "joystick" };	
		var flashvars = {};

		if(preview.fullscreen)
			params.allowfullscreen = "true";
		else
			params.wmode 	= "transparent";

		swfobject.embedSWF(obj.src, "unit", obj.w, obj.h, "9.0.0", false, flashvars, params, attributes);

		if(preview.page)
		{
			if(obj.y)
				this.flashunit.css({'top': obj.y+'px'});
			if(obj.x)
				this.flashunit.css({'left': obj.x+'px'});
		}
		else
			this.content.css({'width':obj.w+'px', 'height': obj.h+'px'});


		if(preview.pushdown)
			preview.initPushdown(preview.pushdown, obj);
	},
	killLoader: function() {
		spinner.stop();

		if(preview.isError)
			$('#preloadText').text('THERE WAS A PROBLEM, TRY RELOADING THE PAGE').css('color','red');
		else
			$('#preloader').remove();
	},
	preloadIMG: function(img_array) {
		
		var lcounter  = 0;
		for(var i = 0, j = img_array.length; i < j; i++)
		{
			var img = new Image();
				img.onload = function(){ 
					if(++lcounter == img_array.length)
						preview.initImage();
				};
	            img.onerror = function(e) {
	            	trace('failed loading. '+e);
	            	preview.isError = true;
	            	preview.killLoader();
	            };
				img.src = img_array[i].src;
		}
	},
	initPushdown: function(src, obj) {
		// PUSHDOWN STUFF
		
		if(preview.page && preview.flash)
		{
			trace('pushdown')
			preview.pd = $("#pushdown");
	
			
				preview.pdBGload(src);
	
			// CALCULATE PUSHDOWN OFFSET
			
			preview.col = obj.y + obj.minY;
			preview.exp	= obj.y + obj.h;
			preview.diff = obj.h - obj.minY;
			
			preview.pd.css({"top": preview.col+"px"});
			this.flashunit.css('background','#FFF');
	
			//trace('content: '+preview.content.height());
			//trace('flash offset: '+preview.flash.y);
		}
	},
	pdExpand: function() {
		trace('expand');
		TweenLite.to(preview.pd, 1, {y:preview.diff, ease:Linear.easeNone});
		
	},
	pdCollapse: function() {
		trace('collapse');
		TweenLite.to(preview.pd, 1, {y:0, ease:Linear.easeNone});
	},
	pdBGload: function(obj) {
		var img = new Image();
			img.onload = function() { 
				$('<img>').attr("src",obj).appendTo(preview.pd);
			};
			img.onerror = function(e) {
				$('<div>').attr('id','pd_placeholder')
					.append($('<div>').addClass('phtext').text('PUSHDOWN IMAGE FAILED TO LOAD. USING PLACEHOLDER ELEMENT TO TEST'))
					.css({
						'height': (preview.content.height()-(preview.flash.y+preview.flash.minY)) +'px',
						'width': preview.content.width()+'px'
					})
					.appendTo(preview.pd);
			};
			img.src = obj;
	},
	loadBG: function(obj) {
		
		var img = new Image();
			img.onload = function() { 
				trace('Background image specified. Disabling other visual elements');
				$('header').remove();
				preview.content.css({
					'background': 'url('+obj+') no-repeat',
					'width': img.width,
					'height': img.height
				});
				preview.killLoader();

				if(preview.flash)
					preview.initFlash(preview.flash);
				else
					if(this.img)
						preview.preloadIMG(preview.img);

			};
			img.onerror = function(e) {
				trace('failed loading. '+e);
			};
			img.src = obj;
		
	},
	spinConfig : {
		lines 		: 11,
		length 		: 3,
		width 		: 5,
		radius 		: 10,
		corners 	: 0.8,
		rotate 		: 0,
		direction 	: 1,
		color 		: '#666',
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

function expand()
{
	preview.pdExpand();
}
	
function collapse()
{
	preview.pdCollapse();
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