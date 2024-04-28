import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LanguageSelectorComponent } from "../components/language-selector/language-selector.component";
import { LanguageSelectorModalComponent } from "../components/language-selector/language-selector-modal/language-selector-modal.component";
import { IonicModule } from "@ionic/angular";
import { SpinnerComponent } from "../components/spinner/spinner.component";
import { BackButtonComponent } from "../components/back-button/back-button.component";

@NgModule({
    declarations: [
        LanguageSelectorComponent,
        LanguageSelectorModalComponent,
        SpinnerComponent,
        BackButtonComponent,
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
    ]
})

export class SharedModule { }