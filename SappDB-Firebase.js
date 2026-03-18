//-------------------------------------------------------------------
// SappDB - Firebase Realtime Database
//-------------------------------------------------------------------

class SappDB {

	static #version = '1.2.0';

	constructor(setting) {
            this.host = setting.host?.replace(/[^a-zA-Z0-9\-\.]/g, '-') || 'default-host';
            this.path = setting.path?.replace(/[^a-zA-Z0-9\-\_]/g, '-') || 'default-path';
	}

	async getAll() {
		const info = `[SappDB] ${this.path} : getAll`;
		try {
			const resp = await fetch('https://' + this.host + '/' + this.path + '.json');
			const data = await resp.json() || {};
			console.log(info);
			return data;
		} catch (e) { console.error(info + ' : ' + e); return {}; }
	}

	async getKey(key) {
		const info = `[SappDB] ${this.path} : getKey : ${key}`;
		try {
			key = key.replace(/[^a-zA-Z0-9\-\_]/g, '-');
			const resp = await fetch('https://' + this.host + '/' + this.path + '/' + key + '.json');
			const data = await resp.json() || {};
			console.log(info);
			return data;
		} catch (e) { console.error(info + ' : ' + e); return {}; }
	}

	async setKey(key, value) {
		const info = `[SappDB] ${this.path} : setKey : ${key}`;
		try {
			key = key.replace(/[^a-zA-Z0-9\-\_]/g, '-');
			await fetch('https://' + this.host + '/' + this.path + '.json', {
				method: 'PATCH',
				body: JSON.stringify({ [key]: value })
			});
			console.log(info);
		} catch (e) { console.error(info + ' : ' + e); }
	}

	async delKey(key) {
		const info = `[SappDB] ${this.path} : delKey : ${key}`;
		try {
			key = key.replace(/[^a-zA-Z0-9\-\_]/g, '-');
			await fetch('https://' + this.host + '/' + this.path + '.json', {
				method: 'PATCH',
				body: JSON.stringify({ [key]: null })
			});
			console.log(info);
		} catch (e) { console.error(info + ' : ' + e); }
	}

	async setKeys(json) {
		const info = `[SappDB] ${this.path} : setKeys : ${Object.keys(json).length} keys`;
		try {
			await fetch('https://' + this.host + '/' + this.path + '.json', {
				method: 'PATCH',
				body: JSON.stringify(json)
			});
			console.log(info);
		} catch (e) { console.error(info + ' : ' + e); }
	}

	static popup(text = 'Untitled', color = '#FFF8DC', duration = 3000) {
		let popupDiv = document.getElementById('SappDB-Popup');
		if (!popupDiv) {
			popupDiv = document.createElement('div');
			popupDiv.id = 'SappDB-Popup';
			Object.assign(popupDiv.style, {
				position: 'fixed',
				top: '-1000px',
				left: '50%',
				transform: 'translateX(-50%)',
				minWidth: '200px',
				maxWidth: '60%',
				width: 'auto',
				minHeight: '50px',
				height: 'auto',
				padding: '10px',
				borderRadius: '10px',
				display: 'flex',
				alignItems: 'center',
				textAlign: 'center',
				justifyContent: 'center',
				color: 'black',
				font: 'bold 14px Roboto',
				zIndex: '20000',
				boxShadow: '0 0 10px rgba(0,0,0,0.5)',
				pointerEvents: 'none',
				boxSizing: 'border-box',
			});
			document.body.appendChild(popupDiv);
		}

		popupDiv.innerText = text;
		popupDiv.style.backgroundColor = color;
		popupDiv.style.transition = 'top 0.3s ease-out';
		popupDiv.style.top = '30px';

		setTimeout(() => {
			popupDiv.style.transition = 'top 0.5s ease-in';
			popupDiv.style.top = '-1000px';
		}, duration);
	}

	static get version() {
		const info = `[SappDB] version : ${this.#version}`;
		console.log(info);
		return this.#version;
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
		host: 'my-project.firebase.database.app',
		path: 'my-name'
	});

	json = await db.getAll();
})();

async function status() {
	let myCheckBox_1 = json?.myCheckBox_1 ?? false;
	let myCheckBox_2 = json['myCheckBox_2'] ?? false;
	let myCheckBox_3 = await db.getKey('myCheckBox_3') ?? false;
	await db.setKey('myCheckBox_4', true);
	await db.delKey('myCheckBox_5');
	SappDB.popup('OK', 'red', 2000);
	console.log(SappDB.version); // '1.2.0'
}
*/

//-------------------------------------------------------------------

