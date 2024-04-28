import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LanguageSelectorComponent } from "../components/language-selector/language-selector.component";
import { LanguageSelectorModalComponent } from "../components/language-selector/language-selector-modal/language-selector-modal.component";
import { IonicModule } from "@ionic/angular";
import { SpinnerComponent } from "../components/spinner/spinner.component";

@NgModule({
    declarations: [
        LanguageSelectorComponent,
        LanguageSelectorModalComponent,
        SpinnerComponent
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        LanguageSelectorComponent,
        LanguageSelectorModalComponent,
        SpinnerComponent
    ]
})

export class SharedModule { }