const cheats = {

	levelUp() {
		player.level++;
		playerClass.kills = 0;

        player.level++;
        playerClass.lvl = player.level;

        player.levelupImageProcess();
        player.tryas = 20;
        playerClass.calculateNeedKils();
        
		classes.L.Z.play("levelup")
	},

	addKill() {
		playerClass.kills++;
        classes.Ft.instance.animateKillsLabel()
        if(player.level >= playerClass.MAX_LVL) return;

		playerClass.kills >= playerClass.killsToNextLevel && this.levelUp()
	},

	setKills(kills) {
		playerClass.kills = kills;

		if(player.level >= playerClass.MAX_LVL) return;

		playerClass.kills >= playerClass.killsToNextLevel && this.levelUp()
	}
}

function runCheat(cheat, ...args) {
	if(player == null) return;

	cheats[cheat](...args);
}

// Create a cheat config menu
const menu = document.createElement("div");
menu.id = "menu";
document.body.appendChild(menu);

const showMenu = document.createElement("button");
showMenu.id = "show-menu";
showMenu.innerHTML = "Menu";
document.body.appendChild(showMenu);

const coordinates = document.createElement("div");
coordinates.id = "coordinates";
coordinates.innerHTML = `
<p>X: <span id='cordX'>69</span></p>
<p>Y: <span id='cordY'>-69</span></p>
<span display="none" id="portal">
	<p>Portal X: <span id='portalCordX'>0</span></p>
	<p>Portal Y: <span id='portalCordY'>0</span></p>
	<button>Teleport to portal</button>
</span>
`;
document.body.appendChild(coordinates);

const coordinateValues = {
	x: coordinates.querySelector("#cordX"),
	y: coordinates.querySelector("#cordY"),
	portal: coordinates.querySelector("#portal"),
	portalX: coordinates.querySelector("#portalCordX"),
	portalY: coordinates.querySelector("#portalCordY")
}

coordinates.querySelector("button").addEventListener("click", (e) => {
	const portal = classes.Ft.portal;

	player.x = parseInt(portal.x);
	player.y = parseInt(portal.y);
});

menu.innerHTML = `
<h1>Player</h1>
<hr>
<p>Show coordinates</p>
<input type="checkbox" id="show-coords">

<p>God mode</p>
<input type="checkbox" id="immortal">

<p>Set health</p>
<input type="number" id="health" value="100">

<p>Set armor</p>
<input type="number" id="armor" value="100">

<p>Set speed</p>
<input type="number" id="speed" value="9">

<p>Set damage</p>
<input type="number" id="damage" value="8">
<!--
<h1>Auto</h1>
<hr>
<p>Auto fire</p>
<input type="checkbox" id="auto-fire">

<p>Aimbot</p>
<input type="checkbox" id="aimbot">
-->

<h1>Stats</h1>
<hr>
<button id="addKill">Add kill</button>
<button id="levelUp">Level up</button>

<p>Set kills</p>
<input type="number" id="kills" value="0">
<button id="setKills">Set kills</button>

<p>Set chainsaw time</p>
<input type="number" id="chainsawTime" value="2000">

<h1>Client side</h1>
<hr>
<button id="spawn-bomb">Spawn bomb</button>
`;

menu.querySelector("#addKill").addEventListener("click", (e) => {
	runCheat("addKill");
})

menu.querySelector("#setKills").addEventListener("click", (e) => {
	runCheat("setKills", parseInt(menu.querySelector("#kills").value));
});

menu.querySelector("#levelUp").addEventListener("click", (e) => {
	runCheat("levelUp");
});

menu.querySelector("#chainsawTime").addEventListener("click", (e) => {
	if(player == null) return;

	playerClass.chainsawTime = parseInt(e.target.value);
});

menu.querySelector("#health").addEventListener("change", (e) => {
	if(player == null) return;
	
	player.currentHP = parseInt(e.target.value);
});

menu.querySelector("#armor").addEventListener("change", (e) => {
	if(player == null) return;

	playerClass.armor = parseInt(e.target.value);
});

menu.querySelector("#speed").addEventListener("change", (e) => {
	if(player == null) return;

	player.speed = parseInt(e.target.value);
});

menu.querySelector("#damage").addEventListener("change", (e) => {
	if(player == null) return;

	player.damage = parseInt(e.target.value);
});

menu.querySelector("#spawn-bomb").addEventListener("click", (e) => {
	if(player == null) return;

	classes.Ft.spawnExplode(player.x, player.y, player);
});

const showCoords = menu.querySelector("#show-coords");
showCoords.addEventListener("change", (e) => {
	coordinates.style.display = e.target.checked ? "block" : "none";
});

showMenu.addEventListener("click", (e) => {
	if(menu.style.display == "block") {
		menu.style.display = "none";
	}
	else {
		menu.style.display = "block";
	}
});

const autoFire = menu.querySelector("#auto-fire");
const aimbot = menu.querySelector("#aimbot");
const immortal = menu.querySelector("#immortal");

/* 
// Modify websocket messages 
const originalSend = WebSocket.prototype.send;
let socketIstance = null;

WebSocket.prototype.send = function(...args) {
  	socketIstance = this;

  	const json = JSON.parse(args[0]);

  	// console.log(json);
  	if(blatant) {
	  	json.x = 0; // lol
	  	json.y = 0;
  	}

  	return originalSend.call(this, [JSON.stringify(json)]);
};
*/

// When checking function, field names don't forget background.js
// let ENTITIES = [];
let player = null;
let playerClass = null;
let classes = null;

function postUpdate() {
	/*
	aimbot.checked && (() => {
		const zombies = ENTITIES.filter(e => e.isEnemy && e.visible);
	
		if(zombies.length === 0) return;
		
		let closestZombie = null;
		let minDistance = Infinity;

		// iterate through all enemies
		zombies.forEach(zombie => {
			let distance = Math.sqrt((zombie.x - this.x) ** 2 + (zombie.y - this.y) ** 2);

			// update closest enemy if distance is smaller than current minimum
			if (distance < minDistance) {
				closestZombie = zombie;
				minDistance = distance;
			}
		});

		if(closestZombie == null) return;

		// aim at closest enemy

	})();
	*/

	if(immortal.checked) this.currentHp = this.HP;

	if(showCoords.checked) {
		coordinateValues.x.textContent = Math.round(this.x);
		coordinateValues.y.textContent = Math.round(this.y);

		const portal = classes.Ft.portal;
		coordinateValues.portal.style.display = portal ? "block" : "none";

		if(portal) {
			coordinateValues.portalX.textContent = Math.round(portal.x);
			coordinateValues.portalY.textContent = Math.round(portal.y);
		}
	}

	// console.log("Rotation: " + this.container.rotation);
}

// Player class -> minified = ft class
function loadGame(playerClass_) {
	playerClass = playerClass_;

	player = playerClass.localPlayer;
	
	const originalUpdate = player.update;

	player.update = function() {

		originalUpdate.call(player);
		postUpdate.call(player);

	};
}


/*
(() => {
function getSymbols(obj) {
    let symbols = [];
    while (obj = Reflect.getPrototypeOf(obj)) {
      let keys = Reflect.ownKeys(obj)
      keys.forEach((k) => symbols.push(k));
    }

    return symbols;
}

let fields = [];
getSymbols(player).forEach(m => {
	try{
		if(typeof player[m] === "number") {
			fields.push(m);
		}
	}
    catch(e) {
		console.log(e);
	}
})

console.log(fields);
})()
*/