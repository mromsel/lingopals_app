import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Word } from 'src/app/shared/interfaces/word.interface';
import { ConfigService } from 'src/app/shared/services/config.service';
import { WordsService } from 'src/app/shared/services/words.service';

@Component({
  selector: 'app-word-detail',
  templateUrl: './word-detail.component.html',
  styleUrls: ['./word-detail.component.scss'],
})
export class WordDetailComponent implements OnInit {

  word: Word | undefined;

  constructor(
    private route: ActivatedRoute,
    private wordService: WordsService,
    private configService: ConfigService,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        let idWord = params.get('id');
        if (idWord) {
          this.wordService.getWordByLanguageAndID(this.configService.preferredIsoCode, +idWord).subscribe(word => {
            this.word = word
          })
        }
      }
    )
  }
}