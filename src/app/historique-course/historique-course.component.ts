import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { Historique } from '../models/historique';

@Component({
  selector: 'app-historique-course',
  templateUrl: './historique-course.component.html',
  styleUrls: ['./historique-course.component.scss']
})
export class HistoriqueCourseComponent implements OnInit {
  hists: Historique[];

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    
  }
}
