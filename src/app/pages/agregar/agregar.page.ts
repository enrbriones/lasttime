import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Accion } from '../../models/Accion';
import { AccionesService } from '../../services/acciones.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {


  tituloAccion: String = '';
  fechaCreacion: String = new Date().toISOString();
  lapso: String = 'dia';
  valorLapso: number;



  formulario: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private alert: AlertController,
    private service: AccionesService) { }

  ngOnInit() {

    this.formulario = new FormGroup({
      'titulo': new FormControl(this.tituloAccion,[Validators.required]),
      'fecha': new FormControl(this.fechaCreacion),
      'lapso': new FormControl(this.lapso),
      'lapsovalue': new FormControl(this.valorLapso,[Validators.required, Validators.pattern(/^[1-9]\d*$/)])
    })

  }

  prevalidarFormulario(){
    console.log(this.formulario);
    this.formulario.get('titulo').markAsTouched({onlySelf:true});
    this.formulario.get('lapsovalue').markAsTouched({onlySelf:true});

    if(this.formulario.valid){
      this.agregarAccion();
    }else{
      return;
    }
  }


  agregarAccion() {
    let newAccion: Accion = {
      titulo: this.formulario.get('titulo').value,
      ultimaMsg: '',
      fecha: new Date(this.fechaCreacion.toString()),
      lapso: this.lapso,
      lapsoValor: this.formulario.get('lapsovalue').value,
      next: this.service.getNextFrecuencyTime(new Date(this.fechaCreacion.toString()), this.valorLapso, this.lapso),
      icono: 'sdjfsdf',
      color: 'success',
      id: new Date().getTime()
    }
    // console.log('fecha seteada:', newAccion.fecha);
    // console.log('fecha next:', newAccion.next);
    this.service.crearAccion(newAccion);
    this.cerrarModal();
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }

  cancelar() {
    this.cerrarModal();
  }

  comprobarChecked(value: String) {
    return value === this.lapso;
  }


  async presentAlertRadio() {
    const alert = await this.alert.create({
      header: 'Debo hacerlo cada...',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'Día',
          value: 'dia',
          checked: this.comprobarChecked('dia')
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Semana',
          value: 'semana',
          checked: this.comprobarChecked('semana')
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'Mes',
          value: 'mes',
          checked: this.comprobarChecked('mes')
        },
        {
          name: 'radio4',
          type: 'radio',
          label: 'Año',
          value: 'año',
          checked: this.comprobarChecked('año')
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Aceptar',
          handler: (data) => {
            console.log('Confirm Ok');
            console.log(data);
            this.lapso = data;

          }
        }
      ]
    });

    await alert.present();
  }



}
