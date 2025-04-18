
// Version 1

//-------------------------------------------------------------------

/*
<script src="https://sappurit.github.io/s/SappDB.js"></script>
<script>
const db = new SappDB('SappDB', 'SomeWeb');

(async () => {
	await db.set('name', 'John Doe');

	checkbox.name    = (await db.get('name')) ?? 'default';
        checkbox.checked = (await db.get('name.checked')) ?? false;

	// await db.delete('name');

	// await db.clearAll();
})();
</script>
*/

//-------------------------------------------------------------------

class SappDB {

	constructor(dbName = "SappDB", storeName = "SappStore") {
		this.dbName = dbName;
		this.storeName = storeName;
		this.db = null;
	}

	async open() {
		if (this.db) return this.db;

		return new Promise((resolve, reject) => {
			const request = indexedDB.open(this.dbName, 2);

			request.onupgradeneeded = (e) => {
				const db = e.target.result;
				if (!db.objectStoreNames.contains(this.storeName)) {
					db.createObjectStore(this.storeName);
				}
			};

			request.onsuccess = (e) => {
				this.db = e.target.result;
				resolve(this.db);
			};

			request.onerror = () => reject(request.error);
		});
	}

	async set(key, value) {
		const db = await this.open();
		const tx = db.transaction(this.storeName, "readwrite");
		tx.objectStore(this.storeName).put(value, key);

		return new Promise((resolve, reject) => {
			tx.oncomplete = () => resolve(true);
			tx.onerror = () => reject(tx.error);
		});
	}

	async get(key) {
		const db = await this.open();
		const tx = db.transaction(this.storeName, "readonly");
		const request = tx.objectStore(this.storeName).get(key);

		return new Promise((resolve) => {
			request.onsuccess = () => resolve(request.result);
			request.onerror = () => resolve(undefined);
		});
	}

	async delete(key) {
		const db = await this.open();
		const tx = db.transaction(this.storeName, "readwrite");
		tx.objectStore(this.storeName).delete(key);
	}

	async clearAll() {
		const db = await this.open();
		const tx = db.transaction(this.storeName, "readwrite");
		tx.objectStore(this.storeName).clear();
	}
}

//-------------------------------------------------------------------

// Attach it to window so it's globally accessible
window.SappDB = SappDB;

//-------------------------------------------------------------------

