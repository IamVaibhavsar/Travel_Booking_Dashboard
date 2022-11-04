import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';


@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {

  @Output() newevent = new EventEmitter<any>();
  available_rooms = 100;
  price = 0;
  deals = [];
  summary = {};
  @Input() hotelexpand = false;
  hotel_details = new Map<string, any>();

  hotelform: FormGroup = new FormGroup({
    hotel_name: new FormControl('Express Inn'),
    rooms: new FormControl(0, Validators.required),
    days: new FormControl(0, Validators.required),
  })

  constructor() { }

  ngOnInit(): void {
    this.hotel_details.set("Express Inn", {"price":2000, "address":"Mumbai Agra Highway, Nashik"});
    this.hotel_details.set("Panchvati Hotel", {"price":1000, "address":"Panchvati, Nashik"});
  }
  currentdate(){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth()+1).padStart(2, '0');
    let yyyy =  today.getFullYear();
    return dd+"-"+mm+"-"+yyyy;
  }
  onsubmit(event: Event){
    console.log(document.activeElement?.getAttribute("Name"));
    if(document.activeElement?.getAttribute("Name")=="book"){
      let d:any = this.hotelform.get('days')?.value;
      let r:any = this.hotelform.get('rooms')?.value;
      let h:any = this.hotelform.get('hotel_name')?.value;
      console.log(d, r, h);
      d = d*r*this.hotel_details.get(h)['price'];
      let data:any = {
        'hotel': h,
        'price': d,
      };
      this.deals = this.deals.concat(data);
      this.available_rooms-=r;
      console.log(data, this.deals);
      this.summary = {
        'date': this.currentdate(),
        'msg': String(r) + " room(s) booked in hotel "+h,
      };
      this.addtosummary(this.summary)
    }
  }
  
  addtosummary(summary:any){
    console.log("Emiting ", summary);
    this.newevent.emit(summary);
  }
}
