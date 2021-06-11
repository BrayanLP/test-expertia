import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ClientService {
  API = 'http://localhost:3000'
  constructor(private http: HttpClient) { }

  get(){
    const url = `${this.API}/api/clientes`; 
    const httpOptions = {
      headers: new HttpHeaders({
          Accept: 'application/json',
          'Content-Type': 'application/json', 
        })
    };
    return this.http.get(url, httpOptions);
  }
  detail(id: string){
    const url = `${this.API}/api/clientes/${id}`; 
    const httpOptions = {
      headers: new HttpHeaders({
          Accept: 'application/json',
          'Content-Type': 'application/json', 
        })
    };
    return this.http.get(url, httpOptions);
  }
  edit(id:string, obj: any){
    const url = `${this.API}/api/clientes/${id}`; 
    const httpOptions = {
      headers: new HttpHeaders({
          Accept: 'application/json',
          'Content-Type': 'application/json', 
        })
    };
    return this.http.put(url, obj, httpOptions);
  }
  eliminar(id:string){
    const url = `${this.API}/api/clientes/${id}`; 
    const httpOptions = {
      headers: new HttpHeaders({
          Accept: 'application/json',
          'Content-Type': 'application/json', 
        })
    };
    return this.http.delete(url, httpOptions);
  }
  create(obj:any){
    const url = `${this.API}/api/clientes`; 
    const httpOptions = {
      headers: new HttpHeaders({
          Accept: 'application/json',
          'Content-Type': 'application/json'
        })
    };
    return this.http.post(url, obj, httpOptions);
  }

}
