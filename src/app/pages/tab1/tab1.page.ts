import { Component } from '@angular/core';
import { Accion } from '../../models/Accion';
import { ModalController } from '@ionic/angular';
import { AgregarPage } from '../agregar/agregar.page';
import { AccionesService } from '../../services/acciones.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  arrAcciones:Accion[]=[];

  sliderOpts={
    allowSlidePrev:false,
    allowSlideNext:false
  }


  constructor(
    public accionesService:AccionesService,
    private modalCtrl: ModalController) {

      this.arrAcciones=accionesService.updateElapsedTimeAcciones();
     }

  async abrirModal() {
    const modal =await this.modalCtrl.create({
      component: AgregarPage,
      componentProps: {

      }
    });
    modal.onDidDismiss().then(()=>this.arrAcciones=this.accionesService.updateElapsedTimeAcciones());
    await modal.present();
  }

  editarFecha(accion:Accion){
    this.accionesService.editarFecha(accion);
    this.arrAcciones=this.accionesService.updateElapsedTimeAcciones();
  }

  eliminarAccion(id:number){
    this.accionesService.borrarAccion(id);
    this.arrAcciones=this.accionesService.updateElapsedTimeAcciones();
  }

  doRefresh(event){
    setTimeout(() => {
      this.arrAcciones=this.accionesService.updateElapsedTimeAcciones();
      event.target.complete();
    }, 500);
  }


}
