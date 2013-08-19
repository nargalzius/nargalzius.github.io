package com.joystick.vanilla.expand {

	import flash.display.*;
	import flash.events.*;
	import flash.system.Security;
	import flash.utils.Timer;
	
	public class ChildCore extends MovieClip {

		private var btnExit:MovieClip;
		private var btnTrigger:*;
		private var delay:Number = 0;
		private var stageW:Number;
		private var stageH:Number;
		private var callTimer:Timer;
		public var childType:String;
		public var childReady:Boolean;
		public var debug:Boolean = false;
		public var local:Boolean = true;
		public var localTest:Timer;
		
		public function ChildCore() {
			Security.allowDomain("*");
			this.addEventListener(Event.ADDED_TO_STAGE, setStage);
		}
		
		private function setStage(e:Event):void
		{
			this.removeEventListener(Event.ADDED_TO_STAGE, setStage);

			stageW = this.stage.width;
			stageH = this.stage.height;

			if(btnExit)
			{
				this.btnExit.width  = stageW;
				this.btnExit.height = stageH;
			}
			this.parent.addEventListener("WE_ARE_LIVE", isLive );
			this.parent.dispatchEvent(new Event("ARE_WE_LIVE"));

			localTest = new Timer(500, 1);
			localTest.addEventListener(TimerEvent.TIMER_COMPLETE, localResult);
			localTest.start();
		}

		public function localResult(e:TimerEvent):void {}

		public function setChild(e:MovieClip, t:*, b:Boolean, d:Number):void
		{
			if(e)
				this.btnExit = e;

			if(t)
				this.btnTrigger = t;

			callTimer = new Timer(d*1000, 1)

			if(b)
				this.btnTrigger.addEventListener(MouseEvent.ROLL_OVER, expand);
			else
			{
				if(childType == "expanded")
					this.btnTrigger.addEventListener(MouseEvent.CLICK, collapse);
				else
					this.btnTrigger.addEventListener(MouseEvent.CLICK, expand);
			}

			this.btnExit.addEventListener(MouseEvent.CLICK, exitHandler);
			this.btnExit.x = this.btnExit.y = 0;
			
			if(stageW && stageH)
			{
				this.btnExit.width  = stageW;
				this.btnExit.height = stageH;
			}
		}

		public function exitHandler(e:* = null):void {}

		public function timerCall(e:* = null):void
		{

			this.parent.dispatchEvent(new Event("META_TRIGGERED"));
	
			killTimerListener();
	
			callTimer.addEventListener(TimerEvent.TIMER_COMPLETE, callAction)
			callTimer.start();
	
			if(debug)
				trace('setting timer & listener for '+ childType);
		}

		public function killTimer(e:Event)
		{

			killTimerListener();

			callTimer.addEventListener(TimerEvent.TIMER_COMPLETE, callAction)
			callTimer.reset();

			if(debug && delay > 0)
				trace('killing timer & listener for '+ childType);
		}

		private function isLive(e:Event):void
		{
			local = false;
			if(debug)
				trace(childType+" is not local.");
		}

		// OVERRIDDEN FUNCTIONS
		public function expand(e:* = null):void {}
		public function collapse(e:* = null):void {}
		public function callAction(e:TimerEvent):void {}
		public function killTimerListener():void {}
	}
}
