import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

export interface TutorialScreen {
  number: number
  title: string
  bodyText: string
  image: string
}

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {

  tutorialScreens: TutorialScreen[] = [
    {
      number: 0,
      title: "Welcome to the tutorial 1",
      bodyText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla egestas arcu sit amet eleifend pulvinar. Sed ut diam dolor. Vivamus vitae ultricies felis, quis egestas neque. Quisque eleifend finibus massa, quis consequat arcu convallis vitae. Mauris malesuada erat interdum ante aliquam suscipit.",
      image: "../../../../assets/resources/review-words.svg"
    },
    {
      number: 1,
      title: "Welcome to the tutorial 2",
      bodyText: "Nullam velit erat, varius molestie sodales nec, pretium fermentum lorem. Donec porta semper dui blandit interdum. Mauris quis est a sem tempor vehicula placerat non libero. Aenean mollis, massa non egestas eleifend, dolor mauris luctus tellus, in convallis risus sapien vel nunc. Donec et mi enim. Nullam commodo lectus quis elit lacinia, et feugiat risus volutpat. Duis maximus lacus a elit bibendum accumsan. Curabitur lacus nisi, volutpat nec tincidunt non, luctus et diam.",
      image: "../../../../assets/resources/next-lesson.svg"
    },
    {
      number: 2,
      title: "Welcome to the tutorial 3",
      bodyText: "Nam placerat, tellus in varius laoreet, nunc arcu mattis ipsum, a hendrerit magna ex ac lacus. Vivamus ut bibendum quam. Etiam porttitor et augue in tristique. Cras fermentum nisl eu magna porttitor, vel efficitur arcu pharetra.",
      image: "../../../../assets/resources/review-words.svg"
    },
    {
      number: 3,
      title: "Welcome to the tutorial 4",
      bodyText: "Aenean vitae magna nulla. Ut vulputate tempus suscipit. Morbi tortor felis, eleifend nec aliquet quis, aliquet ut justo. Nullam venenatis justo a magna tempus porta. Quisque dignissim libero vel sapien mattis, eget ultricies elit pellentesque. Vestibulum blandit libero sed diam luctus, id lacinia velit tincidunt.",
      image: "../../../../assets/resources/next-lesson.svg"
    },
    {
      number: 4,
      title: "Welcome to the tutorial 5",
      bodyText: "Nam volutpat vulputate venenatis. In eget mollis elit, sed malesuada felis. Praesent vulputate rhoncus turpis sit amet faucibus. Mauris blandit aliquet lectus vitae sollicitudin. Integer et auctor lorem. Vestibulum eu odio arcu. Praesent est lacus, viverra id dignissim quis, pulvinar eget ex. ",
      image: "../../../../assets/resources/review-words.svg"
    }
  ]

  currentPageIndex: number = 0

  constructor(
    private navController: NavController,
    private router: Router,
    private translate: TranslateService,) { }

  ngOnInit() {
    console.log(this.currentPageIndex);
  }

  goToPage(event: any) {
    this.currentPageIndex = event.target.value;
    console.log("Change to page " + event.target.value);

  }

  goToPreviousPage() {
    if (this.currentPageIndex > 0) {
      this.currentPageIndex--;
      console.log(this.currentPageIndex);
    }
  }

  goToNextPage() {
    if (this.currentPageIndex < this.tutorialScreens.length - 1) {
      this.currentPageIndex++;
      console.log(this.currentPageIndex);
    } else {
      console.log("Tutorial finished");
      this.closeTutorial()
    }
  }

  closeTutorial() {
    this.navController.pop()
  }

  skip() {
    this.closeTutorial()
  }
}
