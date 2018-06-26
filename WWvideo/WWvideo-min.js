"use strict";function WireWaxPlayer(){}if(WireWaxPlayer.prototype={debug:!1,params:{},default_params:{id:"video",src:"//embed.wirewax.com/8022625/7bafa8/",width:533,height:300,duration:110.97254,player:"ww",autoplay:!1,startmuted:!1,cover:!0,chromeless:!1},api:!1,playhead:0,volume:-1,update_int:300,dom_debug:null,flag_paused:!1,flag_playing:!1,flag_finished:!1,flag_widget:!1,flag_stopping:!1,flag_ready:!1,flag_vol_nonce:!0,flag_vol_mute:!1,load_int:null,init_int:null,prog_int:null,proxy:null,dom_container:null,evaluate:function t(a){if(this.flag_playing=!1,this.playhead=null,this.duration=null,0===Object.keys(this.params).length)for(var i in this.default_params)this.params[i]=this.default_params[i];if(a&&a.constructor===Object){for(var e in a)this.params[e]=a[e];a.src||delete this.params.src}else a&&a.constructor===String?this.params.src=a:a&&a.constructor===Boolean||delete this.params.src;this.dom_container||(this.dom_container=document.getElementById(this.params.id)),this.dom_container.offsetWidth>0&&this.dom_container.offsetHeight>0&&(this.params.width=this.dom_container.offsetWidth,this.params.height=this.dom_container.offsetHeight)},init:function t(a){var i=this;window.wirewax?(clearInterval(this.init_int),this.api=!0,this.evaluate(a),this.params.src?this.load(a):this.trace(this.params,"params (init)")):this.init_int=setTimeout(function(){i.init(a)},500)},load:function t(a){var i=this;if(this.api){if(this.trace("load"),clearInterval(this.load_int),this.proxy)return this.destroy(),void setTimeout(function(){i.load(a)},500);this.evaluate(a),this.trace(this.params,"params (load)");var e="?player="+this.params.player+"&autoplay="+this.params.autoplay+"&muted="+this.params.startmuted+"&skin="+(this.params.chromeless?"SkinBarebonesSlick":"SkinDefaultSlick");this.params.cover&&(e+="&fullBleed=true"),this.proxy=document.createElement("iframe"),this.proxy.id="proxy_"+this.params.id,this.proxy.width=this.params.width+"px",this.proxy.height=this.params.height+"px",this.proxy.src=this.params.src+e,this.proxy.frameborder="0",this.dom_container.appendChild(this.proxy);for(var s in window.wirewax.events.listeners)window.wirewax.addEventListener(window.wirewax.events.listeners[s],function(t){i.eventHandler(t)});window.wirewax.playerId="proxy_"+this.params.id}else this.load_int=setTimeout(function(){i.load(a)},500)},eventHandler:function t(a){switch(a.name){case"playerReady":this.flag_ready=!0,this.callback_ready();break;case"hasPlayed":this.flag_playing&&!this.flag_paused||(this.flag_paused&&this.track_play(),this.flag_playing=!0,this.flag_paused=!1,this.startProgress(),this.callback_play());break;case"videoEnd":this.stopProgress(),trace("video duration: "+this.playhead),this.track_end(),this.callback_end(),this.resetTracking(),this.flag_paused=!1,this.flag_finished=!0;break;case"hasPaused":this.flag_paused||!this.flag_playing||this.flag_stopping||(this.stopProgress(),this.track_pause(),this.callback_pause(),this.flag_paused=!0);break;case"hasSeeked":this.flag_paused||this.startProgress();break;case"volumeChange":a.data.volume!=this.volume?(0==this.volume?(this.track_unmute(),this.callback_volume()):0==a.data.volume&&(this.playhead>0&&!this.flag_vol_nonce&&!this.flag_vol_mute?(this.track_mute(),this.callback_volume()):this.flag_vol_mute=!1),this.volume=a.data.volume):this.flag_vol_nonce&&(this.volume=1,this.setVolume(1),this.flag_vol_nonce=!1,this.flag_vol_mute=!0);break;case"returnCurrentTime":this.playhead=a.data.currentTime;var i=this.playhead/this.params.duration*100;!0!==this.track.started&&i>0&&(this.track.started=!0,this.flag_finished?this.track_replay():this.track_start(),this.callback_start()),!0!==this.track.q25&&i>=25&&(this.track.q25=!0,this.track_q25()),!0!==this.track.q50&&i>=50&&(this.track.q50=!0,this.track_q50()),!0!==this.track.q75&&i>=75&&(this.track.q75=!0,this.track_q75()),this.callback_progress();break;case"scormEvent":break;case"renditionChanged":break;case"widgetClosed":this.flag_widget&&(this.track_tagClose(),this.flag_widget=!1);break;case"widgetShown":this.flag_widget=!0,trace(a),this.track_tagOpen();break;case"clientCustomEvent":break;case"tagClick":break;case"addToCart":this.callback_cart(a.data);break;default:this.trace("nada")}},startProgress:function t(){var a=this;this.stopProgress(),this.prog_int=setInterval(function(){a.updateHander()},this.update_int)},stopProgress:function t(){clearInterval(this.prog_int)},updateHander:function t(){this.api&&this.flag_ready&&window.wirewax.triggerEvent(window.wirewax.events.triggers.GET_CURRENT_TIME),this.flag_stopping&&this.stopBatch()},track:{started:!1,q25:!1,q50:!1,q75:!1},resetTracking:function t(){this.playhead=0,this.track.started=!1,this.track.q25=!1,this.track.q50=!1,this.track.q75=!1,this.flag_playing=!1,this.flag_paused=!1},track_start:function t(){this.trace("------------------ track_start")},track_stop:function t(){this.trace("------------------ track_stop")},track_end:function t(){this.trace("------------------ track_end")},track_play:function t(){this.trace("------------------ track_play")},track_replay:function t(){this.trace("------------------ track_replay")},track_pause:function t(){this.trace("------------------ track_pause")},track_mute:function t(){this.trace("------------------ track_mute")},track_unmute:function t(){this.trace("------------------ track_unmute")},track_q25:function t(){this.trace("------------------ track_q25")},track_q50:function t(){this.trace("------------------ track_q50")},track_q75:function t(){this.trace("------------------ track_q75")},track_tagOpen:function t(){this.trace("------------------ track_tagOpen")},track_tagClose:function t(){this.trace("------------------ track_tagClose")},track_tagSeek:function t(){this.trace("------------------ track_tagSeek")},callback_progress:function t(){},callback_ready:function t(){this.trace("------------------ callback_ready")},callback_end:function t(){this.trace("------------------ callback_end")},callback_play:function t(){this.trace("------------------ callback_play")},callback_start:function t(){this.trace("------------------ callback_start")},callback_error:function t(){this.trace("------------------ callback_error")},callback_stop:function t(){this.trace("------------------ callback_stop")},callback_pause:function t(){this.trace("------------------ callback_pause")},callback_show:function t(){this.trace("------------------ callback_show")},callback_volume:function t(){this.trace("------------------ callback_volume")},callback_cart:function t(a){this.trace("------------------ callback_cart")},play:function t(){this.api&&this.flag_ready&&!this.flag_widget?(this.flag_playing&&this.flag_paused||!this.flag_playing&&!this.flag_paused)&&window.wirewax.triggerEvent(window.wirewax.events.triggers.PLAY):this.flag_widget&&this.tagClose()},pause:function t(){!this.flag_playing||this.flag_paused||this.flag_widget||this.api&&this.flag_ready&&window.wirewax.triggerEvent(window.wirewax.events.triggers.PAUSE)},stop:function t(){this.flag_playing&&(this.flag_widget?(this.flag_stopping=!0,this.tagClose()):this.stopBatch())},stopBatch:function t(){this.flag_stopping=!0,this.stopProgress(),this.pause(),this.seek(0),this.resetTracking(),this.track_stop(),this.callback_stop(),this.flag_stopping=!1},seek:function t(a){this.api&&this.flag_ready&&!this.flag_widget&&(this.stopProgress(),window.wirewax.triggerEvent(window.wirewax.events.triggers.SEEK,a))},getTime:function t(){return this.playhead},isPlayerReady:function t(){this.api&&this.flag_ready&&window.wirewax.triggerEvent(window.wirewax.events.triggers.IS_PLAYER_READY)},tagSeek:function t(a){this.api&&this.flag_ready&&!this.flag_widget&&(window.wirewax.triggerEvent(window.wirewax.events.triggers.GO_TO_TAG,a),this.track_tagSeek())},tagOpen:function t(a){this.api&&this.flag_ready&&!this.flag_widget&&window.wirewax.triggerEvent(window.wirewax.events.triggers.OPEN_TAG,a)},tagClose:function t(){this.api&&this.flag_ready&&this.flag_widget&&window.wirewax.triggerEvent(window.wirewax.events.triggers.CLOSE_WIDGET)},mute:function t(){this.api&&this.flag_ready&&!this.flag_widget&&window.wirewax.triggerEvent(window.wirewax.events.triggers.MUTE_VOLUME)},unmute:function t(){this.api&&this.flag_ready&&!this.flag_widget&&window.wirewax.triggerEvent(window.wirewax.events.triggers.UNMUTE_VOLUME)},setVolume:function t(a){this.api&&this.flag_ready&&!this.flag_widget&&window.wirewax.triggerEvent(window.wirewax.events.triggers.CHANGE_VOLUME,a)},resetVariables:function t(){},resetPlayback:function t(){},destroy:function t(){this.stop(),this.stopProgress(),this.dom_container.innerHTML="",this.proxy=null,this.params={},this.volume=-1,this.flag_paused=!1,this.flag_playing=!1,this.flag_finished=!1,this.flag_widget=!1,this.flag_stopping=!1,this.flag_ready=!1},trace:function t(a,i){this.debug&&(window.console&&window.console.log(a,i||""),this.dom_debug&&(this.dom_debug.innerHTML+=(i?i+": ":"")+a+"<br>"))},listEvents:function t(){for(var a in window.wirewax.events.listeners)console.log(window.wirewax.events.listeners[a])}},!window.wirewax){var checkDebug=!(!window.console||!window.debug);checkDebug&&console.log("LOADING WireWax API");var loadFunction=function t(){void 0!==window.EventBus&&EventBus.dispatch("MAP_LOADED",window),checkDebug&&console.log("WireWax API loaded")},s=document.createElement("script");s.type="text/javascript",s.src="https://edge-player.wirewax.com/ww4release/javascripts/wirewax-iframe-api.js",s.addEventListener("load",loadFunction,!1);var head=document.getElementsByTagName("head")[0];head.appendChild(s)}