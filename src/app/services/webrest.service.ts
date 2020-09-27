
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpRequest, HttpEvent, HttpParams } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Ticket } from '../classes/ticket';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebrestService {

  constructor(
    private http: HttpClient
  ) { }

  createTikect(ticket: Ticket): Observable<any> {
     return this.http.post<Ticket>(environment.urlRest + '/ticket', ticket).pipe(
          catchError(err => {
            console.log(`error capturado en create: ${JSON.stringify(err)} `);
            return throwError (err);
          })
      );
  }

  solicitarTikect(): Observable<any> {
    return this.http.get<Ticket>(environment.urlRest + '/ticket').pipe(
         catchError(err => {
           console.log(`error en captura de ticket: ${JSON.stringify(err)} `);
           return throwError (err);
         })
     );
 }

 atenderTicket(ticket: Ticket): Observable<any> {
  return this.http.post<Ticket>(environment.urlRest + '/atendidos', ticket).pipe(
       catchError(err => {
         console.log(`error atendiendo ticket: ${JSON.stringify(err)} `);
         return throwError (err);
       })
   );
}

ticketsAtendidos(): Observable<any> {
  return this.http.get<Ticket []>(environment.urlRest + '/atendidos').pipe(
    catchError(err => {
      console.log(`error al leer ultimos tickets atendidos: ${JSON.stringify(err)} `);
      return throwError (err);
    })
);
}

  // sacarTicket(): Observable<any> {
  //   return this.http.get<Ticket>(environment.urlRest + '/ticket', { params: parametros }).pipe(
  //     tap((response: any) => {
  //       //  (response.content as Cliente[]).forEach (cliente => console.log(cliente));
  //     }),
  //     map((response: any) => {
  //       (response.content as Cliente[]).map(cliente => {
  //         cliente.empresa = cliente.empresa.toUpperCase();
  //         cliente.cliente = cliente.cliente.toUpperCase();
  //         return cliente;
  //       });
  //       return response;
  //     }),
  //     tap((response: any) => {
  //       /*           (response.content as Cliente[]).forEach (cliente => console.log(cliente)); */
  //     })
  //   );
  // }


  // getClientes(page: number): Observable<any> {
  //   const parametros = new HttpParams()
  //   .set('page', page.toString())
  //   .set('size', '12');

  //   return this.http.get<Cliente[]>(environment.urlEndPoint + '/api/clientes/page', { params: parametros }).pipe(
  //     tap((response: any) => {
  //       //  (response.content as Cliente[]).forEach (cliente => console.log(cliente));
  //     }),
  //     map((response: any) => {
  //       (response.content as Cliente[]).map(cliente => {
  //         cliente.empresa = cliente.empresa.toUpperCase();
  //         cliente.cliente = cliente.cliente.toUpperCase();
  //         return cliente;
  //       });
  //       return response;
  //     }),
  //     tap((response: any) => {
  //       /*           (response.content as Cliente[]).forEach (cliente => console.log(cliente)); */
  //     })
  //   );
  // }




  // update(cliente: Cliente): Observable<any> {
  //   return this.http.put(environment.urlEndPoint + '/api/cliente/update', cliente).pipe(
  //     catchError(err => {
  //       console.log(`error al actualizar datos del cliente: ${err.message} `);
  //       return throwError(err);
  //     })
  //     // , map((response: any) => response.cliente as Cliente)
  //   );
  // }

  // delete(id: number): Observable<Cliente> {
  //   return this.http.delete<Cliente>(`${environment.urlEndPoint}/api/cliente/${id}`).pipe(
  //     catchError(err => {
  //       console.error(`error al eliminar cliente: ${err.status} `);
  //       console.error(`error al eliminar cliente: ${err.message} `);
  //       return throwError(err);
  //     }));
  // }
}
