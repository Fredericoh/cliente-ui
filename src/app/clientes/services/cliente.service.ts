import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, tap } from 'rxjs';

import { Cliente } from './../model/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly baseUrl = 'http://localhost:8080/clientes'

  constructor(
    private httpClient: HttpClient
  ) { }

  listar() {
    return this.httpClient.get<Cliente[]>(this.baseUrl)
    .pipe(
      first(),
      delay(1000),
      tap(c => console.log(c))
    );
  }
}
