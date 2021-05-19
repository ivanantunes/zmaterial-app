import { ReportService } from './report.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-report-builder',
  templateUrl: './report-builder.component.html',
  styleUrls: ['./report-builder.component.scss']
})
export class ReportBuilderComponent implements OnInit {

  public screen: string;

  constructor(
    private route: ActivatedRoute,
    public reportBuilder: ReportService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.screen = params.get('screen');
      this.reportBuilder.notifyScreenChange(this.screen);
    });
  }

}
