import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WebrestService } from '../../services/webrest.service';
import { Ticket } from '../../classes/ticket';

import swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-ticket',
  templateUrl: './nuevo-ticket.component.html',
  styleUrls: ['./nuevo-ticket.component.css']
})
export class NuevoTicketComponent implements OnInit, OnDestroy {

  private observ$: Subscription = null;
  private unsubscribe$ = new Subject();
  private subscriptionParams$: Subscription = null;

  private ticket: Ticket;
  public ultimoTicket: string | undefined;

  constructor(
    private webrestService: WebrestService,
  ) { }

  ngOnInit(): void {
  }

  generarTicket(): void {

    this.ticket = new Ticket( new Date().toISOString());
    this.observ$ = this.webrestService.createTikect(this.ticket).pipe(
      takeUntil(this.unsubscribe$)
    )
      .subscribe(
        json => {
            swal.fire('Nuevo ticket creado', `${json.data}`, 'success');
            this.ultimoTicket = this.ticket.id;
        }
        , err => {
            this.ultimoTicket = undefined;
            swal.fire('Error en alta de ticket', `err = ${JSON.stringify(err.error)}`, 'error');
        }
      );

  }

  ngOnDestroy(): void {
      console.log('FormComponent.ngOnDestroy (), realizando unsubscribes');
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
      if (this.observ$ != null && !this.observ$.closed) {
        console.log('haciendo : this.observ$.unsubscribe()');
        this.observ$.unsubscribe();
      } else {
        console.log('No necesario hacer: this.observ$.unsubscribe()');
      }

      if (this.subscriptionParams$ != null && !this.subscriptionParams$.closed) {
        console.log('haciendo : this.subscriptionParams$.unsubscribe()');
        this.subscriptionParams$.unsubscribe();
      } else {
        console.log('No necesario hacer: this.subscriptionParams$.unsubscribe()');
      }
    }

}
