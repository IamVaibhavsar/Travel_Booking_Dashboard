import { Component, OnInit,Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css']
})
export class MobileComponent implements OnInit {

  @Output() newevent = new EventEmitter<any>();
  @Input() mobileexpand = false;
  price = 0;
  deals = [];
  plans:Array<any> = [];
  summary = {};
  mobile_details = new Map<string, any>();
  plan_details = new Map<String,any>();
  mobileform: FormGroup = new FormGroup({
    service_provider_name: new FormControl('Vodafone'),
    plan: new FormControl('3GB/Day 28D'),
    phone_no: new FormControl("", Validators.required),
  })
  constructor() { }

  ngOnInit(): void {
    this.plans.push("3GB/Day 28D");
    this.plans.push("4GB/Day 84D");
    this.plans.push("3GB/Day 56D");
    this.plans.push("3GB/Day 84D");
    this.plans.push("4GB/Day 56D");
    this.plan_details.set("3GB/Day 28D", {"price":200})
    this.plan_details.set("4GB/Day 84D", {"price":800})
    this.plan_details.set("3GB/Day 56D", {"price":400})
    this.plan_details.set("3GB/Day 84D", {"price":600})
    this.plan_details.set("4GB/Day 56D", {"price":600})
    this.mobile_details.set("Vodafone", {"charge":400});
    this.mobile_details.set("Vi", {"charge":300});
    this.mobile_details.set("Jio", {"charge":200});
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
      let s:any = this.mobileform.get('service_provider_name')?.value;
      let p:any = this.mobileform.get('plan')?.value;
      let m:any = this.mobileform.get('phone_no')?.value;
      let d = this.plan_details.get(this.mobileform.controls['plan'].value)['price'] + this.mobile_details.get(this.mobileform.controls['service_provider_name'].value)['charge'];
      let data:any = {
        'mob': m,
        'provider': s,
        'plan': p,
        'price':d,
      };
      this.deals = this.deals.concat(data);
      console.log(data, this.deals);
      this.summary = {
        'date': this.currentdate(),
        'msg': "Recharge of "+String(p) + " for "+String(s),
      };
      this.addtosummary(this.summary)
    }
  }

  addtosummary(summary:any){
    console.log("Emiting ", summary);
    this.newevent.emit(summary);
  }
}
