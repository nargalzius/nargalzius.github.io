/*!
 * 
 * 
 * 
 * 
 * 
 */

var Expandable = function(){
	var self = this;

	Enabler.addEventListener( studio.events.StudioEvent.EXPAND_START, function(e) { self.studioListener(e); } );
	Enabler.addEventListener( studio.events.StudioEvent.EXPAND_FINISH, function(e) { self.studioListener(e); } );
	Enabler.addEventListener( studio.events.StudioEvent.COLLAPSE_START, function(e) { self.studioListener(e); } );
	Enabler.addEventListener( studio.events.StudioEvent.COLLAPSE_FINISH, function(e) { self.studioListener(e); } );
	Enabler.addEventListener( studio.events.StudioEvent.EXIT, function(e) { self.collapse(); } );
}

Expandable.prototype = {
	$: function(str) { return document.querySelector(str); },
	studioListener: function(e) {
		this.trace(e);
		switch(e.type) {
			case "expandStart":
				this.callback_onExpand();
				this.dom_btn_exp.style.visibility = 'visible';
			break;
			case "expandFinish":
				this.dom_btn_col.style.visibility = 'hidden';
				//this.dom_col.zIndex = 10;
				this.onExpandFinish();
			break;
			case "collapseStart":
				this.dom_btn_col.style.visibility = 'visible';
				this.callback_onCollapse();
			break;
			case "collapseFinish":
				this.dom_btn_exp.style.visibility = 'hidden';
				//this.dom_col.zIndex = 30;
				this.onCollapseFinish();
			break;
		}
	},
	debug: false,
	isExpanded: false,
	animate: 500, // SET THIS TO THE SAME ANIMATION VALUE IN CSS
	dom_main: null,
	dom_exp: null,
	dom_col: null,
	dom_btn_exp: null,
	dom_btn_col: null,
	init: function(main, col, exp) {
		var self = this;

		this.dom_main = this.$(main);
		this.dom_col = this.$(col);
		this.dom_exp = this.$(exp);

		this.trace('Expanding dimensions: '+this.dom_exp.offsetWidth+'x'+this.dom_exp.offsetHeight);

		//this.dom_col.zIndex = 30;
		//this.dom_exp.zIndex = 20;

		this.dom_btn_col = this.dom_col.querySelector('.trigger');
		this.dom_btn_exp = this.dom_exp.querySelector('.trigger');
		this.dom_btn_exp.style.visibility = 'hidden';

			this.dom_btn_col.onclick = function(){
				self.colTrigger();
			};
			this.dom_btn_exp.onclick = function(){
				self.expTrigger();
			};
	},
	toggle: function() {
		this.isExpanded ? this.collapse(): this.expand();
	},
	expTrigger: function() {
		this.toggle();
	},
	colTrigger: function() {
		this.toggle();
	},
	expand: function() {
		var self = this;
	
		if(!this.isExpanded) {	
			addClass(this.dom_main, 'expand');
			addClass(this.dom_col, 'expand');
			addClass(this.dom_exp, 'expand');

			Enabler.requestExpand();

			setTimeout(function(){
				Enabler.finishExpand();
			}, (self.animate * 1.2) );
		}
	},
	collapse: function() {
		var self = this;

		if(this.isExpanded) {
			
			removeClass(this.dom_col, 'expand');
			removeClass(this.dom_exp, 'expand');
			removeClass(this.dom_main, 'expand');

			Enabler.requestCollapse();

			setTimeout(function(){
				Enabler.finishCollapse();
			}, (self.animate * 1.2) );
		}
	},
	onExpandFinish: function() {
		this.isExpanded = true;
		this.callback_onExpandFinish();
	},
	onCollapseFinish: function() {
		this.isExpanded = false;
		this.callback_onCollapseFinish();
	},
	callback_onExpand: function() {
		this.trace('AD: Expanding...');
	},
	callback_onCollapse: function() {
		this.trace('AD: Collapsing...');
	},
	callback_onExpandFinish: function() {
		this.trace('AD: Expanded');
	},
	callback_onCollapseFinish: function() {
		this.trace('AD: Collapsed');
	},
	trace: function(str) {
		if(this.debug) console.log(str);
	}

}