/*
	HELPER CLASS FOR GMAPS.JS
	v1.0
	(c) 2013 Carlo Santos

	DOCS: nargalzius.github.io/ajax/joystick/gmaps_helper
*/
var debug = false;
var map;
var shiv = {
	center: '40.72423,-73.999186',
	zoom: 13,
	container: '#map',
	template: null,
	icon: null,
	iwID: 'infoWindow',
	w: null,
	h: null,
	init: function(obj)
	{
		// (OPTIONAL) VALUE OVERRIDE
		if(obj)
			for(var property in obj)
				shiv[property] = obj[property];

		if(this.w && this.h)
			$(this.container).css({"width": this.w+"px", "height": this.h+"px"});

		this.proxy = map = new GMaps({
			div: this.container,
			zoom: this.zoom,
			lat: this.center.split(',')[0],
			lng: this.center.split(',')[1]
		});

		if(this.markers)
		{
			if(shiv.template)
				trace("Using custom template");

			for(var i=0; i<this.markers.length; i++)
			{
				this.addMarker(this.markers[i], i);
			}
		}

	},
	addMarker: function(obj, id) {

		var info = null;
		var mIcon = shiv.icon; // DEFAULT ICON

		if(obj.icon)
			mIcon = obj.icon;

		if(obj.info)
			if(shiv.template)
				info = shiv.template(id);
			else
				info = shiv.translateMarkerInfo(obj.info)

		shiv.proxy.addMarker({
  			lat: obj.loc.split(',')[0],
  			lng: obj.loc.split(',')[1],
  			click: function(e){
  				trace("Marker Clicked: "+shiv.proxy.markers.indexOf(e));
  			},
  			infoWindow: info,
  			icon: mIcon
		});
	},
	translateMarkerInfo: function(obj)
	{
		var tempIWC = $('<div>');

		if(typeof(obj)=='object')
		{
			if(obj.pic || obj.header || obj.details)
			{
				// GENERATE GENERIC TEMPLATE (PIC, HEADER, DETAILS)
				tempIWC.append($('<div>').addClass(shiv.iwID)
					.append($('<img>').addClass('pic'))
					.append($('<div>').addClass('info')
						.append($('<div>').addClass('header'))
						.append($('<div>').addClass('details'))
					)
				);
					
				if(obj.pic)
					tempIWC.find('.pic').attr('src', obj.pic);
				else
					tempIWC.find('.pic').remove();

				if(obj.header)
					tempIWC.find('.header').text(obj.header);
				else
					tempIWC.find('.header').remove();

				if(obj.details)
					tempIWC.find('.details').text(obj.details);
				else
					tempIWC.find('.details').remove();
			}			
		}
		else
		{
			tempIWC.append($('<div>').addClass(shiv.iwID)
				.append( $('<div>').addClass('info').text(obj) ) );
		}
		
		return { content: tempIWC.html().toString() };

	},
	hidePopups: function() {
		shiv.proxy.hideInfoWindows();
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

function generateIWC(obj)
{
    return $('<div>').addClass(shiv.iwID).html(obj.wrap('<p>').parent().html()).wrap('<p>').parent().html().toString();
}