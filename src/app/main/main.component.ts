import { ApiService } from './../services/api.service';
import { AddComponent } from './../add/add.component';
import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { TranslocoService } from '@ngneat/transloco';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnChanges{

  displayedColumns: string[] = ['userName', 'userSurname', 'userEmail','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
  constructor(
    private dialog:MatDialog,
    private api:ApiService,
    public transloco:TranslocoService) { }  //componentim ve api arası bağlantı sağladım

  ngOnInit(): void {

    this.getAllUsers(); //componentim Angular lifecycle'daki ilk yükleme anında değerlerimi tarafıma getirecek.

  }
  changeLangEn(){
    this.transloco.setActiveLang('en');

  }
  changeLangTr(){
    this.transloco.setActiveLang('tur');
  }

  

  openDialog() {
    this.dialog.open(AddComponent, {  //hangi componentin açıldığını belirledim
      width:'40%' //boyut ayarlaması
    }).afterClosed().subscribe(val=>{
      if(val === 'add'){
        this.getAllUsers();
      }
    })

}

getAllUsers(){
    this.api.getUser()
    .subscribe({
      next:(res)=>{
        this.dataSource=new MatTableDataSource(res);  //tabloma verilerimi aktardım.
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort //sıralama 
      },
      error:()=>{
        alert("Error while fetching the values!")
      }

    })
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

editUser(row:any){
  this.dialog.open(AddComponent,{
    width:'45%',
    data:row
  }).afterClosed().subscribe(val=>{
    if(val==='update'){
      this.getAllUsers(); //pencere
    }
  })
  
  
}

deleteUser(id:number){
  this.api.deleteUser(id).subscribe({
    next:(res)=>{
      alert("User Delete Successfully!")
      this.getAllUsers();
    },
    error:()=>
    alert("Error while deleting the user!")
  })
}
ngOnChanges(changes: SimpleChanges): void {
  
  this.getAllUsers();

}



}
