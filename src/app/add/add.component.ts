import { TranslocoService } from '@ngneat/transloco';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,
     private api:ApiService,
     @Inject(MAT_DIALOG_DATA) public editData:any ,
     private dialogRef:MatDialogRef<AddComponent>,
     private transloco:TranslocoService  ) { }
  //Api ile haberleşmek adına servisimi componentime dahil ettim.

  userForm!:FormGroup; 
  valueForm:boolean=false;  
  btnName:string="Add";
  formValue:string="Add User Form"

  ngOnInit(): void {   //tüm verilerimi formbuilder çatısı altına toplayıp,validator ile veri girişinde bildirim veriyorum.
    this.userForm=this.formBuilder.group({

      userName:['',[Validators.required,Validators.minLength(3)]], //Özel validasyon ayalandı.
      userSurname:['',[Validators.required,Validators.maxLength(20),Validators.minLength(2)]], 
      userEmail:['',[Validators.required,Validators.email]] //email validasyonu

    })

    if(this.editData){
      
      this.userForm.controls['userName'].setValue(this.editData.userName);
      this.userForm.controls['userSurname'].setValue(this.editData.userSurname);
      this.userForm.controls['userEmail'].setValue(this.editData.userEmail);
      this.btnName="Update";
      this.formValue="Update User Form";
    }

  }

  addUser(){
   if(!this.editData)
   {
    if(this.userForm.valid)  //user inputlarını api tarafına ekleme 
    {
      this.api.postUser(this.userForm.value)
      .subscribe({
        next:(res)=>{
        alert("User added successfully!")
        this.userForm.reset();
        this.dialogRef.close('add');
      },
      error:()=>{
        alert("Error while adding the user!")
      }
      })
    }
   }
   else{
    this.updateUser()
  }
  }

  updateUser(){  //user güncelleme kısmı 
    this.api.putUser(this.userForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("User updated successfully!")
        this.userForm.reset();
        
        this.formValue="Add User Form";
        this.btnName="Add";
        
        setTimeout(() => {
          
          this.dialogRef.close('update');

        }, 3000);
      },
      error:()=>{
        alert("Error while updating the values")
      }
    })
  }
   
}
