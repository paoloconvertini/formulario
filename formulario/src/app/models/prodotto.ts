import {MateriaPrima} from "./materiaPrima";
import {TipoProdotto} from "./tipo-prodotto";

export class Prodotto {
  id: number = 0
  nome: string = ''
  qtaPedana: any
  qtaSacco: any
  unitMisuSacco: any
  materiePrime: MateriaPrima[] = []
  tipoProdotto: TipoProdotto = new TipoProdotto()
  updateDate: any
  prezzoPubblico: any;
}
