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
      id:['',null],
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
    let id = this.notesForm.controls['id'].value;
    if(this.notesForm.valid){
      if(id)
        this.appService.editNotes(id,this.notesForm.value).subscribe(data => {
            this.getNotes('');
        })
      else
      this.appService.addNotes(this.notesForm.value).subscribe(data => console.log(data))

    }
  }

  editNotes(noteArr){
    this.notesForm.reset();
    this.notesForm.controls['id'].setValue(noteArr['_id']);
    this.notesForm.controls['heading'].setValue(noteArr['heading']);
    this.notesForm.controls['description'].setValue(noteArr['description']);
  }

  deleteNotes(id: string){
    this.appService.deleteNotes(id).subscribe(data => console.log(data))
  }
}
