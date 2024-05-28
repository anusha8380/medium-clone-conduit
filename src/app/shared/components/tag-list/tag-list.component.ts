import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
    selector:'mc-tag-list',
    standalone:true,
    imports:[CommonModule],
    templateUrl:'./tag-list.component.html'
})
export class TagListComponent{
 @Input() tags : string[] = [];
}