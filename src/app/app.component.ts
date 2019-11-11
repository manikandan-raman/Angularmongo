import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'mongorest';
  notesForm : FormGroup;
  notesList = [];

  constructor(private fb: FormBuilder, private appService : AppService){

  }
  
  ngOnInit() {
    this.notesForm = this.fb.group({
      heading:['',Validators.required],
      description:['',Validators.required]
    });

    this.getNotes('5dc8d9f86f0a2c13443d19e3');
  }

  getNotes(id: string){
    this.appService.getNotes(id).subscribe(data => {
      this.notesList = data
      console.log(data)
    });
  }

  addNotes(){
    if(this.notesForm.valid){
      this.appService.addNotes(this.notesForm.value).subscribe(data => console.log(data))
    }
  }
}
