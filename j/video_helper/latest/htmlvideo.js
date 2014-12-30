var video={autoplay:!1,startmuted:!1,replaywithsound:!1,allowfullscreen:!1,colors:{scrubber_bg:"#000",scrubber_progress:"#666",scrubber_playback:"#FFF"},mTypes:{mp4:"video/mp4",ogv:"video/ogg",webm:"video/webm"},dom:{poster:null,container:null,controller:null,bigplay:null,bigsound:null,replay:null,spinner:null,pbar:null,phead:null},ismobile:!1,isfs:!1,zindex:null,proxy:null,firsttime:!0,playhead:0,duration:0,buffered:0,hasposter:!1,videoset:!1,init:function(e){if("object"==typeof e?$&&(video.dom.container=document.getElementById(e.attr("id"))):video.dom.container=document.getElementById(e),video.dom.container.style.backgroundColor="#000",video.dom.container.style.overflow="hidden",document.defaultView&&document.defaultView.getComputedStyle){var o=document.defaultView.getComputedStyle(video.dom.container,"");video.zindex=parseInt(o.getPropertyValue("z-index"),10)}else video.dom.container.currentStyle&&(video.zindex=parseInt(video.dom.container.currentStyle.zIndex,10));video.zindex||(video.zindex=0,console.log("z-index for video dom.container element not detected, make sure position property is set")),document.addEventListener("fullscreenchange",function(){console.log(document.fullscreen),video.isfs=!1},!1),document.addEventListener("mozfullscreenchange",function(){console.log(document.mozFullScreen),video.isfs=!1},!1),document.addEventListener("webkitfullscreenchange",function(){console.log(document.webkitIsFullScreen),video.isfs=!1},!1);var d=document.createElement("div");d.id="v_player",d.style.zIndex=video.zindex,d.style.position="absolute",video.dom.container.appendChild(d),video.dom.poster=document.createElement("img"),video.dom.poster.id="v_dom.poster",video.dom.poster.style.zIndex=video.zindex+2,video.dom.poster.style.position="absolute",video.dom.poster.style.backgroundColor="#000",video.dom.poster.style.display="block",video.dom.poster.style.width="100%",video.dom.poster.style.height="100%",video.dom.container.appendChild(video.dom.poster),video.dom.controller=document.createElement("div"),video.dom.controller.id="v_controls",video.dom.controller.style.display="block",video.dom.controller.style.zIndex=video.zindex+1,video.dom.controller.style.position="relative",video.dom.controller.style.height="25px",video.dom.controller.style.width="100%",video.dom.controller.style.top=video.dom.container.offsetHeight-25+"px",video.dom.controller.style.left=0,video.dom.container.appendChild(video.dom.controller);var i=document.createElement("div");i.id="v_controls_cbg",i.style.display="block",i.style.position="absolute",i.style.backgroundColor="#000",i.style.opacity=.6,i.style.width="100%",i.style.height="25px",video.dom.controller.appendChild(i);var t=document.createElement("div");t.style.position="relative",t.style.float="left",t.style.top="5px",t.style.marginLeft="10px",t.style.height="15px",t.style.width="15px",video.dom.controller.appendChild(t);var l=document.createElement("span");l.id="v_controls_btn_play",l.className="cbtn fa fa-play",l.style.display="block",l.style.position="absolute",l.style.cursor="pointer",l.style.color="#FFF",l.style.fontSize="15px",t.appendChild(l);var n=document.createElement("span");if(n.id="v_controls_btn_pause",n.className="cbtn fa fa-pause",n.style.display="block",n.style.position="absolute",n.style.cursor="pointer",n.style.color="#FFF",n.style.fontSize="15px",n.style.display="none",t.appendChild(n),video.allowfullscreen){var s=document.createElement("span");s.id="v_controls_btn_fs",s.className="cbtn fa fa-expand",s.style.display="block",s.style.float="right",s.style.position="relative",s.style.cursor="pointer",s.style.color="#FFF",s.style.top="5px",s.style.marginRight="10px",video.dom.controller.appendChild(s)}var r=document.createElement("div");r.style.position="relative",r.style.float="right",r.style.top="4px",r.style.marginRight="10px",r.style.height="15px",r.style.width="15px",r.style.textAlign="left",video.dom.controller.appendChild(r);var a=document.createElement("span");a.id="v_controls_btn_mute",a.className="cbtn fa fa-volume-up",a.style.display="block",a.style.position="absolute",a.style.cursor="pointer",a.style.color="#FFF",a.style.fontSize="18px",r.appendChild(a);var p=document.createElement("span");p.id="v_controls_btn_unmute",p.className="cbtn fa fa-volume-off",p.style.display="block",p.style.position="absolute",p.style.cursor="pointer",p.style.color="#FFF",p.style.fontSize="18px",p.style.display="none",r.appendChild(p);var v=document.createElement("div");v.id="v_controls_scrubber",v.style.position="absolute",v.style.display="block",v.style.height="4px",v.style.width="100%",v.style.top="-4px",v.style.cursor="pointer",v.style.backgroundColor=video.colors.scrubber_bg,video.dom.controller.appendChild(v),video.dom.pbar=document.createElement("div"),video.dom.pbar.id="v_controls_scrubber_progress",video.dom.pbar.style.position="absolute",video.dom.pbar.style.display="block",video.dom.pbar.style.height="100%",video.dom.pbar.style.width=0,video.dom.pbar.style.top=0,video.dom.pbar.style.backgroundColor=video.colors.scrubber_progress,v.appendChild(video.dom.pbar),video.dom.phead=document.createElement("div"),video.dom.phead.id="v_controls_scrubber_playback",video.dom.phead.style.position="absolute",video.dom.phead.style.display="block",video.dom.phead.style.height="100%",video.dom.phead.style.width=0,video.dom.phead.style.top=0,video.dom.phead.style.backgroundColor=video.colors.scrubber_playback,v.appendChild(video.dom.phead),video.dom.bigplay=document.createElement("span"),video.dom.bigplay.id="v_controls_btn_dom.bigplay",video.dom.bigplay.className="cbtn v_controls_bb fa fa-play-circle-o fa-4x",video.dom.bigplay.style.zIndex=video.zindex+3,video.dom.bigplay.style.display="block",video.dom.bigplay.style.position="absolute",video.dom.bigplay.style.cursor="pointer",video.dom.bigplay.style.color="#FFF",video.dom.bigplay.style.textShadow="0px 0px 14px rgba(0, 0, 0, 1)",video.dom.container.appendChild(video.dom.bigplay),video.dom.bigplay.style.top=(video.dom.container.offsetHeight-video.dom.bigplay.offsetHeight)/2+"px",video.dom.bigplay.style.left=(video.dom.container.offsetWidth-video.dom.bigplay.offsetWidth)/2+"px",video.dom.bigplay.style.display="none",video.dom.replay=document.createElement("span"),video.dom.replay.id="v_controls_btn_bigdom.replay",video.dom.replay.className="cbtn v_controls_bb fa fa-repeat fa-3x",video.dom.replay.style.zIndex=video.zindex+3,video.dom.replay.style.display="block",video.dom.replay.style.position="absolute",video.dom.replay.style.cursor="pointer",video.dom.replay.style.color="#FFF",video.dom.replay.style.textShadow="0px 0px 14px rgba(0, 0, 0, 1)",video.dom.container.appendChild(video.dom.replay),video.dom.replay.style.top=(video.dom.container.offsetHeight-video.dom.replay.offsetHeight)/2+"px",video.dom.replay.style.left=(video.dom.container.offsetWidth-video.dom.replay.offsetWidth)/2+"px",video.dom.replay.style.display="none",video.dom.bigsound=document.createElement("span"),video.dom.bigsound.id="v_controls_clickforsound",video.dom.bigsound.className="cbtn v_controls_bb fa fa-volume-up fa-3x",video.dom.bigsound.style.zIndex=video.zindex+3,video.dom.bigsound.style.display="block",video.dom.bigsound.style.position="absolute",video.dom.bigsound.style.cursor="pointer",video.dom.bigsound.style.color="#FFF",video.dom.bigsound.style.textShadow="0px 0px 14px rgba(0, 0, 0, 1)",video.dom.container.appendChild(video.dom.bigsound),video.dom.bigsound.style.top=(video.dom.container.offsetHeight-video.dom.bigsound.offsetHeight)/2+"px",video.dom.bigsound.style.left=(video.dom.container.offsetWidth-video.dom.bigsound.offsetWidth)/2+"px",video.dom.bigsound.style.display="none",video.dom.spinner=document.createElement("span"),video.dom.spinner.id="v_controls_dom.spinner",video.dom.spinner.className="v_controls_bb fa fa-circle-o-notch fa-spin fa-3x",video.dom.spinner.style.zIndex=video.zindex+3,video.dom.spinner.style.display="block",video.dom.spinner.style.position="absolute",video.dom.spinner.style.color="#FFF",video.dom.spinner.style.textShadow="0px 0px 14px rgba(0, 0, 0, 1)",video.dom.container.appendChild(video.dom.spinner),video.dom.spinner.style.top=(video.dom.container.offsetHeight-video.dom.spinner.offsetHeight)/2+"px",video.dom.spinner.style.left=(video.dom.container.offsetWidth-video.dom.spinner.offsetWidth)/2+"px",video.dom.spinner.style.display="none",l.addEventListener("click",video.controlHandler),n.addEventListener("click",video.controlHandler),a.addEventListener("click",video.controlHandler),p.addEventListener("click",video.controlHandler),video.allowfullscreen&&s.addEventListener("click",video.controlHandler),video.dom.pbar.addEventListener("click",video.barSeek),video.dom.phead.addEventListener("click",video.barSeek),video.dom.container.addEventListener("mouseenter",function(e){video.isfs||video.ismobile||!video.videostarted||"block"==video.dom.bigsound.style.display||"block"==video.dom.replay.style.display||"block"==video.dom.bigplay.style.display||(video.dom.controller.style.display="block")}),video.dom.container.addEventListener("mouseleave",function(e){video.dom.controller.style.display="none"}),document.getElementById("v_controls_btn_dom.bigplay").addEventListener("click",video.controlHandler),document.getElementById("v_controls_clickforsound").addEventListener("click",video.controlHandler),document.getElementById("v_controls_btn_bigdom.replay").addEventListener("click",video.controlHandler)},barSeek:function(e){var o=e.pageX-video.dom.pbar.getBoundingClientRect().left,d=o/video.dom.container.offsetWidth;video.seek(video.duration*d),"block"==document.getElementById("v_controls_btn_play").style.display&&video.proxy.play()},seek:function(e){video.proxy.currentTime=e},load:function(e,o){video.firsttime=!0,video.destroy(),video.dom.spinner.style.display="block",o?(video.hasposter=!0,video.setPoster(o)):video.hasposter=!1,setTimeout(function(){var o=document.createElement("video");if(o.id="v_element",o.width=video.dom.container.offsetWidth,o.height=video.dom.container.offsetHeight,document.getElementById("v_player").appendChild(o),video.autoplay&&!video.ismobile&&o.setAttribute("autoplay",!0),video.ismobile&&(o.setAttribute("controls",!0),video.dom.controller.style.display="none"),"object"==typeof e)e.forEach(function(e){var d=document.createElement("source");d.src=e,d.type=video.getMediaType(e),o.appendChild(d)});else{var d=document.createElement("source");d.src=e,d.type=video.getMediaType(e),o.appendChild(d)}video.proxy=document.getElementById("v_element"),video.setListeners(),!video.hasposter&&video.ismobile&&(video.dom.spinner.style.display="none",video.dom.bigplay.style.display="block"),video.proxy.style.display="none",video.proxy.addEventListener("click",video.controlHandler)},500)},setPoster:function(e){var o=new Image;o.onload=function(){console.log("loaded: "+e),video.dom.poster.src=e,video.dom.poster.style.display="block",video.ismobile&&(video.dom.spinner.style.display="none",video.dom.bigplay.style.display="block")},o.src=e},destroy:function(){video.videostarted=!1,isfs=!1,video.proxy&&(console.log("destroying player"),video.removeListeners(),video.dom.bigplay.style.display="none",video.dom.bigsound.style.display="none",video.dom.replay.style.display="none",video.dom.poster.style.display="none",video.dom.controller.style.display="none",video.proxy.pause(),video.proxy.src="",video.proxy.load(),video.proxy.parentNode.removeChild(video.proxy),video.proxy=null,document.getElementById("v_player").innerHTML="")},setListeners:function(){video.proxy.addEventListener("ended",video.dlEnded),video.proxy.addEventListener("play",video.dlPlay),video.proxy.addEventListener("pause",video.dlPause),video.proxy.addEventListener("volumechange",video.dlVolumeChange),video.proxy.addEventListener("timeupdate",video.dlTimeUpdate),video.proxy.addEventListener("canplay",video.dlCanPlay),video.proxy.addEventListener("progress",video.dlProgress)},removeListeners:function(){video.proxy.removeEventListener("ended",video.dlEnded),video.proxy.removeEventListener("play",video.dlPlay),video.proxy.removeEventListener("pause",video.dlPause),video.proxy.removeEventListener("volumechange",video.dlVolumeChange),video.proxy.removeEventListener("timeupdate",video.dlTimeUpdate),video.proxy.removeEventListener("canplay",video.dlCanPlay)},dlEnded:function(){video.hasposter?video.dom.poster.style.display="block":video.ismobile||(video.dom.replay.style.display="block",video.dom.controller.style.display="none"),video.dom.replay.style.display="block",video.proxy.style.display="none",video.dom.bigsound.style.display="none",video.ulEnded()},dlPlay:function(){document.getElementById("v_controls_btn_pause").style.display="block",document.getElementById("v_controls_btn_play").style.display="none",video.startmuted&&video.autoplay&&!video.ismobile&&video.firsttime&&(video.proxy.muted=!0),video.ulPlay()},dlPause:function(){document.getElementById("v_controls_btn_pause").style.display="none",document.getElementById("v_controls_btn_play").style.display="block",video.ulPause()},dlVolumeChange:function(){video.proxy.muted?(document.getElementById("v_controls_btn_mute").style.display="none",document.getElementById("v_controls_btn_unmute").style.display="block"):(document.getElementById("v_controls_btn_mute").style.display="block",document.getElementById("v_controls_btn_unmute").style.display="none",video.dom.bigsound.style.display="none"),video.ulVolumeChange()},dlProgress:function(){for(var e=0;e<video.proxy.buffered.length;e++)video.buffered=video.proxy.buffered.end(e)/video.duration*100;video.dom.pbar.style.width=video.buffered+"%",video.ulProgress()},dlTimeUpdate:function(){video.firsttime&&(video.firsttime=!1,video.videostarted=!0,video.startmuted&&video.autoplay&&!video.ismobile&&(video.proxy.muted=!0,video.dom.bigsound.style.display="block",video.dom.controller.style.display="none")),"block"===video.dom.bigplay.style.display&&(video.dom.bigplay.style.display="none"),"block"===video.dom.replay.style.display&&(video.dom.replay.style.display="none"),"block"===video.dom.spinner.style.display&&(video.dom.spinner.style.display="none"),"block"===video.dom.poster.style.display&&(video.dom.poster.style.display="none"),"none"===video.proxy.style.display&&(video.proxy.style.display="block"),video.playhead=video.proxy.currentTime,video.duration=video.proxy.duration;var e=video.playhead/video.duration*100;video.dom.phead.style.width=e+"%",video.ulTimeUpdate()},dlCanPlay:function(){video.firsttime&&(video.autoplay||(video.dom.spinner.style.display="none",video.ismobile||(video.dom.bigplay.style.display="block")),video.hasposter||video.autoplay||video.ismobile||(console.log("no dom.poster"),video.dom.bigplay.style.display="block",video.dom.controller.style.display="none"),video.ulCanPlay())},ulEnded:function(){console.log("Video Ended")},ulPlay:function(){console.log("Video Play")},ulPause:function(){console.log("Video Paused")},ulVolumeChange:function(){console.log("Video Volume Change")},ulProgress:function(){},ulTimeUpdate:function(){},ulCanPlay:function(){console.log("Video Ready")},controlHandler:function(e){switch(e.currentTarget.id){case"v_controls_btn_play":video.proxy.play();break;case"v_controls_btn_pause":video.proxy.pause();break;case"v_controls_btn_mute":video.proxy.muted=!0;break;case"v_controls_btn_unmute":video.proxy.muted=!1;break;case"v_controls_btn_fs":video.goFS();break;case"v_controls_btn_dom.bigplay":video.proxy.play(),video.dom.spinner.style.display="block",video.dom.bigplay.style.display="none";break;case"v_controls_btn_bigdom.replay":video.proxy.play(),video.dom.spinner.style.display="none",(video.replaywithsound||video.ismobile)&&(video.proxy.muted=!1),video.dom.controller.style.display=video.ismobile?"none":"block";break;case"v_controls_clickforsound":video.proxy.muted=!1,video.seek(0),video.dom.controller.style.display="block";break;case"v_element":"block"!=document.getElementById("v_controls_btn_play").style.display||"none"!=document.getElementById("v_controls_clickforsound").style.display||video.ismobile||video.proxy.play(),"block"!=document.getElementById("v_controls_btn_pause").style.display||"none"!=document.getElementById("v_controls_clickforsound").style.display||video.ismobile||video.proxy.pause()}},goFS:function(){console.log("request fullscreen"),video.proxy.requestFullscreen?(video.proxy.requestFullscreen(),video.isfs=!0):video.proxy.mozRequestFullScreen?(video.proxy.mozRequestFullScreen(),video.isfs=!0):video.proxy.webkitRequestFullscreen&&(video.proxy.webkitRequestFullscreen(),video.isfs=!0)},getMediaType:function(e){return video.mTypes[e.split(".")[e.split(".").length-1]]}};