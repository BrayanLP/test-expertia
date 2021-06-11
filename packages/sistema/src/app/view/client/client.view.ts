import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { SimpleModalComponent } from "ngx-simple-modal";
import { NgxSmartModalService } from 'ngx-smart-modal';
import { FormGroup, NgForm, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-client',
  templateUrl: './client.view.html',
  styleUrls: ['./client.view.scss']
})
export class ClientView implements OnInit {
  

  loading:any =  false;
  formulario:any =  FormGroup;
  editFormulario:any =  FormGroup;
  result:any;
  errors = [];  
  id: any;
  constructor(private fb: FormBuilder, private client: ClientService, public ngxSmartModalService: NgxSmartModalService) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      NombreCliente: [
        '',
        [Validators.required]
      ],
      CorreoElectronico: [
        ,
        [Validators.required]
      ],
      MontoMaximoMorosidad: ['', [Validators.required]]
    });
    this.editFormulario = this.fb.group({
      NombreCliente: [
        '1111',
        [Validators.required]
      ],
      CorreoElectronico: [
        ,
        [Validators.required]
      ],
      MontoMaximoMorosidad: ['', [Validators.required]]
    });
    this.get();
  }
  get(){
    this.client.get().subscribe({
      next: (data: any) => {
        console.log(data); 
        this.result = data.Resultado
      },
      error: (error) => {
        // this.errorMessage = error.message;
        console.error('Ocurrio un error! ==>', error);
      },
    });
  }
  edit(res:any){
    this.client.detail(res._id).subscribe({
      next: (data: any) => {
        console.log(data);
        const obj = {
          'NombreCliente': data.NombreCliente,
          'CorreoElectronico': data.CorreoElectronico,
          'MontoMaximoMorosidad': data.MontoMaximoMorosidad
        }  
        this.id = data._id;
        this.ngxSmartModalService.getModal('editarModal').open();
        this.editFormulario.setValue(obj)
      },
      error: (error) => { 
        console.error('Ocurrio un error! ==>', error);
      },
    });
  }
  
  eliminar(id:any){
    this.client.eliminar(id).subscribe({
      next: (data: any) => {
        window.location.reload(true)
      },
      error: (error) => { 
        console.error('Ocurrio un error! ==>', error);
      },
    });
  }

  onFormSubmit(): void {
    this.loading = true;
    if (!this.validateForm()) {
      this.loading = false;
    } else {
        const obj = this.formulario.value;
        obj.IdCliente = Math.random() + Math.random() * 39
        console.log(obj)
        this.client.create(obj).subscribe(
          res => {
            console.log(res);
            window.location.reload(true)
          },
          error => {
            console.log(error);
          }
          ); 
          setTimeout(() => {
            this.loading = false;
            window.location.reload(true)
      }, 500);
    }
  }
  onEditFormSubmit(): void {
    this.loading = true;
    if (!this.validateEditForm()) {
      this.loading = false;
    } else {
        const obj = this.editFormulario.value;
        obj.IdCliente = Math.random() + Math.random() * 39
        console.log(obj)
        this.client.edit(this.id, obj).subscribe(
          res => {
            console.log(res);
            window.location.reload(true)
          },
          error => {
            console.log(error);
          }
          ); 
          setTimeout(() => {
            this.loading = false;
            window.location.reload(true)
      }, 500);
    }
  }

  // VALIDAR SI FROMULARIO ES VALIDO Y MARCAR ERRORES
  validateForm() {
    if (!this.formulario.valid) {
      for (const key in this.formulario.controls) {
        if (this.formulario.controls[key].invalid) {
          this.formulario.controls[key].markAsPending();
        }
      }
      return false;
    } else {
      return true;
    }
  }
  validateEditForm() {
    if (!this.editFormulario.valid) {
      for (const key in this.editFormulario.controls) {
        if (this.editFormulario.controls[key].invalid) {
          this.editFormulario.controls[key].markAsPending();
        }
      }
      return false;
    } else {
      return true;
    }
  }
  // VALIDAR QUE EL INPUT SEA VALIDO
  validInput(input:any) {
    return this.formulario.get(input).invalid && this.formulario.get(input).dirty
      ? true
      : false;
  }

  // VALIDAR QUE EL FORMULARIO ESTE COMPLETO
  validButtomForm() {
    return this.formulario.invalid ? true : false;
  }

  // OBTENER MENSAJES DE ERROR
  // getError(field) {
  //   const item = this.formulario.get(field);
  //   if ((item.invalid && !item.pristine) || item.pending) {
  //     if (item.errors.required) {
  //       return this.errors[field].required;
  //     } else {
  //       return this.errors[field].pattern;
  //     }
  //   } else {
  //     return false;
  //   }
  // }

}
 
