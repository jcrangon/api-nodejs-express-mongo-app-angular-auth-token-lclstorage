import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  public headerData!: any

  constructor() {
    this.headerData = {
      heroTitle: 'Nos Recettes',
      heroImg: './assets/img/header-home.webp'
    }
  }

  ngOnInit(): void {

  }
}
