import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Travel_Booking_Dashboard';
  summarylist = [];
  hotelexpand=false;
  planeexpand=false;
  trainexpand=false;
  mobileexpand=false;
  switch = false;
  constructor(private snackbar:MatSnackBar){
  }
  ngOnInit(){
    
  }
  addsummary(summary:any){
    this.summarylist= this.summarylist.concat(summary);
    console.log("summarylist = ",this.summarylist )
    this.snackbar.open("Transaction successful", "", {
      duration: 2000,
      verticalPosition: 'top',
      panelClass: ["custom-style"],
    });
  }
  
  toggle(){

    let ball = document.getElementById("ball");
    if(ball){
      if(!this.switch)
      {
        this.hotelexpand = true;
        this.planeexpand =true;
        this.trainexpand = true;
        this.mobileexpand = true;
        ball.style.marginLeft = "25px";
      }
        
      else
      {
        this.hotelexpand = false;
        this.planeexpand =false;
        this.trainexpand = false;
        this.mobileexpand = false;
        ball.style.marginLeft = "5px";
      }
        
    };
    this.switch = !this.switch;
  }
}
