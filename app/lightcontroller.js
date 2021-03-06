'use strict';

var child_process = require('child_process');

var LightController = (function(){
	function LightController(){
		this.controllerBinary = '../bin/send-milight-cmd';
	}

	LightController.prototype.sendCommand = function(command){
		child_process.execFile(this.controllerBinary, [ command ]);
	};


	// combined operations

	LightController.prototype.enlighten = function(duration){
		// Enable Night Mode
		this.on();
		this.nightmode();

		for(var i=1; i<14; i++) {
			setTimeout(function() {
				this.lighten();
			}.bind(this), i * duration/13 * 1000);
		}
	};

	LightController.prototype.lighten = function(){
		console.log("light it up :)");
		this.sendCommand("5A AC 39 00 0C E5 37");
	};

	LightController.prototype.dim = function(){
		this.sendCommand("5A AC 39 00 04 F2 3C");
	};

	LightController.prototype.dimToLowest = function() {
		for(var i=1; i<14; i++) {
			this.dim();
		}
	};

	// light temperature

	LightController.prototype.colder = function(){
		this.sendCommand("5A AC 39 00 0F 55 AA");
	};

	LightController.prototype.warmer = function(){
		this.sendCommand("5A AC 39 00 0E 52 A6");
	};

	// basic actions

	LightController.prototype.on = function(){
		this.sendCommand("5A AC 39 00 05 B3 F7");
	};

	LightController.prototype.off = function(){
		this.sendCommand("5A AC 39 00 09 B3 F7");
	};

	LightController.prototype.nightmode = function(){
		this.sendCommand("5A AC 39 00 05 FF 4A");
		this.sendCommand("5A AC 39 00 09 00 4F");
	};

	return LightController;
})();

module.exports = LightController;
