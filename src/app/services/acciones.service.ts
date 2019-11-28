import { Injectable } from '@angular/core';
import { Accion } from '../models/Accion';
import * as moment from 'moment';
import 'moment-precise-range-plugin';


@Injectable({
  providedIn: 'root'
})
export class AccionesService {

  acciones: Accion[] = [];

  constructor() {
    this.cargarStorage();
    // console.log('acciones', this.acciones);
  }

  //Actualiza todas las acciones. El tiempo transcurrido y el color.
  updateElapsedTimeAcciones() {
    this.acciones.forEach(x => x.ultimaMsg = this.elapsedTime(new Date(x.fecha)));
    this.acciones.forEach(x => x.color = this.setColor(this.porcentajeNext(new Date(x.fecha), new Date(x.next))));
    return this.acciones;
  }

  crearAccion(accion: Accion) {
    this.acciones.push(accion);
    this.guardarStorage();
  }

  editarFecha(accion: Accion) {
    let accionEditar = this.acciones.find(x => x.id === accion.id);
    accionEditar.fecha = accion.fecha;
    accionEditar.next = accion.next;
    this.guardarStorage();
  }

  borrarAccion(id: number) {
    console.log(`acción borrada: ${id}`);
    this.acciones = this.acciones.filter(x => x.id !== id);
    this.guardarStorage();
  }

  guardarStorage() {
    localStorage.setItem('data', JSON.stringify(this.acciones));
  }

  cargarStorage() {
    if (localStorage.getItem('data'))
      this.acciones = JSON.parse(localStorage.getItem('data'));
  }


  //:::::::::Métodos de cálculo de fechas:::::::::::::::

  //Obtiene la fecha de la siguiente próxima vez, según la frecuencia indicada en la acción.
  getNextFrecuencyTime(fecha: Date, valor: number, lapso: String) {
    let nextDate: Date = new Date(fecha);
    switch (lapso) {
      case 'dia':
        nextDate.setDate(nextDate.getDate() + valor);
        break;
      case 'semana':
        nextDate.setDate(fecha.getDate() + (valor * 7));
        break;
      case 'mes':
        nextDate.setMonth(fecha.getMonth() + valor);
        break;
      case 'año':
        nextDate.setFullYear(fecha.getFullYear() + valor);
        break;
      default:
        nextDate = fecha;
        break;
    }
    return nextDate;
  }


  //Retorna en texto plano el tiempo transcurrido entre la última vez y el momento actual.
  elapsedTime(desde: Date) {
    moment.locale('es');
    return moment(desde, "YYYYMMDD").fromNow();
    //::::Una librería de Moment.js para obtener una lapso de tiempo más preciso.:::::
    //let preciso= moment.preciseDiff(desde,new Date(),true);
    // console.log( preciso);
    //return moment.preciseDiff(desde,new Date(),true);
  };


  //Retorna el porcentaje en decimal del tiempo transcurrido entre la última vez y la supuesta próxima vez.
  porcentajeNext(ultima: Date, next: Date) {
    let start = ultima.getTime();
    let end = next.getTime();
    let now = new Date().getTime();
    let porcentaje = ((now - start) / (end - start));
    //console.log('porc entre ultima y next', porcentaje);
    return porcentaje;
  }


  //Establece el color según el porcentaje.
  setColor(value: number) {
    if (value >= 0 && value < 0.5) {
      return 'success';
    } else if (value >= 0.5 && value < 0.8) {
      return 'warning';
    } else if (value >= 0.8) {
      return 'danger';
    }
    return 'tertiary';
  }


}
