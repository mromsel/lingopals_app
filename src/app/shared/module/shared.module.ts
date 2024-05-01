import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LanguageSelectorComponent } from "../components/language-selector/language-selector.component";
import { LanguageSelectorModalComponent } from "../components/language-selector/language-selector-modal/language-selector-modal.component";
import { IonicModule } from "@ionic/angular";
import { SpinnerComponent } from "../components/spinner/spinner.component";
import { BackButtonComponent } from "../components/back-button/back-button.component";
import { SingleLanguageSelectorComponent } from "../components/single-language-selector/single-language-selector.component";
import { ModalSingleLanguageSelectorComponent } from "../components/single-language-selector/modal-single-language-selector/modal-single-language-selector.component";

@NgModule({
    declarations: [
        LanguageSelectorComponent,
        LanguageSelectorModalComponent,
        SpinnerComponent,
        BackButtonComponent,
        SingleLanguageSelectorComponent,
        ModalSingleLanguageSelectorComponent,
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        LanguageSelectorComponent,
        LanguageSelectorModalComponent,
        SpinnerComponent,
        BackButtonComponent,
        SingleLanguageSelectorComponent,
        ModalSingleLanguageSelectorComponent,
    ]
})

export class SharedModule { }