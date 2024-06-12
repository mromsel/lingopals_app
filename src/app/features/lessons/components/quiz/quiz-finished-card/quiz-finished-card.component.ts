import { Component, Input, OnInit } from '@angular/core';
import { UserActivity } from 'src/app/shared/interfaces/user-related/user-activity.interface';
import { WordsInQuiz } from '../../../interfaces/words-in-quiz.interface';
import { UserLevelUpdate } from '../../../interfaces/user-level-update.interface';
import { XPLevel } from 'src/app/shared/interfaces/masters/xp-level.interface';

@Component({
  selector: 'app-quiz-finished-card',
  templateUrl: './quiz-finished-card.component.html',
  styleUrls: ['./quiz-finished-card.component.scss'],
})
export class QuizFinishedCardComponent implements OnInit {

  @Input() listWords: WordsInQuiz[] | undefined;
  @Input() userActivityResult: UserActivity | undefined;
  @Input() userLevelUpdate: UserLevelUpdate | undefined;

  progressValue: number = 0
  currentLevel: XPLevel | undefined;

  readonly progressStep: number = 0.2
  readonly intervalStep: number = 100
  readonly levelUpSleep: number = 2000

  constructor() { }

  ngOnInit() {
    if (this.userLevelUpdate) {
      this.currentLevel = this.userLevelUpdate?.initialLevel
      const initialXP = this.userLevelUpdate.initialXpPoints;
      const finalXP = this.userLevelUpdate.finalXpPoints;
      const isLevelUp = this.userLevelUpdate.isLevelUp;
      const initialLevel: XPLevel = this.userLevelUpdate.initialLevel;

      let initialProgress = this.calculateProgressPercent(initialXP, initialLevel);
      this.progressValue = initialProgress;

      // Check if it's a level up
      if (isLevelUp) {
        let finalProgress = 1;
        this.displayProgress(initialProgress, finalProgress);
        this.showLevelUp()

      } else {
        let finalProgress = this.calculateProgressPercent(finalXP, initialLevel);
        this.displayProgress(initialProgress, finalProgress);
      }
    }
  }

  displayProgress(initialProgress: number, finalProgress: number) {
    this.progressValue = initialProgress
    const interval = setInterval(() => {
      this.progressValue += this.progressStep;

      if (this.progressValue >= finalProgress) {
        clearInterval(interval); // Stop the interval
      }
    }, this.intervalStep);
  }

  async showLevelUp() {
    if (this.userLevelUpdate?.newLevel) {
      await new Promise(f => setTimeout(f, this.levelUpSleep));
      this.currentLevel = this.userLevelUpdate.newLevel ? this.userLevelUpdate.newLevel : this.userLevelUpdate.initialLevel;
      let finalProgress = this.calculateProgressPercent(this.userLevelUpdate.finalXpPoints, this.userLevelUpdate.newLevel)
      this.displayProgress(0, finalProgress)
    }
  }

  calculateProgressPercent(xpPoints: number, xpLevel: XPLevel) {
    return (xpPoints - xpLevel.xpRangeStart) / (xpLevel.xpRangeEnd - xpLevel.xpRangeStart);
  }
}
