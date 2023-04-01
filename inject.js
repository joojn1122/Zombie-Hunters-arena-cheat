const script = document.createElement("script");

script.src = chrome.runtime.getURL("cheat.js");

script.onload = function() {
	this.remove();
};

(document.body || document.documentElement).prepend(script);