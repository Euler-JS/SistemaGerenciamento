import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';


@Injectable()
export class MyNotesProvider {

	private database: any;
	private rp_database: any;
	private myNotes: any;

	public initDB()
	{
		this.database = new PouchDB('my-notes');
		this.rp_database = new PouchDB('http://127.0.0.1:5984/my-notes')
		this.database.sync(this.rp_database, {
			live: true,
			retry: true
		  }).on('change', function (change) {
				console.log("Algo Mudou", change);
				
		  }).on('paused', function (info) {
			// replication was paused, usually because of a lost connection
			console.log("Paused ", info);
			
		  }).on('active', function (info) {
			// replication was resumed
			console.log("active ", info);
		  }).on('error', function (err) {
			// totally unhandled error (shouldn't happen)
			console.log("Erro ", err);
		  });
	}
	constructor() {
		
	}

	public addNote(theNote: string): Promise<string> {
		const promise = this.database
			.put({
				_id: ('note:' + (new Date()).getTime()),
				note: theNote
			})
			.then((result): string => {
				return (result.id);
			});

		return (promise);
	}

	getMyNotes() {
		return new Promise(resolve => {
			let _self = this;
			this.database.allDocs({
				include_docs: true,
				attachments: true
			}).then(function (result) {
				// handle result
				_self.myNotes = result.rows;
				console.log("Results: " + JSON.stringify(_self.myNotes));
				resolve(_self.myNotes);

			}).catch(function (err) {
				console.log(err);
			});
		});
	}

}
