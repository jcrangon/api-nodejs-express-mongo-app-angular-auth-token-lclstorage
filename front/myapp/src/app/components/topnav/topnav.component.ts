import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit{
  public isLoggedIn!:boolean
  public userId!: string
  constructor(
    private readonly authService: AuthService
  ){}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn
    let id = localStorage.getItem('sub')
    if(id) {
      this.userId = id
    }
  }

  logout() {
    this.authService.doLogout()
  }
}
