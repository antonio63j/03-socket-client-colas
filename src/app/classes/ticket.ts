export class Ticket {

   public id: string;
   public escritorio: number;
   private dateCreacion?: Date;
   private dateAtencion?: Date;

   constructor(id: string){
       this.id = id;
   }

   public getId(): string {
     return this.id;
   }

   public setEscritorio(escritorio: number): void{
     this.escritorio = escritorio;
   }

}

