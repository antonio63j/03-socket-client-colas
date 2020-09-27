import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WebrestService } from 'src/app/services/webrest.service';
import { Ticket } from '../../classes/ticket';
import { WebsocketService } from 'src/app/services/websocket.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-publico',
  templateUrl: './publico.component.html',
  styleUrls: ['./publico.component.css']
})

export class PublicoComponent implements OnInit, OnDestroy {

  public listAtendidos: Ticket[] = [];
  public listAtendidos3: Ticket[] = [];

  private observ$: Subscription = null;
  private suscripcionUltimosMarcadores: Subscription;
  private unsubscribe = new Subject();

  private audio = new Audio();

  constructor(
    private webrestService: WebrestService,
    private websocketService: WebsocketService
  ) {

  }

  ngOnInit(): void {
    this.audio.src = '../../assets/new-ticket.mp3';
    this.audio.load();

    this.solicitaUltimosAtendidos();
    this.escuchaUltimosAtendios();
  }

  escuchaUltimosAtendios(): void {
    // escuchar socket difusion de ultimos atendidos
    this.suscripcionUltimosMarcadores = this.websocketService.listen('ultimos-atendidos').pipe(
      takeUntil(this.unsubscribe)
    )
      .subscribe((ultimos: Ticket[]) => {
        this.listAtendidos = ultimos;
        this.prepararAtendidos();
      });
  }

  solicitaUltimosAtendidos(): void {
    // REST solicitud de carga
    this.observ$ = this.webrestService.ticketsAtendidos().pipe(
      takeUntil(this.unsubscribe)
    )
      .subscribe((tickets: Ticket[]) => {
        this.listAtendidos = tickets;
        this.prepararAtendidos();
      }
        , err => {
          swal.fire('Error al capturar atendisos', `err = ${JSON.stringify(err.message)}`, 'error');
        }
      );
  }

  prepararAtendidos(): void {
    this.listAtendidos3 = [];

    for (let i = 0; i < 3 && i < (this.listAtendidos.length - 1); i = i + 1) {
      this.listAtendidos3[i] = this.listAtendidos[i + 1];
    }
    console.log('listAtendidos:');
    console.log(this.listAtendidos);
    console.log('atendidos3');
    console.log(this.listAtendidos3);
    this.audio.play();
  }

  ngOnDestroy(): void {
    console.log('realizando unsubscribes');
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
