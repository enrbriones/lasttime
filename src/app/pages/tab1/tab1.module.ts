import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ComponentsModule } from '../../components/components.module';
import { AgregarPage } from '../agregar/agregar.page';
import { AgregarPageModule } from '../agregar/agregar.module';

@NgModule({
  entryComponents: [
    AgregarPage
  ],
  imports: [
    ComponentsModule,
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }]),
    AgregarPageModule
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule { }
