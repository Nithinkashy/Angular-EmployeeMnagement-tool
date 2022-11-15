import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginform:FormGroup;
  constructor(private formBuilder:FormBuilder,private http:HttpClient,private router:Router) { }

  ngOnInit() : void{
    this.loginform = this.formBuilder.group({
      email:[''],
      password:['']
    })
  }
  login(){
    this.http.get<any>("http://localhost:3000/signupUsers")
    .subscribe(res=>{
      const user=res.find((a:any)=>{
        return a.email === this.loginform.value.email && a.password === this.loginform.value.password;
      });
      if(user){
        alert('Login Successfull');
        this.loginform.reset();
        this.router.navigate(['dashboard'])
      }
      else{
          alert('Login not Successfull!!');
      }
    },err=>{
      alert("Something went wrong!!")
    })
  }

}
