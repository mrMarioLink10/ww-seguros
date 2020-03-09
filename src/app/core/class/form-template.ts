import { TemplateRef, ContentChildren } from '@angular/core';

export class MySelect{
    @ContentChildren('formTemplate', {read: true}) formTemplateRef: TemplateRef<any>;
}