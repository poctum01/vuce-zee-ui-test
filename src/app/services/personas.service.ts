import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PersonInterface } from '../interfaces/person-interface';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  private SERVER = environment.API_TEST + 'person/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private httpClient: HttpClient,
  ) { }

  public save(person: PersonInterface): Observable<any> {
    return this.httpClient.post(this.SERVER, person, this.httpOptions);
  }

  public update(person: PersonInterface): Observable<any> {
    return this.httpClient.put(this.SERVER, person, this.httpOptions);
  }

  public delete(person_id: any): Observable<any> {
    return this.httpClient.delete(this.SERVER+person_id, this.httpOptions);
  }

  public list(): Observable<any> {
    return this.httpClient.get(this.SERVER, this.httpOptions);
  }
}
