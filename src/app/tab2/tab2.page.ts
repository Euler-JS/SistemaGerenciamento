import { Component } from '@angular/core';
import { KangarooService } from '../kangaroo.service';
import { Observable } from 'rxjs';
import { MyNotesProvider } from '../services/my-notes/my-notes';

export interface Entry {
	_id: string;
	test: string;
	weight: number;
	time: number;
	bp: string;
	bodyfatPer: number;
}

@Component({
	selector: 'app-tab2',
	templateUrl: 'tab2.page.html',
	styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
	matricula: string = ""
	dataEscolhida: string = ""
	inter_tempo
	allDocs= [];

	constructor(public myNotes: MyNotesProvider) {
		

	}

	pesquisar()
	{
		this.allDocs = []

		
		this.allDocs = [... this.myNotes.myNotes]
		let e = this.allDocs[0].doc.note.data_entrada
		console.log((e.split(':'))[0].split('T')[0]);
		
		// return
		if(this.matricula.length > 0 && this.dataEscolhida.length > 0)
		{
			this.allDocs = this.allDocs.filter(dado=> dado.doc.note.matricula == this.matricula && 
				(dado.doc.note.data_entrada.split(':'))[0].split('T')[0] == this.dataEscolhida)
			console.log("As duas coisas escolhidas");
			this.clearAll()
		}
		else if(this.matricula.length > 0)
		{
			this.allDocs = this.allDocs.filter(dado=> dado.doc.note.matricula == this.matricula)
			console.log("Somente data matricula");
			this.clearAll()
		}
		
		else if(this.dataEscolhida.length > 0)
		{
			this.allDocs = this.allDocs.filter(dado=> (dado.doc.note.data_entrada.split(':'))[0].split('T')[0] == this.dataEscolhida)
			console.log("Somente data escolhida");
			this.clearAll()
		}
		else
		{
			console.log("Nenhuma informacao escolhida");
			// this.clearAll()
		}
		
		
	}

	clearAll()
	{
		console.log(this.allDocs);
		this.dataEscolhida = ""
		this.matricula = ""

		let inputDate = <HTMLInputElement> document.getElementById("myPicker1");
		inputDate.value = ""
	}
}
