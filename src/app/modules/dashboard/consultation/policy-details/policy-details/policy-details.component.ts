import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';

@Component({
  selector: 'app-policy-details',
  templateUrl: './policy-details.component.html',
  styleUrls: ['./policy-details.component.scss']
})
export class PolicyDetailsComponent implements OnInit {

  form = this.fb.group({
    policyId: ['']
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  searchPolicy() {}

}
