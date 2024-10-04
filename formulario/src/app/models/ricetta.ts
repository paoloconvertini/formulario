import {MateriaPrima} from "./materiaPrima";

export class Ricetta {
  id: number = 0
  nome: string = ''
  lavoro: any
  sacco: any
  materiePrime: MateriaPrima[] = []
}
