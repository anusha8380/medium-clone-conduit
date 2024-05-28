import {CommonModule} from '@angular/common'
import {Component, OnInit} from '@angular/core'
import {RouterLink} from '@angular/router'
import {Store} from '@ngrx/store'
import {combineLatest} from 'rxjs'
import {popularTagsActions} from './store/actions'
import {
  selectError,
  selectIsLoading,
  selectPopularTagsData,
} from './store/reducer'
import { PopularTagService } from './services/popularTag.service'
 
@Component({
  selector: 'mc-popular-tags',
  templateUrl: './popularTags.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class PopularTagsComponent implements OnInit {
  data$ = combineLatest({
    popularTags: this.store.select(selectPopularTagsData),
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
  })
  constructor(private store: Store) {}
 
  ngOnInit(): void {
    this.store.dispatch(popularTagsActions.getPopularTags())
  }
}