import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface Notes{
  heading: string,
  description: string
}
@Injectable({
  providedIn: 'root'
})
export class AppService {

  uri: string = 'http://localhost:1234/notes';
  constructor(private http: HttpClient) { }

  getNotes(){
    return this.http.get<Notes>(`${this.uri}/`);
  }

  addNotes(notesObj){
    return this.http.post(`${this.uri}/create`,notesObj).pipe(map((res: any) => res.json()));
  }

  editNotes(id:string,notesObj){
    return this.http.put(`${this.uri}/update/${id}`,notesObj);
  }

  deleteNotes(id:string){
    return this.http.delete(`${this.uri}/delete/${id}`);
  }
}
