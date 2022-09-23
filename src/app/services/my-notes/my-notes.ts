import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';


@Injectable()
export class MyNotesProvider {

	public database: any;
	public rp_database: any = new PouchDB('http://admin:euler2014@192.168.1.163:5984/registro-viaturas');
	private myNotes=[];

	constructor() {
		this.database = new PouchDB('registro-viaturas');
		this.getMyNotes()
		this.syncData()
	}

	syncData()
	{
		let _self = this
		
		this.database.sync(this.rp_database, {
			live: true,
			retry: true
		  }).on('change', function (change) {
				console.log("Algo Mudou", change);
				_self.getMyNotes()
				
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
				console.log("Results: ", _self.myNotes['doc']);
				resolve(_self.myNotes);
			}).catch(function (err) {
				console.log(err);
			});
		});
	}

}
