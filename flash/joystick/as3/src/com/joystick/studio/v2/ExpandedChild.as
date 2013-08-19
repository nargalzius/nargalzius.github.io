package com.joystick.studio.v2 {

	import flash.display.*;
	import flash.events.*;
	import flash.system.Security;

	import com.joystick.studio.v2.ExpandProxy;
	
	public class ExpandedChild extends ExpandProxy {

		public var _EXIT:MovieClip;
		public var _TRIGGER:*;
		public var _DELAY:Number 	= 0;
		public var _ROLLOVER:Boolean = false;

		public function ExpandedChild() {
			Security.allowDomain("*");
			childType = "expanded";
			childReady = false;
		}

		public function init()
		{
			if(!_EXIT)
				_EXIT = new MovieClip();
			if(!_TRIGGER)
				_TRIGGER = new MovieClip();

			setChild(_EXIT, _TRIGGER, _ROLLOVER, _DELAY);
		
			if(debug)
				trace('initialized '+childType+' child');

			this.parent.addEventListener("META_EXPANDED", metaHandler );
			this.parent.addEventListener("META_COLLAPSING", metaHandler );
			this.parent.addEventListener("META_TRIGGERED", metaHandler );
			this.parent.addEventListener("META_TRIGGERED", cleanup );
			this.parent.addEventListener("REQUEST_COLLAPSE", requestCollapse );
			this.parent.addEventListener("META_EXPANDED", readyExpanded );

		}

		override public function localResult(e:TimerEvent):void
		{
			localTest.removeEventListener(TimerEvent.TIMER_COMPLETE, localResult);
			if(local)
			{
				this.parent.dispatchEvent(new Event("META_EXPANDED"));
				trace("Child is local, bypassing META_EXPANDED");
			}
		}

		override public function callAction(e:TimerEvent):void
		{
			this.parent.dispatchEvent(new Event("AD_COLLAPSE"));
			if(debug)
				trace("collapse");
		}

		override public function collapse(e:* = null):void
		{
			if(childReady || local)
				timerCall();

			childReady = false;
		}

		override public function killTimerListener():void
		{
			this.parent.removeEventListener("META_COLLAPSING", killTimer);
		}

		override public function exitHandler(e:* = null):void
		{
			if(childReady || local)
			{
				enabler.exit("EXPANDED BG EXIT");

				if(debug)
					trace(childType+" exit");
			}
		}

		private function requestCollapse(e:Event)
		{
			if(childReady || local)
			{
				collapse();
				if(debug)
					trace('requesting collapse');
			}
		}
		private function readyExpanded(e:Event)
		{
			childReady = true;
		}

		private function cleanup(e:* = null)
		{
			this.parent.removeEventListener("META_EXPANDED", metaHandler );
			this.parent.removeEventListener("META_COLLAPSING", metaHandler );
			this.parent.removeEventListener("META_TRIGGERED", metaHandler );
			this.parent.removeEventListener("META_TRIGGERED", cleanup );
			this.parent.removeEventListener("REQUEST_COLLAPSE", requestCollapse );
			this.parent.removeEventListener("META_EXPANDED", readyExpanded );
		}
	}
}
