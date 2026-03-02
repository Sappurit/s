//-------------------------------------------------------------------
// SappDB - Firebase Realtime Database
// Version 1
//-------------------------------------------------------------------

class SappDB {

	constructor(init) {
            this.dbHost = init.dbHost?.replace(/[^a-zA-Z0-9\-\.]/g, '-') || 'default-host';
            this.dbPath = init.dbPath?.replace(/[^a-zA-Z0-9\-\_]/g, '-') || 'default-path';
	}

	async getAll() {
		try {
			const resp = await fetch('https://' + this.dbHost + '/' + this.dbPath + '.json');
			const data = await resp.json() || {};
			console.log(`[SappDB.getAll] ${this.dbPath}`);
			return data;
		} catch (e) { console.error(`[SappDB.getAll] ${this.dbPath}`, e); return {}; }
	}

	async getKey(key) {
		try {
			key = key.replace(/[^a-zA-Z0-9\-\_]/g, '-');
			const resp = await fetch('https://' + this.dbHost + '/' + this.dbPath + '/' + key + '.json');
			const data = await resp.json() || {};
			console.log(`[SappDB.getKey] ${key}`);
			return data;
		} catch (e) { console.error(`[SappDB.getKey] ${key}`, e); return {}; }
	}

	async setKey(key, value) {
		try {
			key = key.replace(/[^a-zA-Z0-9\-\_]/g, '-');
			await fetch('https://' + this.dbHost + '/' + this.dbPath + '.json', {
				method: 'PATCH',
				body: JSON.stringify({ [key]: value })
			});
			console.log(`[SappDB.setKey] ${key}: ${value}`);
		} catch (e) { console.error(`[SappDB.setKey] ${key}: ${value}`, e); }
	}

	async delKey(key) {
		try {
			key = key.replace(/[^a-zA-Z0-9\-\_]/g, '-');
			await fetch('https://' + this.dbHost + '/' + this.dbPath + '.json', {
				method: 'PATCH',
				body: JSON.stringify({ [key]: null })
			});
			console.log(`[SappDB.delKey] ${key}`);
		} catch (e) { console.error(`[SappDB.delKey] ${key}`, e); }
	}

	msg(text, color = '#FFF8DC', duration = 3000) {
		let msgDiv = document.getElementById('SappDB-Msg-Box');
		if (!msgDiv) {
			msgDiv = document.createElement('div');
			msgDiv.id = 'SappDB-Msg-Box';
			Object.assign(msgDiv.style, {
				position: 'fixed',
				top: '-100px',
				left: '50%',
				transform: 'translateX(-50%)',
				minWidth: '250px',
				width: 'auto',
				height: '60px',
				padding: '10px',
				color: 'black',
				borderRadius: '12px',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				fontSize: '14px',
				fontWeight: '600',
				zIndex: '20000',
				boxShadow: '0 -8px 20px rgba(0,0,0,0.4)',
				transition: 'opacity 0.4s ease, bottom 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
				pointerEvents: 'none',
				textAlign: 'center',
				opacity: '0'
			});
			document.body.appendChild(msgDiv);
		}

		msgDiv.innerText = text;
		msgDiv.style.backgroundColor = color;
		msgDiv.style.opacity = '1';
		msgDiv.style.bottom = '30px'; // Slight bounce up effect

		setTimeout(() => {
			msgDiv.style.opacity = '0';
			msgDiv.style.top = '-100px';
		}, duration);
	}
}

//-------------------------------------------------------------------

// Attach it to window so it's globally accessible
window.SappDB = SappDB;

//-------------------------------------------------------------------

// ==UserScript==
// @name         My Project
// @require      https://sappurit.github.io/s/SappDB-Firebase.js
// ==/UserScript==

/*
let json = {};
let db = null;

(async function() {
	db = new SappDB({
		dbHost: 'my-project.firebasedatabase.app',
		dbPath: 'some-name'
	});

	json = await db.getAll();
})();

function xxx() {
	let myCheckBox_1 = json?.myCheckBox_1 ?? false;
	let myCheckBox_2 = json['myCheckBox_2'] ?? false;
	let myCheckBox_3 = db.getKey('myCheckBox_3') ?? false;
	db.setKey('myCheckBox_4', true);
	db.delKey('myCheckBox_5');
}
*/

//-------------------------------------------------------------------

