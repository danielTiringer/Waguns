export class Popular{
  make:string;
  count:number;

  constructor(pop){
    this.make = pop.make;
    this.count = pop.count;
  }
}