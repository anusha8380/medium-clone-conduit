import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { CommentFormValuesInterface } from "../types/commentFormValues.interface";
import { Store } from "@ngrx/store";
import { selectArticleData, selectComments } from "../../article/store/reducer";
import { CommonModule } from "@angular/common";
import { selectCurrentUser } from "src/app/auth/store/reducers";
import { combineLatest } from "rxjs";

@Component({
    selector: 'mc-comment',
    templateUrl: './commentForm.component.html',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    styleUrls: ['./commentForm.component.css']
})

export class CommentFormComponent {
    @Input() slug: string | undefined;
    @Output() commentSubmit = new EventEmitter<CommentFormValuesInterface>()

    constructor(private fb: FormBuilder, private store: Store) { }

    form = this.fb.nonNullable.group({
        body: ''
    })

    data$ = combineLatest({
        article: this.store.select(selectArticleData),
        comments: this.store.select(selectComments)
    })

    onSubmit(slug: string|undefined): void {
        const formValue = this.form.getRawValue();
        const commentFormValues: CommentFormValuesInterface = {
            ...formValue,
            slug
        }
        this.commentSubmit.emit(commentFormValues)
    }
}