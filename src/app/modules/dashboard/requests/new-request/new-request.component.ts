import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.scss']
})
export class NewRequestComponent implements OnInit {
  selectedRequestType: string;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() { }

  selectChange(event) {
    switch (event) {
      case 'vida':
        this.router.navigate(['vida'], { relativeTo: this.route });
        break;

      case 'disability':
        this.router.navigate(['disability'], { relativeTo: this.route });
        break;

      case 'gastos mayores':
        this.router.navigate(['salud'], { relativeTo: this.route });
        break;

      default:
        break;
    }
  }
}
