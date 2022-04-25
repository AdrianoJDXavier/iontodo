import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { Data } from '../../providers/data/data';
import { AddItemPage } from '../add-item/add-item';
import { ItemDetailPage } from '../item-detail/item-detail';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public items = [ ];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public dataService: Data) {

    this.dataService.getData().then((todos) => {
      if(todos) {
        this.items = todos;
      }
    });
  }

  ionViewDidLoad() {
    
  }

  addItem() {
    let addModal = this.modalCtrl.create(AddItemPage);

    addModal.onDidDismiss((item) => {
      if(item) {
        this.saveItem(item);
      }
    });

    addModal.present();
  }

  saveItem(item) {
    this.items.push(item);
    this.dataService.save(this.items);
  }

  viewItem(item) {
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }

  deleteItem(index) {
    (this.items).splice(index, 1);
    this.dataService.save(this.items);
  }

  const AtualizaTarefa = ({ target }, index) => {
    const copiaTarefa = Array.from(tarefas);
    copiaTarefa.splice(index, 1, { id: index, value: target.value });
    setTarefas(copiaTarefa);
  }

}
