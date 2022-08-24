import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  postUser(data:any){
    return this.http.post<any>("https://localhost:3000/userList/",data)  //yeni kullanıcı ekleme 
  }
  getUser(){
    return this.http.get<any>("https://localhost:3000/userList/") //mevcut kayıtları çekme 
  }

  putUser(data:any, id:number){ //güncelleme işlemi
    return this.http.put<any>("https://localhost:3000/userList/"+id,data)
  }

  deleteUser(id:number){ //silme işlemi
      return this.http.delete<any>("https://localhost:3000/userList/"+id)
  }
}  //api tarafında crud işlemleri tamamlandı.  
