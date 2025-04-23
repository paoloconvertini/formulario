import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CommonListComponent} from "../commonListComponent";
import {MatDialog} from "@angular/material/dialog";
import {ProdottiService} from "../../services/prodotti.service";
import {takeUntil} from "rxjs";
import {Prodotto} from "../../models/prodotto";
import {DettaglioProdottoDialogComponent} from "../dettaglio-prodotto-dialog/dettaglio-prodotto-dialog.component";
import {Filtro} from "../../models/filtro";
import {TipoProdotto} from "../../models/tipo-prodotto";
import {TipoProdottoService} from "../../services/tipo-prodotto.service";
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {TipoProdottoWeberService} from "../../services/weber/tipo-prodotto-weber.service";
import {ProdottiWeberService} from "../../services/weber/prodotti-weber.service";
import {
  DettaglioProdottoDialogWeberComponent
} from "../dettaglio-prodotto-dialog-weber/dettaglio-prodotto-dialog-weber.component";

interface TreeNode {
  name: string;
  tipoProdotto?: TipoProdotto;
  prodotto?: Prodotto;
  children?: TreeNode[];
  isLoading?: boolean;
}

interface FlatNode {
  name: string;
  level: number;
  expandable: boolean;
  node: TreeNode;

}

@Component({
  selector: 'app-ricette',
  templateUrl: './prodotti-weber.component.html',
  styleUrls: ['./prodotti-weber.component.css']
})
export class ProdottiWeberComponent extends CommonListComponent implements OnInit {
  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable
  );

  tipoProdotti:TipoProdotto[] = [];
  filteredTipoProdotti:TipoProdotto[] = [];
  active: boolean = false;
  filtro: Filtro = new Filtro();

  constructor(private tipoProdottoService: TipoProdottoWeberService,  private cdr: ChangeDetectorRef,
              private service: ProdottiWeberService, private dialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
    this.getTipoProdotti();
  }

transformer = (node: TreeNode, level: number): FlatNode => ({
    name: node.name,
    level,
    expandable: !!node.children,
    node
  });


  treeFlattener = new MatTreeFlattener<TreeNode, FlatNode>(
    this.transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  ds = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: FlatNode) => node.expandable;

  onToggleNode(node: FlatNode) {
    const treeNode = node.node;
    if (treeNode.children && treeNode.children.length > 0){
      this.treeControl.expand(node);
      return;
    }
    treeNode.isLoading = true;
    this.ds.data = [...this.ds.data];

    this.service.getProdottiByTipo(treeNode.tipoProdotto!.id).subscribe(prodotti => {
      const newChildren: TreeNode[] = prodotti.map((p:any) => ({
        name: p.nome,
        prodotto: p
      }));
      treeNode.children = newChildren;
      treeNode.isLoading = false;
      node.expandable = true;

      // Ricrea completamente l'array dei dati per forzare la notifica
      this.ds.data = [...this.ds.data];

      // Forza Angular a rieseguire il change detection
      this.cdr.detectChanges();

      // Espandi il nodo DOPO il change detection
      this.treeControl.expand(node);
      console.log('Expanded:', this.treeControl.isExpanded(node));

    });
  }

  getTipoProdotti(): void {
    this.loader = true;
    this.tipoProdottoService.getAll().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (data: TipoProdotto[]) => {
          this.ds.data = data.map(tp => ({
            name: tp.descrizione,
            tipoProdotto: tp,
            children: []
          }));
          // this.filteredTipoProdotti = data;
          // if (this.filtro.searchText) {
          //   this.applyFiltro();
          // }
          this.loader = false;
        }
      })
  }

  creaNuovo() {
    const dialogRef = this.dialog.open(DettaglioProdottoDialogWeberComponent, {
      width: '95%',
      data: {prodotto: new Prodotto()},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getTipoProdotti();
      }
    });
  }

  applyFiltro() {
    const searchTextLower = this.filtro.searchText.toLowerCase();
    this.filteredTipoProdotti = this.tipoProdotti.filter(tp =>
      tp.descrizione.toLowerCase().includes(searchTextLower)
    );
  }
}
