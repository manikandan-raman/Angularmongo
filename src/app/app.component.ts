import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService, Notes } from './app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'mongorest';
  notesForm : FormGroup;
  notesList: Notes;

  constructor(private fb: FormBuilder, private appService : AppService){

  }
  
  ngOnInit() {
    this.notesForm = this.fb.group({
      id:['',null],
      heading:['',Validators.required],
      description:['',Validators.required]
    });

    this.getNotes();
  }

  getNotes(){
    this.appService.getNotes().subscribe(data => {
      this.notesList = data
      console.log(data)
    });
  }

  addNotes(){
    let id = this.notesForm.controls['id'].value;
    if(this.notesForm.valid){
      if(id){
        this.appService.editNotes(id,this.notesForm.value).subscribe(data => {
            this.getNotes();
        })
        this.notesForm.reset();
      }
      else{
        this.appService.addNotes(this.notesForm.value).subscribe(data => {
          this.getNotes();
        })
      }

    }
  }

  editNotes(noteArr){
    this.notesForm.reset();
    this.notesForm.controls['id'].setValue(noteArr['_id']);
    this.notesForm.controls['heading'].setValue(noteArr['heading']);
    this.notesForm.controls['description'].setValue(noteArr['description']);
  }

  deleteNotes(id: string){
    this.appService.deleteNotes(id).subscribe(data => {
      if(data){
        Swal.fire({
          title:'Deleted Successfully',
          text:'',
          type:'success'
        });
      }
    })
  }
}
