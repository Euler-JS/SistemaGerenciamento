import { Component } from '@angular/core';
import { KangarooService } from '../kangaroo.service';
import { MyNotesProvider } from '../services/my-notes/my-notes';

@Component({
	selector: 'app-tab1',
	templateUrl: 'tab1.page.html',
	styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

	allNotes: any;

	constructor(public myNotes: MyNotesProvider) {
		// this.getNotes();
	}

	ionViewWillEnter() {
		// this.getNotes();
	}

	getNotes() {
		this.myNotes.getMyNotes().then((data) => {
			console.log("Tab1Page Results: " + JSON.stringify(data));
			this.allNotes = data;
		});
	}

	onEnter(value: string) {
		let _self = this
		this.myNotes.addNote(value);
		// this.getNotes();
		// this.myNotes.database.replicate.to(_self.myNotes.rp_database).on('complete', function () {
		// 		console.log("Replica");
				
		//   }).on('error', function (err) {
		// 	// boo, something went wrong!
		//   });
		// this.myNotes.syncData()
	}

}
