var cssId="fontAwesome";if(!document.getElementById(cssId)){var head=document.getElementsByTagName("head")[0],link=document.createElement("link");link.id=cssId,link.rel="stylesheet",link.type="text/css",link.href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css",link.media="all",head.appendChild(link)}var video={debug:!1,autoplay:!1,startmuted:!1,replaywithsound:!1,allowfullscreen:!1,playonseek:!0,colors:{scrubber_bg:"#000",scrubber_progress:"#666",scrubber_playback:"#FFF"},mTypes:{mp4:"video/mp4",ogv:"video/ogg",webm:"video/webm"},dom:{debug:null,poster:null,container:null,controller:null,bigplay:null,bigsound:null,replay:null,spinner:null,pbar:null,phead:null,play:null,pause:null,mute:null,unmute:null,fs:null},isinitialized:!1,ismobile:null,isfs:!1,zindex:null,proxy:null,firsttime:!0,playhead:0,duration:0,buffered:0,hasposter:!1,videoset:!1,init:function(e){if(video.isinitialized)video.trace("already initialized");else{if(null===video.ismobile&&!function(e,o){/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4))?(video.ismobile=!0,video.trace("mobile browser detected")):(video.ismobile=!1,video.trace("desktop browser detected"))}(navigator.userAgent||navigator.vendor||window.opera),"object"==typeof e?$&&(video.dom.container=document.getElementById(e.attr("id"))):video.dom.container=document.getElementById(e),video.dom.container.style.backgroundColor="#000",video.dom.container.style.overflow="hidden",document.defaultView&&document.defaultView.getComputedStyle){var o=document.defaultView.getComputedStyle(video.dom.container,"");video.zindex=parseInt(o.getPropertyValue("z-index"),10)}else video.dom.container.currentStyle&&(video.zindex=parseInt(video.dom.container.currentStyle.zIndex,10));video.zindex||(video.zindex=0,console.log("z-index for video container element not detected, make sure position property is set\nzIndex set to 0")),document.addEventListener("fullscreenchange",function(){video.trace(document.fullscreen),video.isfs=!1},!1),document.addEventListener("mozfullscreenchange",function(){video.trace(document.mozFullScreen),video.isfs=!1},!1),document.addEventListener("webkitfullscreenchange",function(){video.trace(document.webkitIsFullScreen),video.isfs=!1},!1);var d=document.createElement("div");d.id="v_player",d.style.zIndex=video.zindex,d.style.position="absolute",video.dom.container.appendChild(d),video.dom.poster=document.createElement("img"),video.dom.poster.id="v_poster",video.dom.poster.style.zIndex=video.zindex+2,video.dom.poster.style.position="absolute",video.dom.poster.style.backgroundColor="#000",video.dom.poster.style.display="block",video.dom.poster.style.width="100%",video.dom.poster.style.height="100%",video.dom.container.appendChild(video.dom.poster),video.dom.controller=document.createElement("div"),video.dom.controller.id="v_controls",video.dom.controller.style.display="block",video.dom.controller.style.zIndex=video.zindex+1,video.dom.controller.style.position="relative",video.dom.controller.style.height="25px",video.dom.controller.style.width="100%",video.dom.controller.style.top=video.dom.container.offsetHeight-25+"px",video.dom.controller.style.left=0,video.dom.container.appendChild(video.dom.controller);var i=document.createElement("div");i.id="v_controls_cbg",i.style.display="block",i.style.position="absolute",i.style.backgroundColor="#000",i.style.opacity=.6,i.style.width="100%",i.style.height="25px",video.dom.controller.appendChild(i);var t=document.createElement("div");t.style.position="relative",t.style["float"]="left",t.style.top="5px",t.style.marginLeft="10px",t.style.height="15px",t.style.width="15px",video.dom.controller.appendChild(t),video.dom.play=document.createElement("span"),video.dom.play.id="v_controls_btn_play",video.dom.play.className="cbtn fa fa-play",video.dom.play.style.display="block",video.dom.play.style.position="absolute",video.dom.play.style.cursor="pointer",video.dom.play.style.color="#FFF",video.dom.play.style.fontSize="15px",t.appendChild(video.dom.play),video.dom.pause=document.createElement("span"),video.dom.pause.id="v_controls_btn_pause",video.dom.pause.className="cbtn fa fa-pause",video.dom.pause.style.display="block",video.dom.pause.style.position="absolute",video.dom.pause.style.cursor="pointer",video.dom.pause.style.color="#FFF",video.dom.pause.style.fontSize="15px",video.dom.pause.style.display="none",t.appendChild(video.dom.pause),video.allowfullscreen&&(video.dom.fs=document.createElement("span"),video.dom.fs.id="v_controls_btn_fs",video.dom.fs.className="cbtn fa fa-expand",video.dom.fs.style.display="block",video.dom.fs.style["float"]="right",video.dom.fs.style.position="relative",video.dom.fs.style.cursor="pointer",video.dom.fs.style.color="#FFF",video.dom.fs.style.top="5px",video.dom.fs.style.marginRight="10px",video.dom.controller.appendChild(video.dom.fs));var l=document.createElement("div");l.style.position="relative",l.style["float"]="right",l.style.top="4px",l.style.marginRight="10px",l.style.height="15px",l.style.width="15px",l.style.textAlign="left",video.dom.controller.appendChild(l),video.dom.mute=document.createElement("span"),video.dom.mute.id="v_controls_btn_mute",video.dom.mute.className="cbtn fa fa-volume-up",video.dom.mute.style.display="block",video.dom.mute.style.position="absolute",video.dom.mute.style.cursor="pointer",video.dom.mute.style.color="#FFF",video.dom.mute.style.fontSize="18px",l.appendChild(video.dom.mute),video.dom.unmute=document.createElement("span"),video.dom.unmute.id="v_controls_btn_unmute",video.dom.unmute.className="cbtn fa fa-volume-off",video.dom.unmute.style.display="block",video.dom.unmute.style.position="absolute",video.dom.unmute.style.cursor="pointer",video.dom.unmute.style.color="#FFF",video.dom.unmute.style.fontSize="18px",video.dom.unmute.style.width="18px",video.dom.unmute.style.display="none",l.appendChild(video.dom.unmute);var n=document.createElement("div");n.id="v_controls_scrubber",n.style.position="absolute",n.style.display="block",n.style.height="4px",n.style.width="100%",n.style.top="-4px",n.style.cursor="pointer",n.style.backgroundColor=video.colors.scrubber_bg,video.dom.controller.appendChild(n),video.dom.pbar=document.createElement("div"),video.dom.pbar.id="v_controls_scrubber_progress",video.dom.pbar.style.position="absolute",video.dom.pbar.style.display="block",video.dom.pbar.style.height="100%",video.dom.pbar.style.width=0,video.dom.pbar.style.top=0,video.dom.pbar.style.backgroundColor=video.colors.scrubber_progress,n.appendChild(video.dom.pbar),video.dom.phead=document.createElement("div"),video.dom.phead.id="v_controls_scrubber_playback",video.dom.phead.style.position="absolute",video.dom.phead.style.display="block",video.dom.phead.style.height="100%",video.dom.phead.style.width=0,video.dom.phead.style.top=0,video.dom.phead.style.backgroundColor=video.colors.scrubber_playback,n.appendChild(video.dom.phead),video.dom.bigplay=document.createElement("span"),video.dom.bigplay.id="v_controls_btn_bigplay",video.dom.bigplay.className="cbtn v_controls_bb fa fa-play-circle-o fa-4x",video.dom.bigplay.style.zIndex=video.zindex+3,video.dom.bigplay.style.display="block",video.dom.bigplay.style.position="absolute",video.dom.bigplay.style.cursor="pointer",video.dom.bigplay.style.color="#FFF",video.dom.bigplay.style.textShadow="0px 0px 14px rgba(0, 0, 0, 1)",video.dom.container.appendChild(video.dom.bigplay),video.dom.bigplay.style.top=(video.dom.container.offsetHeight-video.dom.bigplay.offsetHeight)/2+"px",video.dom.bigplay.style.left=(video.dom.container.offsetWidth-video.dom.bigplay.offsetWidth)/2+"px",video.dom.bigplay.style.display="none",video.dom.replay=document.createElement("span"),video.dom.replay.id="v_controls_btn_bigreplay",video.dom.replay.className="cbtn v_controls_bb fa fa-repeat fa-3x",video.dom.replay.style.zIndex=video.zindex+3,video.dom.replay.style.display="block",video.dom.replay.style.position="absolute",video.dom.replay.style.cursor="pointer",video.dom.replay.style.color="#FFF",video.dom.replay.style.textShadow="0px 0px 14px rgba(0, 0, 0, 1)",video.dom.container.appendChild(video.dom.replay),video.dom.replay.style.top=(video.dom.container.offsetHeight-video.dom.replay.offsetHeight)/2+"px",video.dom.replay.style.left=(video.dom.container.offsetWidth-video.dom.replay.offsetWidth)/2+"px",video.dom.replay.style.display="none",video.dom.bigsound=document.createElement("span"),video.dom.bigsound.id="v_controls_clickforsound",video.dom.bigsound.className="cbtn v_controls_bb fa fa-volume-up fa-3x",video.dom.bigsound.style.zIndex=video.zindex+3,video.dom.bigsound.style.display="block",video.dom.bigsound.style.position="absolute",video.dom.bigsound.style.cursor="pointer",video.dom.bigsound.style.color="#FFF",video.dom.bigsound.style.textShadow="0px 0px 14px rgba(0, 0, 0, 1)",video.dom.container.appendChild(video.dom.bigsound),video.dom.bigsound.style.top=(video.dom.container.offsetHeight-video.dom.bigsound.offsetHeight)/2+"px",video.dom.bigsound.style.left=(video.dom.container.offsetWidth-video.dom.bigsound.offsetWidth)/2+"px",video.dom.bigsound.style.display="none",video.dom.spinner=document.createElement("span"),video.dom.spinner.id="v_controls_spinner",video.dom.spinner.className="v_controls_bb fa fa-cog fa-spin fa-3x",video.dom.spinner.style.zIndex=video.zindex+3,video.dom.spinner.style.display="block",video.dom.spinner.style.position="absolute",video.dom.spinner.style.color="#FFF",video.dom.spinner.style.textShadow="0px 0px 14px rgba(0, 0, 0, 1)",video.dom.container.appendChild(video.dom.spinner),video.dom.spinner.style.top=(video.dom.container.offsetHeight-video.dom.spinner.offsetHeight)/2+"px",video.dom.spinner.style.left=(video.dom.container.offsetWidth-video.dom.spinner.offsetWidth)/2+"px",video.dom.spinner.style.display="none",video.isinitialized=!0}},mEnter:function(){video.isfs||video.ismobile||!video.videostarted||"block"==video.dom.bigsound.style.display||"block"==video.dom.replay.style.display||"block"==video.dom.bigplay.style.display||(video.dom.controller.style.display="block")},mLeave:function(){video.dom.controller.style.display="none"},mClick:function(){("block"==v_controls_btn_bigplay.style.display||"block"==v_controls_btn_bigreplay.style.display)&&video.play(!0),"block"==v_controls_clickforsound.style.display&&video.cfs(!0)},barSeek:function(e){var o=e.pageX-video.dom.pbar.getBoundingClientRect().left,d=o/video.dom.container.offsetWidth;video.seek(video.duration*d),"block"==document.getElementById("v_controls_btn_play").style.display&&video.playonseek&&video.proxy.play()},seek:function(e){video.proxy.currentTime=e},load:function(e,o){video.isinitialized?(video.firsttime=!0,video.destroy(),video.dom.spinner.style.display="block",o?(video.hasposter=!0,video.setPoster(o)):video.hasposter=!1,setTimeout(function(){var o=document.createElement("video");if(o.id="v_element",o.width=video.dom.container.offsetWidth,o.height=video.dom.container.offsetHeight,document.getElementById("v_player").appendChild(o),video.autoplay&&!video.ismobile&&o.setAttribute("autoplay",!0),video.ismobile&&(o.setAttribute("controls",!0),video.dom.controller.style.display="none"),"object"==typeof e)e.forEach(function(e){var d=document.createElement("source");d.src=e,d.type=video.getMediaType(e),o.appendChild(d)});else{var d=document.createElement("source");d.src=e,d.type=video.getMediaType(e),o.appendChild(d)}video.proxy=document.getElementById("v_element"),video.setListeners(),!video.hasposter&&video.ismobile&&(video.dom.spinner.style.display="none",video.dom.bigplay.style.display="block"),video.proxy.style.display="none",video.proxy.addEventListener("click",video.controlHandler)},500)):video.trace("initialize video first")},setPoster:function(e){var o=new Image;o.onload=function(){video.trace("loaded: "+e),video.dom.poster.src=e,video.dom.poster.style.display="block",video.ismobile&&(video.dom.spinner.style.display="none",video.dom.bigplay.style.display="block")},o.src=e},destroy:function(){video.videostarted=!1,isfs=!1,video.proxy&&(video.trace("destroying player"),video.removeListeners(),video.dom.bigplay.style.display="none",video.dom.bigsound.style.display="none",video.dom.replay.style.display="none",video.dom.poster.style.display="none",video.dom.controller.style.display="none",video.dom.spinner.style.display="none",video.proxy.pause(),video.proxy.src="",video.proxy.load(),video.proxy.parentNode.removeChild(video.proxy),video.proxy=null,document.getElementById("v_player").innerHTML="")},obliterate:function(){video.destroy(),video.dom.container.innerHTML="",video.isinitialized=!1},setListeners:function(){video.dom.pbar.addEventListener("click",video.barSeek),video.dom.phead.addEventListener("click",video.barSeek),video.dom.container.addEventListener("mouseenter",video.mEnter),video.dom.container.addEventListener("mouseleave",video.mLeave),video.dom.container.addEventListener("click",video.mClick),video.dom.play.addEventListener("click",video.controlHandler),video.dom.pause.addEventListener("click",video.controlHandler),video.dom.mute.addEventListener("click",video.controlHandler),video.dom.unmute.addEventListener("click",video.controlHandler),video.allowfullscreen&&video.dom.fs.addEventListener("click",video.controlHandler),video.dom.bigplay.addEventListener("click",video.controlHandler),video.dom.bigsound.addEventListener("click",video.controlHandler),video.dom.replay.addEventListener("click",video.controlHandler),video.proxy.addEventListener("ended",video.dlEnded),video.proxy.addEventListener("play",video.dlPlay),video.proxy.addEventListener("pause",video.dlPause),video.proxy.addEventListener("volumechange",video.dlVolumeChange),video.proxy.addEventListener("timeupdate",video.dlTimeUpdate),video.proxy.addEventListener("canplay",video.dlCanPlay),video.proxy.addEventListener("progress",video.dlProgress)},removeListeners:function(){video.dom.pbar.removeEventListener("click",video.barSeek),video.dom.phead.removeEventListener("click",video.barSeek),video.dom.container.removeEventListener("mouseenter",video.mEnter),video.dom.container.removeEventListener("mouseleave",video.mLeave),video.dom.container.removeEventListener("click",video.mClick),video.dom.play.removeEventListener("click",video.controlHandler),video.dom.pause.removeEventListener("click",video.controlHandler),video.dom.mute.removeEventListener("click",video.controlHandler),video.dom.unmute.removeEventListener("click",video.controlHandler),video.allowfullscreen&&video.dom.fs.removeEventListener("click",video.controlHandler),video.dom.bigplay.removeEventListener("click",video.controlHandler),video.dom.bigsound.removeEventListener("click",video.controlHandler),video.dom.replay.removeEventListener("click",video.controlHandler),video.proxy.removeEventListener("ended",video.dlEnded),video.proxy.removeEventListener("play",video.dlPlay),video.proxy.removeEventListener("pause",video.dlPause),video.proxy.removeEventListener("volumechange",video.dlVolumeChange),video.proxy.removeEventListener("timeupdate",video.dlTimeUpdate),video.proxy.removeEventListener("canplay",video.dlCanPlay),video.proxy.removeEventListener("progress",video.dlProgress)},dlEnded:function(){video.hasposter?video.dom.poster.style.display="block":video.ismobile||(video.dom.replay.style.display="block",video.dom.controller.style.display="none"),video.dom.replay.style.display="block",video.proxy.style.display="none",video.dom.bigsound.style.display="none",video.callback.ended()},dlPlay:function(){document.getElementById("v_controls_btn_pause").style.display="block",document.getElementById("v_controls_btn_play").style.display="none",video.startmuted&&video.autoplay&&!video.ismobile&&video.firsttime&&(video.proxy.muted=!0),video.callback.play()},dlPause:function(){document.getElementById("v_controls_btn_pause").style.display="none",document.getElementById("v_controls_btn_play").style.display="block",video.callback.pause()},dlVolumeChange:function(){video.proxy.muted?(document.getElementById("v_controls_btn_mute").style.display="none",document.getElementById("v_controls_btn_unmute").style.display="block"):(document.getElementById("v_controls_btn_mute").style.display="block",document.getElementById("v_controls_btn_unmute").style.display="none",video.dom.bigsound.style.display="none"),video.callback.volumechange()},dlProgress:function(){for(var e=0;e<video.proxy.buffered.length;e++)video.buffered=video.proxy.buffered.end(e)/video.duration*100;video.dom.pbar.style.width=video.buffered+"%",video.callback.progress()},dlTimeUpdate:function(){video.firsttime&&(video.firsttime=!1,video.videostarted=!0,video.startmuted&&video.autoplay&&!video.ismobile&&(video.proxy.muted=!0,video.dom.bigsound.style.display="block",video.dom.controller.style.display="none")),"block"===video.dom.controller.style.display&&video.ismobile&&(video.dom.controller.style.display="none"),"block"===video.dom.bigplay.style.display&&(video.dom.bigplay.style.display="none"),"block"===video.dom.replay.style.display&&(video.dom.replay.style.display="none"),"block"===video.dom.spinner.style.display&&(video.dom.spinner.style.display="none"),"block"===video.dom.poster.style.display&&(video.dom.poster.style.display="none"),"none"===video.proxy.style.display&&(video.proxy.style.display="block"),video.playhead=video.proxy.currentTime,video.duration=video.proxy.duration;var e=video.playhead/video.duration*100;video.dom.phead.style.width=e+"%",video.callback.timeupdate()},dlCanPlay:function(){video.firsttime&&(video.autoplay||(video.dom.spinner.style.display="none",video.ismobile||(video.dom.bigplay.style.display="block")),video.hasposter||video.autoplay||video.ismobile||(video.trace("no poster"),video.dom.bigplay.style.display="block",video.dom.controller.style.display="none"),video.callback.canplay())},callback:{ended:function(){video.trace("Video Ended")},play:function(){video.trace("Video Play")},pause:function(){video.trace("Video Paused")},volumechange:function(){video.trace("Video Volume Change")},progress:function(){},timeupdate:function(){},canplay:function(){video.trace("Video Ready")}},controlHandler:function(e){switch(e.currentTarget.id){case"v_controls_btn_play":video.proxy.play();break;case"v_controls_btn_pause":video.proxy.pause();break;case"v_controls_btn_mute":video.proxy.muted=!0;break;case"v_controls_btn_unmute":video.proxy.muted=!1;break;case"v_controls_btn_fs":video.goFS();break;case"v_controls_btn_bigplay":video.proxy.play(),video.dom.spinner.style.display="block",video.dom.bigplay.style.display="none";break;case"v_controls_btn_bigreplay":video.replay(),(video.replaywithsound||video.ismobile)&&(video.proxy.muted=!1),video.dom.controller.style.display=video.ismobile?"none":"block";break;case"v_controls_clickforsound":video.cfs(!0);break;case"v_element":"block"!=document.getElementById("v_controls_btn_play").style.display||"none"!=document.getElementById("v_controls_clickforsound").style.display||video.ismobile||video.proxy.play(),"block"!=document.getElementById("v_controls_btn_pause").style.display||"none"!=document.getElementById("v_controls_clickforsound").style.display||video.ismobile||video.proxy.pause()}},play:function(e){video.proxy.play(),e&&!video.ismobile&&(video.dom.controller.style.display="block")},pause:function(){video.proxy.pause()},stop:function(){video.seek(0),video.pause()},replay:function(){video.dom.spinner.style.display="block",video.proxy.play(),video.seek(0)},cfs:function(e){video.proxy.muted=!1,video.seek(0),e&&!video.ismobile&&(video.dom.controller.style.display="block")},goFS:function(){video.trace("request fullscreen"),video.proxy.requestFullscreen?(video.proxy.requestFullscreen(),video.isfs=!0):video.proxy.mozRequestFullScreen?(video.proxy.mozRequestFullScreen(),video.isfs=!0):video.proxy.webkitRequestFullscreen&&(video.proxy.webkitRequestFullscreen(),video.isfs=!0)},getMediaType:function(e){return video.mTypes[e.split(".")[e.split(".").length-1]]},trace:function(e){video.debug&&(console.log(e),video.dom.debug&&(video.dom.debug.innerHTML+=e+"<br>"))}};