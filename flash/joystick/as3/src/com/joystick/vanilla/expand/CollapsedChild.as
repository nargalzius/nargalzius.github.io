package com.joystick.vanilla.expand {

	import flash.display.*;
	import flash.events.*;
	import flash.system.Security;

	import com.joystick.vanilla.expand.ChildCore
	
	public class CollapsedChild extends ChildCore {
		
		public var _EXIT:MovieClip;
		public var _TRIGGER:*;
		public var _DELAY:Number 	= 0;
		public var _ROLLOVER:Boolean = false;

		public function CollapsedChild() {
			Security.allowDomain("*");
			childType = "collapsed";
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

			this.parent.addEventListener("META_EXPANDING", metaHandler );
			this.parent.addEventListener("META_EXPANDED", metaHandler );
			this.parent.addEventListener("META_COLLAPSING", metaHandler );
			this.parent.addEventListener("META_COLLAPSED", metaHandler );
			this.parent.addEventListener("META_COLLAPSED", readyChild );
			this.parent.addEventListener("META_TRIGGERED", metaHandler );

			childReady = true;
		}

		override public function localResult(e:TimerEvent):void
		{
			localTest.removeEventListener(TimerEvent.TIMER_COMPLETE, localResult);
			if(local)
			{
				this.parent.dispatchEvent(new Event("META_COLLAPSED"));
				trace("Child is local, bypassing META_COLLAPSED");
			}
		}

		override public function expand(e:* = null):void
		{
			if(childReady)
			{
				this.parent.addEventListener("META_EXPANDREADY", expandReady );
				this.parent.dispatchEvent(new Event("AD_EXPAND"));
				if(debug)
					trace("loading expanded");
			}

			if(local)
				this.parent.dispatchEvent(new Event("META_TRIGGERED"));

			childReady = false;
		}

		override public function callAction(e:TimerEvent):void
		{
			this.parent.dispatchEvent(new Event("START_EXPAND"));
			if(debug)
				trace("expand");
		}

		override public function killTimerListener():void
		{
			this.parent.removeEventListener("META_EXPANDING", killTimer);
		}

		override public function exitHandler(e:* = null):void
		{
			if(childReady || local)
			{
				if(debug)
					trace(childType+" exit");
			}
		}

		private function expandReady(e:Event):void
		{
			if(debug)
				trace("expand_ready...");

			this.parent.removeEventListener("META_EXPANDREADY", expandReady );

			timerCall();
		}

		private function readyChild(e:Event):void
		{
			childReady = true;
		}
	}
}
