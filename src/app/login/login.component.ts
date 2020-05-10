import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{CallService} from "../call.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginvalid:any;
v:any=true;
username:any;
password:any;
loginv:number;
ConfirmPassword:any
gurls:any=null;
regv:any=1;
st:any=null;
successmsg:string=null;
show:any=true;
errormsg:string=null;
keyword:string;
selectlist:[{}];
clicknum:number=0;
con:number=0;
admin:number;
lb:number=0;
lb1:number=null;
status:number=null;
connection:string=null;
dblistv:any=null
delete1:any=null;
  constructor(private callservice:CallService ,private formBuilder: FormBuilder) {
    // console.log("in ngoninit")
  }
logingroup:FormGroup;
registergroup:FormGroup;
searchgroup:FormGroup;
admingroup:FormGroup;
listgroup:FormGroup;

  ngOnInit(): void {
    this.logingroup=this.formBuilder.group({
      'username': ['', [Validators.required]],//binding mandatory validation for aadharNumber
      'password': ['', [Validators.required]],//binding mandatory and custom phonenumber validation for phoneNumber
      
    });
    this.registergroup=this.formBuilder.group({
      'username': ['', [Validators.required]],//binding mandatory validation for aadharNumber
      'password': ['', [Validators.required]],//binding mandatory and custom phonenumber validation for phoneNumber
      'ConfirmPassword': ['', [Validators.required]]
    });
    this.searchgroup=this.formBuilder.group({
      'keyword': ['', [Validators.required]]//binding mandatory validation for aadharNumber
     
    });
    this.admingroup=this.formBuilder.group({
      'keyword': ['', [Validators.required]]//binding mandatory validation for aadharNumber
     
    });
  }
  login(){
    this.successmsg=null;
    this.callservice.login(this.logingroup.value).subscribe((response)=>{
      // console.log(response);
      // this.admin=0;
      // if(response["value"]!=10){
        this.lb=1;
        this.loginv=response["value"];
        // this.logingroup.setValue({keyword:null});

      // }
      
    },err=>{
      // console.log(err);
      this.status=err.status;
      
    })
    
  }
  rb(){
    this.regv=1;
    this.registergroup.setValue({username:null,password:null,ConfirmPassword:null});
  }
  reset(){
this.regv=1;
this.successmsg=null;
this.errormsg=null;
this.show=false;
this.dblistv=null;
this.registergroup.setValue({username:null,password:null,ConfirmPassword:null});
this.logingroup.setValue({username:null,password:null});

  }
  register1(){
    this.successmsg=null;
this.errormsg=null;
    this.regv=0;
    this.show=true;
  }
  register()
{this.loginv=2;
  this.successmsg=null;
this.errormsg=null;
this.show=false;
  this.callservice.register(this.registergroup.value).subscribe(response=>{
    // console.log(response);
    this.connection=null;
    if(response["value"]==1){
     
this.successmsg=response["msg"]
this.registergroup.setValue({username:null,password:null,ConfirmPassword:null});
    }else{
    
      this.errormsg=response["msg"];
      this.registergroup.setValue({username:null,password:null,ConfirmPassword:null});
    }
  },err=>{
    // console.log(err);
    // this.errormsg=
    
    this.status=err.status;
    
  })
  
}
search(){
  this.successmsg=null;
this.errormsg=null;
this.v=true;
// console.log(this.searchgroup.value);
// console.log(this.logingroup.value);
this.clicknum=1;
// console.log({"username":this.logingroup.value.username,"password":this.logingroup.value.password,"keyword":this.searchgroup.value.keyword})
this.callservice.search({"username":this.logingroup.value.username,"password":this.logingroup.value.password,"keyword":this.searchgroup.value.keyword}).subscribe(response=>{

  this.gurls=response["value"];
 this.errormsg=response["error"];
this.st=response["st"];
//  console.log(this.errormsg)
})
  
}
list(){
  // console.log(this.listgroup.value);
}
uadd(selectedurl){
  // let selectlist:[{}];
  this.successmsg=null;
this.errormsg=null;
  // console.log(selectedurl)
//   console.log(selectedurl["title"]+" "+selectedurl["url"]+" "+selectedurl["snippet"])
//   let obj={"title":selectedurl["title"],url:selectedurl["url"],snippet:selectedurl["snippet"]};
//   console.log(obj)
// selectlist.push(obj);
// console.log(selectlist);
this.con=0;
// console.log(this.logingroup.value);
// console.log({"username":this.logingroup.value.username,"password":this.logingroup.value.password,"keyword":this.searchgroup.value.keyword,"datas":[this.gurls[selectedurl]]})
// console.log(this.gurls[selectedurl])
this.callservice.addurl({"username":this.logingroup.value.username,"password":this.logingroup.value.password,"keyword":this.searchgroup.value.keyword,"datas":[this.gurls[selectedurl]]}).subscribe((response)=>{
  // console.log(response);
  // if(response["msg"]=="successfully list is added"){
    this.con=1;
  // }
  this.successmsg=response["msg"];
})
}
cl(){
  this.con=0;
}
reset1(){
  this.gurls=null;
  this.clicknum=0;
  this.st=null;
  
  this.searchgroup.setValue({keyword:null});

}
logout(){
  this.logingroup.setValue({username:null,password:null});
  this.gurls=null;
  this.regv=1
  this.delete1=null;
  this.loginv=null;
  this.dblistv=null;
  this.lb=0;
}
addkey(){
  this.successmsg=null;
this.errormsg=null;
  this.callservice.addkey({"username":this.logingroup.value.username,"password":this.logingroup.value.password,"keyword":this.admingroup.value.keyword}).subscribe(response=>{
   this.successmsg=response["msg"];
  //  this.logingroup.setValue({username:null,password:null});
   this.admingroup.setValue({keyword:null});

  })
}
dblist(){
  this.callservice.dblist().subscribe(response=>{
    this.dblistv=response;
  })
}
delete(data){
  this.callservice.delete(data).subscribe(response=>{
    this.delete1=response["msg"];
    this.dblist();
  })
}
}
