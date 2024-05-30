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
import { DynamicMaterialTableComponent } from "../components/dynamic-material-table/dynamic-material-table.component";
import { MatTableModule } from "@angular/material/table";
import { ModalUserLanguagesCreateComponent } from "../components/modal-user-languages-create/modal-user-languages-create.component";
import { LanguageDisplayComponent } from "../components/language-display/language-display.component";

@NgModule({
    declarations: [
        LanguageSelectorComponent,
        ModalLanguageSelectorComponent,
        SpinnerComponent,
        BackButtonComponent,
        SingleLanguageSelectorComponent,
        ModalSingleLanguageSelectorComponent,
        DynamicMaterialTableComponent,
        ModalUserLanguagesCreateComponent,
        LanguageDisplayComponent,
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
        MatTableModule,
    ],
    exports: [
        LanguageSelectorComponent,
        ModalLanguageSelectorComponent,
        SpinnerComponent,
        BackButtonComponent,
        SingleLanguageSelectorComponent,
        ModalSingleLanguageSelectorComponent,
        DynamicMaterialTableComponent,
        ModalUserLanguagesCreateComponent,
        LanguageDisplayComponent,
    ]
})

export class SharedModule { }