import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RequestsService } from '../../../../modules/dashboard/services/requests/requests.service';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent implements OnInit {
  @Input() label: string;
  @Input() name: string;
  @Input() value?: string;
  @Input() placeholder: string;
  @Input() disabled?: boolean;
  @Input() group: FormGroup;
  @Input() fileNameWatcher: any;
  // @Input() onFileChange: any;

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onFileChange = new EventEmitter<any>();

  constructor(
    public requestService: RequestsService
  ) { }

  runOnFileChange(event): void {
    this.onFileChange.emit(event);
  }

  ngOnInit() {
  }

}
