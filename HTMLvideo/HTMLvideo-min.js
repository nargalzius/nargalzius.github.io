"use strict";function VideoPlayer(){}var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};VideoPlayer.prototype={debug:!1,params:{},default_params:{id:"video",src:["https://nargalzius.github.io/v/video_sample.mp4"],poster:"https://nargalzius.github.io/i/video_sample_poster.jpg",autoplay:!1,startmuted:!1,replaywithsound:!0,allowfullscreen:!1,playonseek:!0,uniquereplay:!1,chromeless:!1,elementtrigger:!0,elementplayback:!0,controlbar:!0,loop:!1,preload:"none",inline:!0,preview:0,continuecfs:!0,endfreeze:!1},proxy:null,is_mobile:null,ua_ie:!1,ua_edge:!1,ua_firefox:!1,ua_safari:!1,ua_android:!1,ua_ios:!1,ua_chrome:!1,ua_opera:!1,ua_win:!1,ua_other:!1,zindex:null,playhead:0,duration:0,buffered:0,flag_started:!1,flag_playing:!1,flag_paused:!1,flag_isfs:!1,flag_first:!0,flag_buffering:!1,flag_loaded:!1,flag_ap_nonce:!1,flag_listener:!1,flag_restartplay:!1,flag_hasposter:!1,flag_cfs:!1,flag_nonce:!0,flag_progress:!1,flag_completed:!1,flag_stopped:!1,api:!1,load_int:null,mTypes:{mp4:"video/mp4",ogv:"video/ogg",webm:"video/webm"},svg:{bigplay:'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="64" height="64" viewBox="0 0 24 24"><path fill="#444444" d="M12 20.016q3.281 0 5.648-2.367t2.367-5.648-2.367-5.648-5.648-2.367-5.648 2.367-2.367 5.648 2.367 5.648 5.648 2.367zM12 2.016q4.125 0 7.055 2.93t2.93 7.055-2.93 7.055-7.055 2.93-7.055-2.93-2.93-7.055 2.93-7.055 7.055-2.93zM9.984 16.5v-9l6 4.5z"></path></svg>',bigsound:'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="64" height="64" viewBox="0 0 24 24"><path fill="#444444" d="M14.016 3.234q3.047 0.656 5.016 3.117t1.969 5.648-1.969 5.648-5.016 3.117v-2.063q2.203-0.656 3.586-2.484t1.383-4.219-1.383-4.219-3.586-2.484v-2.063zM16.5 12q0 2.813-2.484 4.031v-8.063q2.484 1.219 2.484 4.031zM3 9h3.984l5.016-5.016v16.031l-5.016-5.016h-3.984v-6z"></path></svg>',replay:'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="64" height="64" viewBox="0 0 24 24"><path fill="#444444" d="M12 5.016q3.328 0 5.672 2.344t2.344 5.625q0 3.328-2.367 5.672t-5.648 2.344-5.648-2.344-2.367-5.672h2.016q0 2.484 1.758 4.242t4.242 1.758 4.242-1.758 1.758-4.242-1.758-4.242-4.242-1.758v4.031l-5.016-5.016 5.016-5.016v4.031z"></path></svg>',mute:'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24"><path fill="#444444" d="M14.016 3.234q3.047 0.656 5.016 3.117t1.969 5.648-1.969 5.648-5.016 3.117v-2.063q2.203-0.656 3.586-2.484t1.383-4.219-1.383-4.219-3.586-2.484v-2.063zM16.5 12q0 2.813-2.484 4.031v-8.063q2.484 1.219 2.484 4.031zM3 9h3.984l5.016-5.016v16.031l-5.016-5.016h-3.984v-6z"></path></svg>',unmute:'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24"><path fill="#444444" d="M12 3.984v4.219l-2.109-2.109zM4.266 3l16.734 16.734-1.266 1.266-2.063-2.063q-1.734 1.359-3.656 1.828v-2.063q1.172-0.328 2.25-1.172l-4.266-4.266v6.75l-5.016-5.016h-3.984v-6h4.734l-4.734-4.734zM18.984 12q0-2.391-1.383-4.219t-3.586-2.484v-2.063q3.047 0.656 5.016 3.117t1.969 5.648q0 2.25-1.031 4.172l-1.5-1.547q0.516-1.266 0.516-2.625zM16.5 12q0 0.422-0.047 0.609l-2.438-2.438v-2.203q2.484 1.219 2.484 4.031z"></path></svg>',play:'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24"><path fill="#444444" d="M8.016 5.016l10.969 6.984-10.969 6.984v-13.969z"></path></svg>',pause:'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24"><path fill="#444444" d="M14.016 5.016h3.984v13.969h-3.984v-13.969zM6 18.984v-13.969h3.984v13.969h-3.984z"></path></svg>',spinner:'<svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff"><g fill="none" fill-rule="evenodd"><g transform="translate(1 1)" stroke-width="2"><circle stroke-opacity=".5" cx="18" cy="18" r="18"/><path d="M36 18c0-9.94-8.06-18-18-18"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"/></path></g></g></svg>',fs:'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" viewBox="0 0 32 32"><path fill="#444444" d="M27.414 24.586l-4.586-4.586-2.828 2.828 4.586 4.586-4.586 4.586h12v-12zM12 0h-12v12l4.586-4.586 4.543 4.539 2.828-2.828-4.543-4.539zM12 22.828l-2.828-2.828-4.586 4.586-4.586-4.586v12h12l-4.586-4.586zM32 0h-12l4.586 4.586-4.543 4.539 2.828 2.828 4.543-4.539 4.586 4.586z"></path></svg>'},centered_controls:{},temp_storage:{},colors_scrubber_bg:"#000",colors_scrubber_progress:"#666",colors_scrubber_playback:"#FFF",colors_play_pause:"#FFF",colors_mute_unmute:"#FFF",colors_bigplay:"#FFF",colors_bigsound:"#FFF",colors_replay:"#FFF",colors_spinner:"#FFF",colors_fs:"#FFF",colors_bg:"rgba(0,0,0,0.4)",dom_container:null,dom_frame:null,dom_debug:null,dom_poster:null,dom_controller:null,dom_bigplay:null,dom_preview:null,dom_bigsound:null,dom_replay:null,dom_spinner:null,dom_pbar:null,dom_phead:null,dom_play:null,dom_pause:null,dom_mute:null,dom_unmute:null,dom_fs:null,dom_template_textshadow:"0px 0px 14px rgba(0, 0, 0, 1)",barsize:27,eventList:["canplay","durationchange","ended","loadstart","pause","play","playing","progress","timeupdate","volumechange","waiting"],notifications:{volume:!1,start:!0,preview_start:!0,play:!0,pause:!0},listeners:[],disableNotification:function t(s){this.notifications[s]=!1},enableNotifications:function t(){var s=this.notifications;setTimeout(function(){for(var t in s)s[t]=!0},100)},dom_template_bigplay:function t(){this.dom_bigplay=document.createElement("div"),this.dom_bigplay.style.backgroundColor=this.colors_bg,this.setVendor(this.dom_bigplay,"borderRadius","32px"),this.dom_bigplay.innerHTML=this.svg.bigplay,this.dom_bigplay.getElementsByTagName("path")[0].style.fill=this.colors_bigplay},dom_template_bigsound:function t(){this.dom_bigsound=document.createElement("div"),this.dom_bigsound.style.backgroundColor=this.colors_bg,this.setVendor(this.dom_bigsound,"borderRadius","32px"),this.dom_bigsound.innerHTML=this.svg.bigsound,this.dom_bigsound.getElementsByTagName("path")[0].style.fill=this.colors_bigsound},dom_template_replay:function t(){this.dom_replay=document.createElement("div"),this.dom_replay.style.backgroundColor=this.colors_bg,this.setVendor(this.dom_replay,"borderRadius","32px"),this.dom_replay.innerHTML=this.svg.replay,this.dom_replay.getElementsByTagName("path")[0].style.fill=this.colors_replay,this.dom_replay.getElementsByTagName("svg")[0].style.marginTop="-5px"},dom_template_spinner:function t(){this.dom_spinner=document.createElement("div"),this.dom_spinner.innerHTML=this.svg.spinner,this.dom_spinner.style.width="38px",this.dom_spinner.style.height="38px"},dom_template_play:function t(){this.dom_play=document.createElement("span"),this.dom_play.innerHTML=this.svg.play,this.dom_play.getElementsByTagName("path")[0].style.fill=this.colors_play_pause},dom_template_pause:function t(){this.dom_pause=document.createElement("span"),this.dom_pause.innerHTML=this.svg.pause,this.dom_pause.getElementsByTagName("path")[0].style.fill=this.colors_play_pause},dom_template_mute:function t(){this.dom_mute=document.createElement("span"),this.dom_mute.innerHTML=this.svg.mute,this.dom_mute.getElementsByTagName("path")[0].style.fill=this.colors_mute_unmute},dom_template_unmute:function t(){this.dom_unmute=document.createElement("span"),this.dom_unmute.innerHTML=this.svg.unmute,this.dom_unmute.getElementsByTagName("path")[0].style.fill=this.colors_mute_unmute},dom_template_fs:function t(){this.dom_fs=document.createElement("span"),this.dom_fs.innerHTML=this.svg.fs,this.dom_fs.getElementsByTagName("path")[0].style.fill=this.colors_fs},evaluate:function t(s){if(null===this.is_mobile&&this.checkMobile(),this.checkUA(),0===Object.keys(this.params).length)for(var e in this.default_params)this.params[e]=this.default_params[e];if(s&&s.constructor===Object)for(var i in s)switch(i){case"preload":switch(s[i]){case!1:case 0:case"none":this.params[i]="none";break;case!0:case 1:case"metadata":this.params[i]="metadata";break;case 2:case"all":case"auto":this.params[i]="auto";break}break;case"chromeless":this.params[i]=s[i],!0===s[i]&&(this.params.controlbar=!1);break;case"preview":s[i]&&(this.params[i]=s[i],this.params.autoplay=!0,this.params.startmuted=!0);break;default:this.params[i]=s[i]}else s&&s.constructor===String?this.params.id=s:s&&s.constructor===Boolean||delete this.params.src;this.params.autoplay&&"autoplay"in document.createElement("video")?(this.is_mobile&&(this.trace("Autoplay on mobile: forcing mute"),this.params.startmuted=!0),this.is_mobile&&this.is_win&&(this.trace("IE environment: overriding autoplay"),this.params.startmuted=!1,this.params.autoplay=!1,this.params.preview=0)):this.params.autoplay=!1,this.params.autoplay&&this.ua_safari&&(this.flag_ap_nonce=!0),this.params.inline&&("playsInline"in document.createElement("video")?this.params.inline=!0:this.params.inline=!1)},init:function t(s){var e=this;if(this.api)this.trace("HTML Video Player Class Already Initialized");else{if(this.evaluate(s),this.dom_container=document.getElementById(this.params.id),this.dom_container.style.backgroundColor="#000",this.dom_container.style.overflow="hidden",!this.zindex&&document.defaultView&&document.defaultView.getComputedStyle){var i=document.defaultView.getComputedStyle(this.dom_container,"");this.zindex=parseInt(i.getPropertyValue("z-index"),10)}else!this.zindex&&this.dom_container.currentStyle&&(this.zindex=parseInt(this.dom_container.currentStyle.zIndex,10));this.zindex||(this.zindex=0,this.trace("z-index for video container element not detected, make sure position property is set.\nzIndex set to 0")),document.addEventListener("fullscreenchange",function(){e.trace("fullscreen: "+document.fullscreen),document.fullscreen?(e.track_enterfs(),e.flag_isfs=!0):(e.track_exitfs(),e.flag_isfs=!1)},!1),document.addEventListener("mozfullscreenchange",function(){e.trace("fullscreen: "+document.mozFullScreen),document.mozFullScreen?(e.track_enterfs(),e.flag_isfs=!0):(e.track_exitfs(),e.flag_isfs=!1)},!1),document.addEventListener("webkitfullscreenchange",function(){e.trace("fullscreen: "+document.webkitIsFullScreen),document.webkitIsFullScreen?(e.track_enterfs(),e.flag_isfs=!0):(e.track_exitfs(),e.flag_isfs=!1)},!1),document.addEventListener("MSFullscreenChange",function(){e.trace("fullscreen: "+document.msFullscreenElement),document.msFullscreenElement?(e.track_enterfs(),e.flag_isfs=!0):(e.track_exitfs(),e.flag_isfs=!1)},!1),this.dom_frame=document.createElement("div"),this.dom_frame.style.zIndex=this.zindex,this.dom_frame.style.position="absolute",this.dom_frame.style.width="100%",this.dom_frame.style.height="100%",this.dom_container.appendChild(this.dom_frame),this.dom_poster=document.createElement("div"),this.dom_poster.className="poster",this.dom_poster.style.zIndex=this.zindex+1,this.dom_poster.style.position="absolute",this.dom_poster.style.backgroundColor="#000",this.dom_poster.style.display="block",this.dom_poster.style.width="100%",this.dom_poster.style.height="100%",this.dom_poster.style.backgroundSize="cover",this.dom_poster.style.backgroundRepeat="no-repeat",this.dom_frame.appendChild(this.dom_poster),this.params.elementtrigger&&(this.dom_poster.style.cursor="pointer"),this.dom_controller=document.createElement("div"),this.dom_controller.style.display=this.params.controlbar?"block":"none",this.dom_controller.style.zIndex=this.zindex,this.dom_controller.style.position="relative",this.dom_controller.style.height=this.barsize+"px",this.dom_controller.style.width="100%",this.dom_controller.style.top=this.dom_container.offsetHeight-this.barsize+"px",this.dom_controller.style.left=0,this.dom_controller.style.display="none",this.dom_controller.className="v_control_bar",this.params.chromeless||this.dom_container.appendChild(this.dom_controller);var a=document.createElement("div");a.style.display="block",a.style.position="absolute",a.style.backgroundColor="#000",a.style.opacity=.6,a.style.width="100%",a.style.height=this.barsize+"px",this.dom_controller.appendChild(a);var o=document.createElement("div");o.style.position="relative",o.style.float="left",o.style.top="1px",o.style.marginLeft="5px",o.className="v_control_pp",this.dom_controller.appendChild(o),this.dom_template_play(),this.addClass(this.dom_play,"cbtn"),this.addClass(this.dom_play,"v_control_sb"),this.addClass(this.dom_play,"play"),this.dom_play.style.display="block",this.dom_play.style.position="absolute",this.dom_play.style.cursor="pointer",o.appendChild(this.dom_play),this.dom_template_pause(),this.addClass(this.dom_pause,"cbtn"),this.addClass(this.dom_pause,"v_control_sb"),this.addClass(this.dom_pause,"pause"),this.dom_pause.style.display="block",this.dom_pause.style.position="absolute",this.dom_pause.style.cursor="pointer",this.dom_pause.style.display="none",o.appendChild(this.dom_pause);var l=document.createElement("div");l.style.position="absolute",l.style.top="0px",l.className="v_control_mu",l.style.textAlign="left",this.dom_controller.appendChild(l),this.temp_storage.muteunmute=l,this.dom_template_mute(),this.addClass(this.dom_mute,"cbtn"),this.addClass(this.dom_mute,"v_control_sb"),this.addClass(this.dom_mute,"mute"),this.dom_mute.style.display="block",this.dom_mute.style.position="absolute",this.dom_mute.style.cursor="pointer",l.appendChild(this.dom_mute),this.dom_template_unmute(),this.addClass(this.dom_unmute,"cbtn"),this.addClass(this.dom_unmute,"v_control_sb"),this.addClass(this.dom_unmute,"unmute"),this.dom_unmute.style.display="block",this.dom_unmute.style.position="absolute",this.dom_unmute.style.cursor="pointer",this.dom_unmute.style.display="none",l.appendChild(this.dom_unmute);var r=document.createElement("div");r.style.position="absolute",r.style.display="block",r.style.height="4px",r.style.width="100%",r.style.top="-4px",r.style.cursor="pointer",r.style.backgroundColor=this.colors_scrubber_bg,r.className="scrubber",this.dom_controller.appendChild(r),this.dom_pbar=document.createElement("div"),this.dom_pbar.style.position="absolute",this.dom_pbar.style.display="block",this.dom_pbar.style.height="100%",this.dom_pbar.style.width=0,this.dom_pbar.style.top=0,this.dom_pbar.style.backgroundColor=this.colors_scrubber_progress,this.dom_pbar.className="playbar",r.appendChild(this.dom_pbar),this.dom_phead=document.createElement("div"),this.dom_phead.style.position="absolute",this.dom_phead.style.display="block",this.dom_phead.style.height="100%",this.dom_phead.style.width=0,this.dom_phead.style.top=0,this.dom_phead.style.backgroundColor=this.colors_scrubber_playback,this.dom_phead.className="playhead",r.appendChild(this.dom_phead),this.dom_template_bigplay(),this.addClass(this.dom_bigplay,"cbtn"),this.addClass(this.dom_bigplay,"v_control_bb"),this.addClass(this.dom_bigplay,"play"),this.dom_bigplay.style.zIndex=this.zindex+2,this.dom_bigplay.style.display="block",this.dom_bigplay.style.position="absolute",this.dom_bigplay.style.cursor="pointer",this.dom_bigplay.style.textShadow=this.dom_template_textshadow,this.params.chromeless||this.dom_container.appendChild(this.dom_bigplay),this.dom_bigplay.style.display="none",this.centered_controls.play=this.dom_bigplay,this.dom_preview=this.dom_bigplay.cloneNode(!0),this.addClass(this.dom_preview,"cbtn"),this.addClass(this.dom_preview,"v_control_bb"),this.addClass(this.dom_preview,"play"),this.dom_preview.style.zIndex=this.zindex+2,this.dom_preview.style.display="block",this.dom_preview.style.position="absolute",this.dom_preview.style.cursor="pointer",this.params.chromeless||this.dom_container.appendChild(this.dom_preview),this.dom_preview.style.display="none",this.centered_controls.preview=this.dom_preview,this.dom_template_bigsound(),this.addClass(this.dom_bigsound,"cbtn"),this.addClass(this.dom_bigsound,"v_control_bb"),this.addClass(this.dom_bigsound,"sound"),this.dom_bigsound.style.zIndex=this.zindex+2,this.dom_bigsound.style.display="block",this.dom_bigsound.style.position="absolute",this.dom_bigsound.style.cursor="pointer",this.params.chromeless||this.dom_container.appendChild(this.dom_bigsound),this.dom_bigsound.style.display="none",this.centered_controls.sound=this.dom_bigsound,this.dom_template_spinner(),this.addClass(this.dom_spinner,"cbtn"),this.addClass(this.dom_spinner,"v_control_bb"),this.addClass(this.dom_spinner,"wait"),this.dom_spinner.style.zIndex=this.zindex+2,this.dom_spinner.style.display="block",this.dom_spinner.style.position="absolute",this.dom_container.appendChild(this.dom_spinner),this.dom_spinner.style.display="none",this.centered_controls.wait=this.dom_spinner,this.reflow(!0),this.api=!0,this.trace("HTML Video Player Class Ready"),this.params.src?this.load(this.params):this.trace(this.params,"params (init)")}},load:function t(s){var e=this;if(this.api){clearInterval(this.load_int),this.flag_loaded&&this.unload(),this.evaluate(s),this.trace(this.params,"params (load)"),this.flag_first=!0,this.dom_spinner.style.display="block",this.params.poster&&this.setPoster(this.params.poster),this.dom_template_fs(),this.addClass(this.dom_fs,"cbtn"),this.addClass(this.dom_fs,"v_control_sb"),this.addClass(this.dom_fs,"fs"),this.dom_fs.id="fullscreen_btn",this.dom_fs.style.position="absolute",this.dom_fs.style.display="block",this.dom_fs.style.top="5px",this.dom_fs.style.right="10px",this.dom_fs.style.cursor="pointer",this.params.allowfullscreen&&this.dom_controller.appendChild(this.dom_fs),this.params.allowfullscreen?this.temp_storage.muteunmute.style.right="58px":this.temp_storage.muteunmute.style.right="30px",this.params.uniquereplay?this.dom_template_replay():(this.dom_replay=this.dom_bigplay.cloneNode(!0),this.removeClass(this.dom_replay,"play")),this.addClass(this.dom_replay,"cbtn"),this.addClass(this.dom_replay,"v_control_bb"),this.addClass(this.dom_replay,"replay"),this.dom_replay.id="replay_btn",this.dom_replay.style.zIndex=this.zindex+2,this.dom_replay.style.display="block",this.dom_replay.style.position="absolute",this.dom_replay.style.cursor="pointer",this.params.chromeless||this.dom_container.appendChild(this.dom_replay),this.dom_replay.style.display="none",this.centered_controls.replay=this.dom_replay,this.reflow(!0);var i=document.createElement("video");if(i.width=this.dom_container.offsetWidth,i.height=this.dom_container.offsetHeight,this.params.startmuted&&(i.muted=!0),this.params.poster&&(i.poster=this.params.poster),i.preload=this.params.preload,this.params.chromeless?(this.dom_controller.style.display="none",i.controls=!1):this.is_mobile&&(this.dom_controller.style.display="none",this.params.autoplay||(i.controls=!!this.params.controlbar)),"object"===_typeof(this.params.src))this.params.src.forEach(function(t){var s=document.createElement("source");s.src=t,s.type=e.getMediaType(t),i.appendChild(s)});else{var a=document.createElement("source");a.src=this.params.src,a.type=this.getMediaType(this.params.src),i.appendChild(a)}this.params.elementtrigger?this.dom_frame.style.cursor="pointer":this.dom_frame.style.cursor="auto",this.params.inline&&(i.playsInline=!0),this.proxy=i,this.setListeners(),this.reflow(!0),this.dom_frame.appendChild(i),this.flag_loaded=!0,this.params.autoplay&&!this.flag_ap_nonce&&this.play()}else setInterval(function(){e.load(s)},500)},mEnter:function t(){!this.flag_started||this.flag_isfs||this.is_mobile||"block"===this.dom_bigsound.style.display||"block"===this.dom_replay.style.display||"block"===this.dom_bigplay.style.display||"block"===this.dom_preview.style.display||(this.dom_controller.style.display=this.params.controlbar?"block":"none")},mLeave:function t(){this.dom_controller.style.display="none"},barSeek:function t(s){var e=s.pageX-this.dom_pbar.getBoundingClientRect().left,i=e/this.dom_container.offsetWidth;this.seek(this.duration*i),"block"===this.dom_play.style.display&&this.params.playonseek&&this.play()},seek:function t(s){this.proxy.currentTime=s},setPoster:function t(s){var e=this,i=new Image;i.onload=function(){e.trace("poster loaded: "+s),e.dom_poster.style.backgroundImage="url("+s+")",0===e.playhead&&(e.dom_poster.style.display="block")},i.src=s,this.flag_hasposter=!0},resetPlayback:function t(s){this.params.endfreeze&&!s||this.resetTracking(),this.flag_completed=!1,this.flag_playing=!1,this.flag_nonce=!0},resetVariables:function t(){this.playhead=0,this.duration=0,this.buffered=0,this.flag_started=!1,this.flag_playing=!1,this.flag_paused=!1,this.flag_isfs=!1,this.flag_first=!0,this.flag_buffering=!1,this.flag_loaded=!1,this.flag_ap_nonce=!1,this.flag_restartplay=!1,this.flag_hasposter=!1,this.flag_cfs=!1,this.flag_nonce=!0,this.flag_progress=!1,this.flag_stopped=!1},unload:function t(){if(this.flag_loaded){if(this.removeListeners(),this.proxy){document.getElementById("replay_btn")&&this.dom_container.removeChild(this.dom_replay),document.getElementById("fullscreen_btn")&&this.dom_controller.removeChild(this.dom_fs),this.dom_poster.style.backgroundImage="none",this.dom_controller.style.display="none";for(var s in this.centered_controls)this.centered_controls[s].style.display="none";this.dom_frame.removeChild(this.proxy),this.dom_frame.style.cursor="auto",this.proxy=null}this.resetPlayback(!0),this.resetVariables()}},destroy:function t(){this.api?(this.unload(),this.dom_container.innerHTML="",this.api=!1,this.trace("destroying player")):this.trace("nothing to destroy")},setListeners:function t(){var s=this;if(!this.flag_listener){this.trace("SET LISTENERS"),this.dom_container.addEventListener("mouseenter",function(t){s.mEnter(t)},!1),this.dom_container.addEventListener("mouseleave",function(t){s.mLeave(t)},!1),this.dom_pbar.addEventListener("click",function(t){s.barSeek(t)},!1),this.dom_phead.addEventListener("click",function(t){s.barSeek(t)},!1),this.dom_play.addEventListener("click",function(t){s.controlHandler(t)},!1),this.dom_pause.addEventListener("click",function(t){s.controlHandler(t)},!1),this.dom_mute.addEventListener("click",function(t){s.controlHandler(t)},!1),this.dom_unmute.addEventListener("click",function(t){s.controlHandler(t)},!1),this.dom_bigplay.addEventListener("click",function(t){s.controlHandler(t)},!1),this.dom_bigsound.addEventListener("click",function(t){s.controlHandler(t)},!1),this.dom_preview.addEventListener("click",function(t){s.controlHandler(t)},!1),this.dom_frame.addEventListener("click",function(t){s.controlHandler(t)},!1),this.dom_fs.addEventListener("click",function(t){s.controlHandler(t)},!1),this.dom_replay.addEventListener("click",function(t){s.controlHandler(t)},!1);for(var e=0;e<this.eventList.length;e++)this.proxy.addEventListener(this.eventList[e],function(t){s.eventHandler(t)},!1);this.flag_listener=!0}},removeListeners:function t(){var s=this;if(this.flag_listener){this.trace("UNSET LISTENERS"),this.dom_fs.removeEventListener("click",function(t){s.controlHandler(t)},!1),this.dom_replay.removeEventListener("click",function(t){s.controlHandler(t)},!1);for(var e=0;e<this.eventList.length;e++)this.proxy.removeEventListener(this.eventList[e],function(t){s.eventHandler(t)},!1);this.flag_listener=!1}},controlHandler:function t(s){switch(s.currentTarget){case this.dom_frame:"block"===this.dom_bigplay.style.display?this.params.elementtrigger&&this.bigPlay():"block"===this.dom_replay.style.display?this.params.elementtrigger&&this.bigReplay():"block"===this.dom_bigsound.style.display?this.params.elementplayback&&this.cfs(!0):"block"===this.dom_preview.style.display?this.params.elementplayback&&this.play():this.params.elementplayback&&this.flag_playing?this.playPause():(this.params.elementtrigger&&this.flag_loaded&&(this.flag_playing&&"block"!==this.dom_bigplay.style.display&&"block"!==this.dom_replay.style.display&&"block"!==this.dom_preview.style.display||(this.dom_bigplay.style.display="none",this.dom_replay.style.display="none",this.dom_spinner.style.display="block",this.play(!0)),"block"!==this.dom_bigsound.style.display||this.params.elementplayback||this.cfs(!0)),this.reflow(!0));break;case this.dom_play:case this.dom_pause:this.playPause();break;case this.dom_mute:this.mute();break;case this.dom_unmute:this.unmute();break;case this.dom_fs:this.goFS();break;case this.dom_bigplay:this.bigPlay();break;case this.dom_replay:this.bigReplay();break;case this.dom_preview:this.play();break;case this.dom_bigsound:this.cfs(!0);break}},bigPlay:function t(){this.play(),this.dom_bigplay.style.display="none",this.dom_spinner.style.display="block",this.reflow(!0)},bigReplay:function t(){this.replay(),(this.params.replaywithsound||this.is_mobile)&&(this.disableNotification("volume"),this.unmute()),this.is_mobile?this.dom_controller.style.display="none":this.dom_controller.style.display=this.params.controlbar?"block":"none",this.resetTracking()},playPause:function t(){this.flag_paused?(this.flag_paused=!1,this.play()):(this.flag_paused=!0,this.pause())},eventHandler:function t(s){switch(s.type){case"canplay":this.flag_first&&(this.is_mobile&&(this.dom_controller.style.display="none",this.params.autoplay&&(this.dom_spinner.style.display="block",this.dom_bigplay.style.display="none",this.dom_poster.style.display="none",this.proxy.style.display="block")),this.reflow(!0));break;case"play":this.dom_pause.style.display="block",this.dom_play.style.display="none",this.track.started||this.flag_completed?this.flag_completed?(this.flag_completed=!1,this.track.started=!0,this.disableNotification("play"),this.disableNotification("preview_start"),this.disableNotification("start")):(this.disableNotification("preview_start"),this.disableNotification("replay"),this.playhead!==this.duration&&this.disableNotification("start")):(this.track.started=!0,this.params.preview?(this.disableNotification("start"),this.disableNotification("play"),this.disableNotification("replay")):(this.disableNotification("play"),this.disableNotification("preview_start"),this.disableNotification("replay"))),this.flag_restartplay&&this.cfs(!0),this.flag_nonce||this.flag_stopped||(this.params.continuecfs?this.track_cfs():(this.track_start(),this.callback_start()),this.callback_play(),this.flag_stopped=!1,this.notifications.play&&this.track_play(),this.enableNotifications()),this.flag_progress=!0;break;case"pause":this.dom_pause.style.display="none",this.dom_play.style.display="block",this.params.preview<this.playhead&&(this.callback_pause(),this.params.preview?(this.dom_bigsound.style.display="none",this.dom_preview.style.display="block",this.reflow(),this.disableNotification("end"),this.disableNotification("pause"),this.flag_restartplay=!0,this.resetTracking(),this.params.preview=0,this.track_preview_end()):(this.disableNotification("end"),this.disableNotification("preview_end"),this.notifications.pause&&this.playhead!==this.duration&&this.track_pause())),this.flag_progress=!1;break;case"ended":this.flag_completed=!0,this.params.loop||(this.flag_nonce=!0),this.callback_end(),this.params.loop?(this.play(),this.trace("looping video...")):(this.params.replaywithsound&&(this.disableNotification("volume"),this.unmute()),this.params.endfreeze||(this.proxy.style.display="none"),this.flag_hasposter&&!this.params.endfreeze&&(this.dom_poster.style.display="block"),this.is_mobile||(this.dom_controller.style.display="none"),this.params.chromeless||this.params.preview||(this.dom_replay.style.display="block"),this.dom_bigsound.style.display="none",this.disableNotification("volume"),this.params.preview?(this.dom_preview.style.display="block",this.params.preview=0,this.flag_completed=!1,this.track_preview_end()):(this.resetTracking(),this.flag_playing=!1,this.track_end()),this.params.elementtrigger?this.dom_frame.style.cursor="pointer":this.dom_frame.style.cursor="auto"),this.reflow(!0);break;case"timeupdate":if(this.flag_progress){this.proxy&&(this.playhead=this.proxy.currentTime),this.playhead>0&&(this.proxy&&this.flag_first&&(this.flag_first=!1,this.flag_started=!0,this.params.startmuted&&this.params.autoplay&&!this.params.chromeless?(this.dom_bigsound.style.display="block",this.dom_controller.style.display="none",this.flag_playing=!1,this.reflow(!0)):this.flag_playing=!0),"block"===this.dom_controller.style.display&&this.is_mobile&&(this.dom_controller.style.display="none"),"block"===this.dom_bigplay.style.display&&(this.dom_bigplay.style.display="none"),"block"===this.dom_replay.style.display&&(this.dom_replay.style.display="none"),"block"===this.dom_preview.style.display&&(this.dom_preview.style.display="none"),this.flag_playing=!0,this.flag_buffering||"block"===this.dom_spinner.style.display&&(this.dom_spinner.style.display="none"),"block"===this.dom_poster.style.display&&(this.dom_poster.style.display="none"),this.proxy&&"none"===this.proxy.style.display&&(this.proxy.style.display="block"),this.flag_nonce&&(this.params.elementplayback?this.dom_frame.style.cursor="pointer":this.dom_frame.style.cursor="auto",this.flag_nonce=!1,this.notifications.preview_start&&this.track_preview_start(),this.notifications.start&&this.track_start(),this.notifications.replay&&!this.params.loop&&this.track_replay(),this.callback_play(),this.callback_start(),this.flag_stopped=!1,this.enableNotifications()));var e=this.playhead/this.duration*100;this.dom_phead.style.width=e+"%",!this.params.preview&&!0!==this.track.q25&&e>=25&&(this.track.q25=!0,this.track_q25()),!this.params.preview&&!0!==this.track.q50&&e>=50&&(this.track.q50=!0,this.track_q50()),!this.params.preview&&!0!==this.track.q75&&e>=75&&(this.track.q75=!0,this.track_q75()),this.callback_progress(),this.params.preview&&this.playhead>this.params.preview&&this.pause()}break;case"progress":if(this.params.autoplay&&this.flag_ap_nonce)this.flag_ap_nonce=!1,this.play();else if(this.proxy){for(var i=0;i<this.proxy.buffered.length;i++)this.buffered=this.proxy.buffered.end(i)/this.duration*100;this.dom_pbar.style.width=this.buffered+"%",this.callback_loading()}break;case"volumechange":this.isMuted()?(this.dom_mute.style.display="none",this.dom_unmute.style.display="block",this.notifications.volume&&(this.track_mute(),this.callback_volume())):(this.dom_mute.style.display="block",this.dom_unmute.style.display="none",this.dom_bigsound.style.display="none",this.notifications.volume&&(this.track_unmute(),this.callback_volume()));break;case"waiting":this.flag_buffering=!0,this.flag_playing&&!this.is_mobile&&"block"!=this.dom_preview.style.display&&"block"!=this.dom_bigsound.style.display&&(this.dom_spinner.style.display="block",this.reflow(!0),this.callback_buffer());break;case"playing":this.flag_buffering=!1,this.playhead>0&&(this.dom_spinner.style.display="none");break;case"canplaythrough":this.playhead>0&&(this.dom_spinner.style.display="none");break;case"loadstart":this.params.autoplay?this.dom_spinner.style.display="block":(this.params.chromeless||(this.dom_bigplay.style.display="block"),this.dom_spinner.style.display="none"),this.callback_ready(),this.reflow(!0);break;case"suspend":break;case"error":console.log(s);break;case"durationchange":this.duration=this.proxy.duration;break;default:this.trace(s.type)}},track:{started:!1,q25:!1,q50:!1,q75:!1},resetTracking:function t(){this.playhead=0,this.track.started=!1,this.track.q25=!1,this.track.q50=!1,this.track.q75=!1},track_cfs:function t(){this.trace("track_cfs","DEFAULT CALLBACK")},track_preview_start:function t(){this.trace("track_preview_start","DEFAULT CALLBACK")},track_preview_end:function t(){this.trace("track_preview_end","DEFAULT CALLBACK")},track_start:function t(){this.trace("track_start","DEFAULT CALLBACK")},track_stop:function t(){this.trace("track_stop","DEFAULT CALLBACK")},track_end:function t(){
this.trace("track_end","DEFAULT CALLBACK")},track_play:function t(){this.trace("track_play","DEFAULT CALLBACK")},track_replay:function t(){this.trace("track_replay","DEFAULT CALLBACK")},track_pause:function t(){this.trace("track_pause","DEFAULT CALLBACK")},track_mute:function t(){this.trace("track_mute","DEFAULT CALLBACK")},track_unmute:function t(){this.trace("track_unmute","DEFAULT CALLBACK")},track_q25:function t(){this.trace("track_q25","DEFAULT CALLBACK")},track_q50:function t(){this.trace("track_q50","DEFAULT CALLBACK")},track_q75:function t(){this.trace("track_q75","DEFAULT CALLBACK")},track_enterfs:function t(){this.trace("track_enterfs","DEFAULT CALLBACK")},track_exitfs:function t(){this.trace("track_exitfs","DEFAULT CALLBACK")},callback_buffer:function t(){},callback_loading:function t(){},callback_progress:function t(){},callback_ready:function t(){this.trace("callback_ready","DEFAULT CALLBACK")},callback_end:function t(){this.trace("callback_end","DEFAULT CALLBACK")},callback_play:function t(){this.trace("callback_play","DEFAULT CALLBACK")},callback_stop:function t(){this.trace("callback_stop","DEFAULT CALLBACK")},callback_pause:function t(){this.trace("callback_pause","DEFAULT CALLBACK")},callback_start:function t(){this.trace("callback_start","DEFAULT CALLBACK")},callback_error:function t(s,e){this.trace(s,e)},callback_volume:function t(){var s="";this.notifications.volume&&(s=this.isMuted()?" (muted)":" (unmuted)"),this.trace("callback_volume"+s,"DEFAULT CALLBACK")},play:function t(s){var e=this;if(this.proxy){this.flag_stopped&&(this.resetPlayback(),this.resetTracking(),this.seek(0));var i=this.proxy.play();void 0!==i&&i.then(function(){s&&!e.is_mobile&&(e.dom_controller.style.display=e.params.controlbar?"block":"none")}).catch(function(){e.flag_started||(e.emergencyPlay(),e.callback_error("callback_error","DEFAULT CALLBACK"))})}},emergencyPlay:function t(){this.flag_playing=!1,this.flag_paused=!1,this.params.elementtrigger=!0,this.params.startmuted=!1,this.params.autoplay=!1,this.params.preview=0,this.dom_poster.style.display="block",this.dom_controller.style.display="none";for(var s in this.centered_controls)this.centered_controls[s].style.display="none";this.dom_bigplay.style.display="block",this.reflow(),this.proxy&&(this.unmute(),this.is_mobile&&!this.params.chromeless&&(this.proxy.controls=!0))},pause:function t(){this.proxy&&this.proxy.pause()},mute:function t(){this.proxy&&(this.proxy.muted=!0)},unmute:function t(){this.proxy&&(this.proxy.muted=!1)},isMuted:function t(){if(this.proxy)return this.proxy.muted},isPlaying:function t(){return this.flag_playing},stop:function t(){var s=this;this.proxy&&(this.flag_progress=!1,this.flag_playing&&(this.callback_stop(),this.flag_stopped=!0,this.params.preview>0?(this.params.preview=0,this.flag_completed=!1,this.track_preview_end()):this.track_stop(),this.params.replaywithsound&&(this.disableNotification("volume"),this.unmute()),this.params.endfreeze||this.seek(0),this.disableNotification("pause"),this.pause(),this.resetPlayback(),this.flag_hasposter&&!this.params.endfreeze&&(this.dom_poster.style.display="block"),setTimeout(function(){s.params.chromeless||(s.dom_bigplay.style.display="block",s.dom_controller.style.display="none"),s.reflow()},10)))},replay:function t(){this.dom_spinner.style.display="block",this.dom_replay.style.display="none",this.reflow(!0),this.params.replaywithsound&&(this.disableNotification("volume"),this.unmute()),this.play(),this.seek(0)},cfs:function t(s){this.disableNotification("volume"),this.unmute(),this.params.continuecfs||this.seek(0),this.flag_restartplay||this.flag_cfs||(this.flag_cfs=!0,this.track_cfs(),this.is_mobile&&!this.params.chromeless&&(this.proxy.controls=!!this.params.controlbar)),this.params.preview=0,this.flag_restartplay=!1,s&&!this.is_mobile&&(this.dom_controller.style.display=this.params.controlbar?"block":"none"),this.enableNotifications()},goFS:function t(){this.proxy.requestFullscreen?this.proxy.requestFullscreen():this.proxy.mozRequestFullScreen?this.proxy.mozRequestFullScreen():this.proxy.webkitRequestFullscreen?this.proxy.webkitRequestFullscreen():this.proxy.msRequestFullscreen&&this.proxy.msRequestFullscreen()},getMediaType:function t(s){return this.mTypes[s.split(".")[s.split(".").length-1]]},reflow:function t(s){if(this.api){this.proxy&&(this.proxy.width=this.dom_container.offsetWidth,this.proxy.height=this.dom_container.offsetHeight),this.dom_controller.style.top=this.dom_container.offsetHeight-this.barsize+"px",this.dom_controller.style.left=0;for(var e in this.centered_controls){var i=this.centered_controls[e];i.style.top="50%",i.style.marginTop=i.offsetHeight/2*-1+"px",i.style.left="50%",i.style.marginLeft=i.offsetWidth/2*-1+"px"}s||this.trace("reflow video")}else s||this.trace("reflow useless: video elements aren't ready")},trace:function t(s,e){this.debug&&(window.console&&(e?console.log(s,e):console.log(s)),this.dom_debug&&(this.dom_debug.innerHTML+=(e?e+": ":"")+s+"<br>"))},setVendor:function t(s,e,i){var a=window.getComputedStyle(s,""),o=new RegExp(e+"$","i");for(var l in a)o.test(l)&&(s.style[l]=i)},addClass:function t(s,e){s.classList?s.classList.add(e):s.className+=" "+e},removeClass:function t(s,e){s.classList?s.classList.remove(e):s.className=s.className.replace(new RegExp("(^|\\b)"+e.split(" ").join("|")+"(\\b|$)","gi")," ")},checkMobile:function t(){var s=["desktop"],e=!0;if(window.device)for(var i=0;i<s.length;i++){var a=void 0;a=new RegExp(s[i],"i"),window.document.documentElement.className.match(a)&&(e=!1)}else e="ontouchstart"in window;e?(this.is_mobile=!0,this.trace("mobile browser detected")):(this.is_mobile=!1,this.trace("desktop browser detected"))},checkUA:function t(){var s=!!navigator.userAgent.match(/msie|trident/i),e=!!navigator.userAgent.match(/edge/i),i=!!navigator.userAgent.match(/firefox|fxios/i),a=!!navigator.userAgent.match(/safari/i),o=!!navigator.userAgent.match(/android/i),l=!!navigator.userAgent.match(/iphone|ipad|ipod/i),r=!!navigator.userAgent.match(/chrome|crios/i),n=!!navigator.userAgent.match(/opera|opr/i),h=s||e,d=!(h||n||r||a||i);(r||i)&&(a=!1),n&&(r=!1),h&&(r=!1),this.ua_ie=s,this.ua_edge=e,this.ua_firefox=i,this.ua_safari=a,this.ua_android=o,this.ua_ios=l,this.ua_chrome=r,this.ua_opera=n,this.ua_win=h,this.ua_other=d},help:function t(){window.open("https://github.com/nargalzius/HTMLvideo")},listVars:function t(){for(var s=["playhead","flag_started","flag_playing","flag_paused","flag_isfs","flag_first","flag_buffering","flag_loaded","flag_ap_nonce","flag_listener","flag_restartplay","flag_hasposter","flag_cfs","flag_nonce","flag_progress","flag_completed","flag_stopped","api","centered_controls","temp_storage","params"],e={},i=0;i<s.length;i++)e[s[i]]=this[s[i]];return e}};