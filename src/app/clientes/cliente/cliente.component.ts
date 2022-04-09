import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

import { ErrorDialogComponent } from './../../shared/components/error-dialog/error-dialog.component';
import { Cliente } from './../model/cliente';
import { ClienteService } from './../services/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})
export class ClienteComponent implements OnInit {
  clientes$: Observable<Cliente[]>;
  displayedColumns = ['id', 'nome'];

  constructor(
    private clienteService: ClienteService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.clientes$ = this.clienteService.listar().pipe(
      catchError((error) => {
        this.onError("Erro ao carregar a lista de clientes!")

        return of([]);
      })
    );

  }

  ngOnInit(): void {}

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  private onNovoCliente() {
    this.router.navigateByUrl('/clientes/novo');
  }
}
