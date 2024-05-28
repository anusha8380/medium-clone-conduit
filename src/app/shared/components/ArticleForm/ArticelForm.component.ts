import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ArticleFormValues } from "./ArticleFormValues.interface";
import { BackendErrorInterface } from "src/app/auth/types/backend.errors.interface";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'mc-article-form',
    templateUrl: './ArticleForm.component.html',
    standalone: true,
    imports:[CommonModule, ReactiveFormsModule]
})

export class ArticleFormComponent {
    @Input() initialValues?: ArticleFormValues
    @Input() isSubmitting: boolean = false
    @Input() errors: BackendErrorInterface | null = null
    @Input() isEditing:boolean = false

    @Output() articleSubmit = new EventEmitter<ArticleFormValues>()

    constructor(private fb: FormBuilder) { }

    form = this.fb.nonNullable.group({
        title: '',
        description: '',
        body: '',
        tagList: ''
    })
    ngOnInit() {
        this.initializeForm();
    }

    initializeForm(): void {
        if (!this.initialValues) {
            throw new Error('Inputs are not provided')
        }
        this.form.patchValue({
            title: this.initialValues.title,
            description: this.initialValues.description,
            body: this.initialValues.body,
            tagList: this.initialValues.tagList.join(' ')
        })
    }

    onSubmit(): void {
        const formValue = this.form.getRawValue();
        const articleFormValues: ArticleFormValues = {
            ...formValue,
            tagList: formValue.tagList.split(' ')
        }
        this.articleSubmit.emit(articleFormValues)
    }
}