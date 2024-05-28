import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BackendErrorInterface } from 'src/app/auth/types/backend.errors.interface';

@Component({
  selector: 'app-error-messages',
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.css'],
  standalone:true,
  imports:[CommonModule]
})
export class ErrorMessagesComponent {
 @Input() backendErrors: BackendErrorInterface={};

 errorMessages:string[] = [];
 ngOnInit(){
  this.errorMessages = Object.keys(this.backendErrors).map((name:string) =>{
     const messages = this.backendErrors[name].join(' ')
     return `${name} ${messages}`    
  })
 }

}
