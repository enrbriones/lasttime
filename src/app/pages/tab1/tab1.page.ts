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

  aerrAcciones:Accion[]=[];


  constructor(
    public accionesService:AccionesService,
    private modalCtrl: ModalController) {

      this.aerrAcciones=accionesService.updateElapsedTimeAcciones();
     }

  async abrirModal() {
    const modal =await this.modalCtrl.create({
      component: AgregarPage,
      componentProps: {

      }
    });
    modal.onDidDismiss().then(()=>this.aerrAcciones=this.accionesService.updateElapsedTimeAcciones());
    await modal.present();
  }

  editarFecha(accion:Accion){
    this.accionesService.editarFecha(accion);
    this.aerrAcciones=this.accionesService.updateElapsedTimeAcciones();
  }

  eliminarAccion(id:number){
    this.accionesService.borrarAccion(id);
    this.aerrAcciones=this.accionesService.updateElapsedTimeAcciones();
  }


}
