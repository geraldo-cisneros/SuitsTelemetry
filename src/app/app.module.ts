import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Testability } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { Observable, interval, pipe } from 'rxjs';
import {switchMap, map} from 'rxjs/operators';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { DataService} from './services/data.service'

import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { EditComponent } from './components/edit/edit.component';
import { CreateComponent } from './components/create/create.component';
import { UserComponent } from './components/user/user.component';
import { AboutComponent } from './components/about/about.component';

const appRoutes: Routes = [
  { path: 'create', component:CreateComponent},
  { path: 'edit/:id', component: EditComponent},
  { path: 'list', component: ListComponent}, 
  { path: '', component: UserComponent}, 
  { path: 'about', component: AboutComponent}, 
  { path: '', redirectTo: 'list', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AboutComponent,
    ListComponent,
    CreateComponent, 
    EditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MDBBootstrapModule.forRoot(),
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA 
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  title ='NASA SUITS 2018';
  name:string;
  age:number;
  email:string;
  address:address;
  array:string[];
  posts:Post[];
  isEdit: boolean =  false;


  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.age =30;
    this.email = 'test@test.com'
    this.address = {
      street: '50 Main St',
      city: 'Boston',
      state: 'MA'
       }
   this.array = ['new'];

   this.dataService.getPosts().subscribe((posts) => {
     //console.log(posts);
     this.posts = posts;

   });
  }
  
onClick(){
    console.log('Error Deployed');
    console.log("--------------Simulation started--------------");
    setInterval(function(){
      console.log("Help"); 
    },1000);
    //interval = setInterval(Simulation.suitTelemetry.bind(null, time, decider),1000);
    //interval_switch = setInterval(SuitSwitch.SuitSwitch.bind(null,decider),1000);
}

addLog(log){
  console.log(log);
  this.array.unshift(log);
  return false;
}

deleteLog(log){
  for(let i=0;i<this.array.length;i++){
    if (this.array[i]== log){
      this.array.splice(i,1);
    }
  }
}

toggleEdit(){
  this.isEdit = !this.isEdit;
}

}


interface address{
  street: string,
  city:string,
  state:string,
}

interface Post{
  id: number,
  title: string,
  body: string,
  userid: number,

}



