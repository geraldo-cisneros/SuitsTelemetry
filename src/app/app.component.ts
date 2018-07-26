import { Component } from '@angular/core';
import { DataService} from 'src/app/services/data.service';



var interval;
var interval_switch;
var time; 
var decider;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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
    console.log("--------------Simulation started--------------")
    

    time = Date.now(); 
    console.log(time);
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
