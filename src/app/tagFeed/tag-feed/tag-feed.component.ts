import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BannerComponent } from 'src/app/shared/components/banner/banner.component';
import { FeedTogglerComponent } from 'src/app/shared/components/feed-toggler/feed-toggler.component';
import { FeedComponent } from 'src/app/shared/components/feed/feed.component';
import { PopularTagsComponent } from 'src/app/shared/components/popularTags/popularTags.component';

@Component({
  selector: 'app-tag-feed',
  templateUrl: './tag-feed.component.html',
  styleUrls: ['./tag-feed.component.css'],
  standalone:true,
  imports:[FeedComponent, BannerComponent, PopularTagsComponent, FeedTogglerComponent]
})
export class TagFeedComponent {
  apiUrl:string = ''
  tagName:string=''

  constructor(private route:ActivatedRoute){}

  ngOnInit(){
    this.route.params.subscribe((params:Params)=>{
      this.tagName= params['slug']
      this.apiUrl= `/articles/?tag=${this.tagName}`
    })
  }
}
