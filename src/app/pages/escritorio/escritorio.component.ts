import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Ticket } from '../../classes/ticket';

import swal from 'sweetalert2';
import { WebrestService } from '../../services/webrest.service';

@Component({
  selector: 'app-escritorio',
  templateUrl: './escritorio.component.html',
  styleUrls: ['./escritorio.component.css']
})

export class EscritorioComponent implements OnInit, OnDestroy {

  
  private observ$: Subscription = null;
  private observ2$: Subscription = null;
  private subscriptionParams: Subscription = null;
  private unsubscribe = new Subject();
  ticket: Ticket | null;

  numeroEscritorio: number;
  atendido = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private webrestService: WebrestService
  ) { }

  ngOnInit(): void {
    this.suscripcionGestionParams();
    this.solicitarSiguienteTicket();
  }

  suscripcionGestionParams(): void {
    this.subscriptionParams = this.activatedRoute.params
      .pipe(
        takeUntil(this.unsubscribe)
      )
      .subscribe(params => this.gestionParams(params));
  }

  gestionParams(params: any): void {
    this.numeroEscritorio = params.id as number; // o +params.get('tipo');
  }

  solicitarSiguienteTicket(): void {
    this.ticket = null;
    this.atendido = false;

    this.observ$ = this.webrestService.solicitarTikect().pipe(
      takeUntil(this.unsubscribe)
    )
      .subscribe(
        ticket => {
         // swal.fire('Nuevo ticket creado', `${json}`, 'success');
         console.log(ticket);
         this.ticket = ticket;
        }
        , err => {
            swal.fire('Error al capturar ticket', `err = ${JSON.stringify(err.message)}`, 'error');
        }
      );
  }

  public atenderTicket(): void {
      this.ticket.escritorio = this.numeroEscritorio;
      this.observ2$ = this.webrestService.atenderTicket(this.ticket).pipe(
      takeUntil(this.unsubscribe)
    )
      .subscribe(
        ticket => {
         // swal.fire('Nuevo ticket creado', `${json}`, 'success');
         console.log(ticket);
         this.ticket = ticket;
         this.atendido = true;
        }
        , err => {
            swal.fire('Error al atender ticket', `err = ${JSON.stringify(err.message)}`, 'error');
        }
      );

  }

  ngOnDestroy(): void {
    console.log('realizando unsubscribes');
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
  


}