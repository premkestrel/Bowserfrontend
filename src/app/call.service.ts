import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class CallService {

  constructor(private httpClient: HttpClient) { 
    // console.log(httpClient);
  }
  login(data){
    return this.httpClient.post("api/login",data); 
    // return this.httpClient.post("http://localhost:3000/api/login",data); 

  }
  register(data){
    return this.httpClient.post("api/register",data); 
    // return this.httpClient.post("http://localhost:3000/api/register",data); 

  }
  search(data){
    return this.httpClient.post("api/list",data); 
    // return this.httpClient.post("http://localhost:3000/api/list",data); 

  }
  addurl(data){
    return this.httpClient.put("api/add",data); 
    // return this.httpClient.put("http://localhost:3000/api/add",data); 

  }
  addkey(data){
    return this.httpClient.post("api/admin",data); 
    // return this.httpClient.post("http://localhost:3000/api/admin",data); ffffflfgg

  }
  dblist(){
    return this.httpClient.get("api/dblist"); 
    // return this.httpClient.get("http://localhost:3000/api/dblist");
  }
  delete(id){
    return this.httpClient.delete("api/dblist/"+id);
    // return this.httpClient.delete("http://localhost:3000/api/dblist/"+id);
  }
}
