import {Component} from '@angular/core'
import {RouterOutlet} from '@angular/router'
import { TopbarComponent } from './shared/components/topbar/topBar.component'
import { Store } from '@ngrx/store'
import { authActions } from './auth/store/actions'
import { FooterComponent } from './shared/components/footer/footer.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterOutlet, TopbarComponent, FooterComponent],
})
export class AppComponent {
  constructor(private store:Store){}

  ngOnInit(){
    this.store.dispatch(authActions.getcurrentuser())
  }
  //testing123@email.com, test
}
