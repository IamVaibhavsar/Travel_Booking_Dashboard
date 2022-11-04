import { Component, OnInit,Output, EventEmitter,Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-plane',
  templateUrl: './plane.component.html',
  styleUrls: ['./plane.component.css']
})
export class PlaneComponent implements OnInit {

  @Output() newevent = new EventEmitter<any>();
  @Input() planeexpand = false;
  available_seats = 200;
  price = 0;
  deals = [];
  summary = {};
  plane_details = new Map<string, any>();

  planeform: FormGroup = new FormGroup({
    plane_name: new FormControl('Air India'),
    seats: new FormControl(0, Validators.required),
    from: new FormControl('Mumbai'),
    to: new FormControl('Delhi'),
  })

  constructor() { }

  ngOnInit(): void {
    this.plane_details.set("Air India", {"price":2000});
    this.plane_details.set("Spice Jet", {"price":3000});
    this.plane_details.set("IndiGo", {"price":2500});
  }
  currentdate(){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth()+1).padStart(2, '0');
    let yyyy =  today.getFullYear();
    return dd+"-"+mm+"-"+yyyy;
  }
  onsubmit(){
    console.log(document.activeElement?.getAttribute("Name"));
    if(document.activeElement?.getAttribute("Name")=="book"){
      let s:any = this.planeform.get('seats')?.value;
      let p:any = this.planeform.get('plane_name')?.value;
      let d = s*this.plane_details.get(p)['price'];
      let data:any = {
        'plane': p,
        'price': d,
      };
      this.deals = this.deals.concat(data);
      this.available_seats-=s;
      console.log(data, this.deals);
      this.summary = {
        'date': this.currentdate(),
        'msg': String(s) + " seat(s) booked in "+p,
      };
      this.addtosummary(this.summary)
    }
  }
  
  addtosummary(summary:any){
    console.log("Emiting ", summary);
    this.newevent.emit(summary);
  }
}
