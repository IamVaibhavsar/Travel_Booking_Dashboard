import { Component, OnInit,Output, EventEmitter,Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.css']
})
export class TrainComponent implements OnInit {

  @Output() newevent = new EventEmitter<any>();
  @Input() trainexpand = false;
  available_seats = 400;
  price = 0;
  deals = [];
  summary = {};
  train_details = new Map<string, any>();

  trainform: FormGroup = new FormGroup({
    train_name: new FormControl('Geetanjali Express'),
    seats: new FormControl(0, Validators.required),
    from: new FormControl('Mumbai'),
    to: new FormControl('Delhi'),
  })
  constructor() { }

  ngOnInit(): void {
    this.train_details.set("Geetanjali Express", {"price":500});
    this.train_details.set("Vidarbha Express", {"price":1000});
    this.train_details.set("Duranto Express", {"price":1500});
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
      let s:any = this.trainform.get('seats')?.value;
      let p:any = this.trainform.get('train_name')?.value;
      let d = s*this.train_details.get(p)['price'];
      let data:any = {
        'train': p,
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
