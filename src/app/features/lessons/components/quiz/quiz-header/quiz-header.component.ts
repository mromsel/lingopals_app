import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz-header',
  templateUrl: './quiz-header.component.html',
  styleUrls: ['./quiz-header.component.scss'],
})
export class QuizHeaderComponent implements OnInit {

  @Input() headerTitle: string = "";

  @Input() showProgressBar: boolean = false

  @Input() progress: number = 0

  constructor() { }

  ngOnInit() { }

}
