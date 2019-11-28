import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import {Accion} from '../../models/Accion';
import { AccionesService } from '../../services/acciones.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-accion',
  templateUrl: './accion.component.html',
  styleUrls: ['./accion.component.scss'],
})
export class AccionComponent implements OnInit {

  @Input() accion:Accion;
  @Output() accionSeleccionada:EventEmitter<number>;
  @Output() accionEditar:EventEmitter<Accion>;

  @ViewChild('datePicker',{static: false}) datePicker:any;

  fechaCreacion: String = new Date().toISOString();
  //fechaCreacion:String;

  
  constructor(public accionesService:AccionesService,
    public alertCtrl:AlertController
    ) {
    this.accionSeleccionada= new EventEmitter();
    this.accionEditar= new EventEmitter();

  }
  
  ngOnInit() {
   this.fechaCreacion=this.accion.fecha.toString();
  }

  async alertaEliminar() {
    const alert = await this.alertCtrl.create({
      
      message: 'Está seguro que desea eliminar esta acción?',
      buttons: [
        'Cancelar', {
          text: 'Eliminar',
          handler: () => {
            this.eliminarAccion();
          }
        }
      ]
    });

    await alert.present();
  }


  abrirFecha(){
    this.datePicker.open();
  }

  cambiarFecha(event){
    this.cambiaFechayNext(new Date(event.detail.value));
  }

  editarFecha(){
    this.cambiaFechayNext(new Date());
  }

  cambiaFechayNext(fecha:Date){
    this.accion.fecha=new Date(fecha);
    this.accion.next= this.accionesService.getNextFrecuencyTime(this.accion.fecha,this.accion.lapsoValor,this.accion.lapso);
    this.fechaCreacion=this.accion.fecha.toISOString();
    this.accionEditar.emit(this.accion);
  }


  eliminarAccion(){
    this.accionSeleccionada.emit(this.accion.id);
  }

  fechaActual(){
    return new Date().toISOString();
  }


}
