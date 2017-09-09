function MapHelper(){}if(void 0===window.GMapAPILoaded){window.GMapAPILoaded=!1;var tag=document.createElement("script");tag.src="https://maps.googleapis.com/maps/api/js?v=3.exp&callback=GMapAPIinit",window.GMapAPIKey&&(tag.src+="&key="+window.GMapAPIKey);var firstScriptTag=document.getElementsByTagName("script")[0];firstScriptTag.parentNode.insertBefore(tag,firstScriptTag);var GMapAPIinit=function(){window.GMapAPILoaded=!0,void 0!==window.EventBus&&EventBus.dispatch("MAP_LOADED",window),window.console&&"undefined"!=typeof debug&&debug&&console.log("GoogleMaps API loaded")}}MapHelper.prototype={params:{debug:!1,center:null,zoom:15,id:"map",obtrusive:!0,address:"New York, USA",draggable:!0,disableDoubleClickZoom:!0,mapType:"road",minZoom:2,maxZoom:15,chromeless:!0},mapTypes:{road:"ROADMAP",hybrid:"HYBRID",satellite:"SATELLITE",terrain:"TERRAIN"},proxy:null,infoWindow:null,IWparams:{element:null,autopan:!0},delayed:{arg:null,callback:null},ready:!1,init:function(e,t){var a=this;if(e&&(this.delayed.arg=e),t&&(this.delayed.callback=t),GMapAPILoaded)if(this.ready)this.trace("Map already initialized");else{switch(this.params.chromeless?this.params.disableDefaultUI=!1:this.params.disableDefaultUI=!0,this.trace(this.get_objecttype(this.delayed.arg)+" detected"),this.get_objecttype(this.delayed.arg)){case"[object String]":this.params.id=this.delayed.arg,document.getElementById(this.params.id);break;case"[object Object]":var i={};for(var o in this.params)i[o]=this.params[o];for(var s in this.delayed.arg)i[s]=this.delayed.arg[s];this.params=i;break;default:this.trace("blank")}this.params.center?(this.params.center=this.get_latlng(this.params.center),this.delayed.callback?this.startmap(this.delayed.callback):this.startmap()):this.params.obtrusive?this.locate_user_gps(function(e){e&&(a.trace("location: "+e),a.params.center=e,a.delayed.callback?a.startmap(a.delayed.callback):a.startmap())}):this.locate_rigged(function(e){a.params.center=e,a.delayed.callback?a.startmap(a.delayed.callback):a.startmap()})}else setTimeout(function(){a.init()},1e3)},startmap:function(e){var t=this;this.ready?this.trace("Map already initialized"):(this.evaluate(),this.proxy=new google.maps.Map(document.getElementById(this.params.id),this.params),this.proxy.addListener("zoom_changed",function(){t.trace("Zoom Level: "+t.proxy.getZoom())}),this.infoWindow=new google.maps.InfoWindow({disableAutoPan:this.IWparams.autopan}),this.ready=!0,e&&e(),this.init_cleanup())},evaluate:function(){this.set_maptype(this.params.mapType,!0),this.params.disableDefaultUI=this.params.chromeless},set_maptype:function(e,t){if(GMapAPILoaded)if("road"===e||"terrain"===e||"satellite"===e||"hybrid"===e){this.trace("Changing map type to: "+e);var a=google.maps.MapTypeId[this.mapTypes[e]];this.proxy&&this.proxy.setMapTypeId(a),t&&(this.params.mapTypeId=a,this.params.mapType=e)}else this.params.mapType?this.trace('Invalid Map Type, choose from: "road", "hybrid", "satellite", and "terrain"'):this.trace("Using default map type (road)")},get_staticmap:function(e,t,a){var i;i=a||this.params.zoom;var o=document.getElementById(e).offsetHeight;return"https://maps.googleapis.com/maps/api/staticmap?center="+t+"&zoom="+i+"&size="+document.getElementById(e).offsetWidth+"x"+o},resize:function(){var e=this;google.maps.event.trigger(e.proxy,"resize")},zoom:function(e){this.ready&&this.proxy.setZoom(e)},center:function(e,t,a){if(this.ready){var i;if(i=e?this.get_latlng(e):this.params.center,e&&t)switch(this.get_objecttype(t)){case"[object Object]":t.replace&&(this.params.center=i);var o=0,s=0;t.x&&(o=t.x),t.y&&(s=-1*t.y);var n=Math.pow(2,this.proxy.getZoom()),r=new google.maps.LatLng(this.proxy.getBounds().getNorthEast().lat(),this.proxy.getBounds().getSouthWest().lng()),l=this.proxy.getProjection().fromLatLngToPoint(i),c=new google.maps.Point(o/n||0,s/n||0),d=new google.maps.Point(l.x-c.x,l.y+c.y);i=this.proxy.getProjection().fromPointToLatLng(d);break;default:this.params.center=i}a?this.proxy.setCenter(i):this.proxy.panTo(i)}},locate_user_gps:function(e,t){var a=this;if(e&&GMapAPILoaded){var i,o=function(o){a.trace("location accuracy: "+o.coords.accuracy),i=a.get_latlng([o.coords.latitude,o.coords.longitude]),t&&a.proxy.setCenter(i),e?e(i):a.trace(i)},s=function(t){a.trace("error or location not found: "+t),i=t,a.locate_rigged(e)};navigator.geolocation.getCurrentPosition(o,s)}},locate_find:function(e,t){var a=this;if(GMapAPILoaded){this.trace("finding: "+e);(new google.maps.Geocoder).geocode({address:e},function(i,o){o===google.maps.GeocoderStatus.OK?(a.trace("coordinates for "+e+" is: "+i[0].geometry.location),t(i[0].geometry.location)):(a.trace("Geocode was not successful for the following reason: "+o),t(null))})}},locate_resolve:function(e,t){if(GMapAPILoaded){var a=this;this.trace("resolve: "+e);(new google.maps.Geocoder).geocode({latLng:this.get_latlng(e)},function(e,i){i===google.maps.GeocoderStatus.OK?e?(a.trace("success"),t(e)):(a.trace("no results"),t(null)):(a.trace("reverse geocoding failed due to: "+i),t(null))})}},locate_rigged:function(e){GMapAPILoaded&&this.locate_find(this.params.address,function(t){e&&e(t)})},infowindow_show:function(e,t){if(e.info){var a=document.createElement("div");if(a.className="infoWindow",t)a.appendChild(t);else{var i;"[object String]"===this.get_objecttype(e.info)?(i=document.createElement("div"),i.className="info default text",i.innerHTML=e.info):i="[object Function]"===this.get_objecttype(e.info)?e.info():e.info,a.appendChild(i)}this.infoWindow.setContent(a),this.infoWindow.open(this.proxy,e),this.trace("showing infoWindow for marker "+e.id)}},infowindow_hide:function(){this.infoWindow.setContent(""),this.infoWindow.close(),this.trace("hiding infoWindow")},marker_log:{index:0,markers:[],locations:[]},marker_add:function(e){if(this.ready){var t=this.get_latlng(e.loc),a=new google.maps.Marker({id:null,map:this.proxy,position:t,events:null,info:null,loc:t});e.icon&&a.setIcon(e.icon),e.info&&(a.info=e.info),e.events&&(a.events=e.events),a.id=this.marker_log.index,this.marker_log.locations||(this.marker_log.locations=[]),this.marker_log.locations.push(a.position),this.marker_log.markers.push(a),this.marker_log.index++,a.setMap(this.proxy),this.listeners_add(a),this.trace(a)}},markers_fit:function(e){if(this.ready){var t=new google.maps.LatLngBounds;0===this.marker_log.locations.length&&this.marker_log.locations.push(this.params.center),this.marker_log.locations.forEach(function(e){t.extend(e)}),this.proxy.setCenter(t.getCenter()),e?this.proxy.panToBounds(t):this.proxy.fitBounds(t)}},markers_show:function(){this.ready&&this.markers_set(this.proxy)},markers_hide:function(){this.ready&&this.markers_set(null)},markers_clear:function(){for(var e=0;e<this.marker_log.markers.length;e++){var t=this.marker_log.markers[e];this.listeners_remove(t)}this.markers_set(null),this.marker_log.arrayid=0,this.marker_log.markers=[],this.marker_log.locations=[]},markers_set:function(e){this.ready&&this.marker_log.markers.length&&this.marker_log.markers.forEach(function(t){t.setMap(e)})},listeners_add:function(e){var t=this;google.maps.event.addListener(e,"click",function(){this.events&&this.events.click?this.events.click(this):t.trace("clicked on marker: "+this.id)}),google.maps.event.addListener(e,"dblclick",function(){this.events&&this.events.dclick&&this.events.dclick(this)}),google.maps.event.addListener(e,"mouseover",function(){this.events&&this.events.over&&this.events.over(this)}),google.maps.event.addListener(e,"mouseout",function(){this.events&&this.events.out&&this.events.out(this)})},listeners_remove:function(e){google.maps.event.clearListeners(e,"click"),google.maps.event.clearListeners(e,"dblclick"),google.maps.event.clearListeners(e,"mouseover"),google.maps.event.clearListeners(e,"mouseout")},get_distance:function(e,t,a){if(GMapAPILoaded){var i=function(e){return e*Math.PI/180},o=this.get_latlng(e),s=this.get_latlng(t),n=6371e3,r=621371e-9,l=i(s.lat()-o.lat()),c=i(s.lng()-o.lng()),d=Math.sin(l/2)*Math.sin(l/2)+Math.cos(i(o.lat()))*Math.cos(i(s.lat()))*Math.sin(c/2)*Math.sin(c/2),h=2*Math.atan2(Math.sqrt(d),Math.sqrt(1-d)),p=6371e3*h;p=.01*Math.round(621371e-9*p*100);var g=Number(p.toFixed(1));if(!a)return g;a(g)}},get_latlng:function(e,t){if(GMapAPILoaded){var a;switch(this.get_objecttype(e)){case"[object String]":a=new google.maps.LatLng(e.split(",")[0],e.split(",")[1]);break;case"[object Array]":a=new google.maps.LatLng(e[0],e[1]);break;case"[object Object]":a=e;break}if(!t)return a;t(a)}},trace:function(e){window.console&&this.params.debug&&console.log(e)},get_objecttype:function(e){return Object.prototype.toString.call(e)},init_cleanup:function(){this.delayed.callback=null,this.delayed.arg=null},destroy:function(){this.ready?(this.markers_clear(),google.maps.event.clearListeners(this.proxy,"zoom_changed"),this.infoWindow=null,this.proxy=null,document.getElementById(this.params.id).innerHTML="",this.ready=!1):this.trace("nothing to destroy")}};