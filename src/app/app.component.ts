import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'mongorest';
  notesForm : FormGroup;

  constructor(private fb: FormBuilder){

  }
  
  ngOnInit() {
    this.notesForm = this.fb.group({
      heading:['',Validators.required],
      description:['',Validators.required]
    });
  }
}
