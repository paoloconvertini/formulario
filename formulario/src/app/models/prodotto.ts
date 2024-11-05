import {MateriaPrima} from "./materiaPrima";

export class Prodotto {
  id: number = 0
  nome: string = ''
  lavoro: any
  sacco: any
  materiePrime: MateriaPrima[] = []
}
