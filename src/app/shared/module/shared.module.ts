import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LanguageSelectorComponent } from "../components/language-selector/language-selector.component";
import { LanguageSelectorModalComponent } from "../components/language-selector/language-selector-modal/language-selector-modal.component";
import { IonicModule } from "@ionic/angular";

@NgModule({
    declarations: [
        LanguageSelectorComponent,
        LanguageSelectorModalComponent
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        LanguageSelectorComponent,
        LanguageSelectorModalComponent
    ]
})

export class SharedModule { }