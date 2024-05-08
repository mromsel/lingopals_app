import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LanguageSelectorComponent } from "../components/language-selector/language-selector.component";
import { IonicModule } from "@ionic/angular";
import { SpinnerComponent } from "../components/spinner/spinner.component";
import { BackButtonComponent } from "../components/back-button/back-button.component";
import { SingleLanguageSelectorComponent } from "../components/single-language-selector/single-language-selector.component";
import { ModalSingleLanguageSelectorComponent } from "../components/single-language-selector/modal-single-language-selector/modal-single-language-selector.component";
import { HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { createTranslateLoader } from "src/main";
import { ModalLanguageSelectorComponent } from "../components/language-selector/language-selector-modal/modal-language-selector.component";

@NgModule({
    declarations: [
        LanguageSelectorComponent,
        ModalLanguageSelectorComponent,
        SpinnerComponent,
        BackButtonComponent,
        SingleLanguageSelectorComponent,
        ModalSingleLanguageSelectorComponent,
    ],
    imports: [
        CommonModule,
        IonicModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
    ],
    exports: [
        LanguageSelectorComponent,
        ModalLanguageSelectorComponent,
        SpinnerComponent,
        BackButtonComponent,
        SingleLanguageSelectorComponent,
        ModalSingleLanguageSelectorComponent,
    ]
})

export class SharedModule { }