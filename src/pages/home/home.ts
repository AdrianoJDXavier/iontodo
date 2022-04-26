import { Component } from '@angular/core';
import { AlertController, ModalController, NavController } from 'ionic-angular';
import { Data } from '../../providers/data/data';
import { AddItemPage } from '../add-item/add-item';
import { ItemDetailPage } from '../item-detail/item-detail';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public items = [];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public dataService: Data, public alertCtrl: AlertController) {

    this.dataService.getData().then((todos) => {
      if (todos) {
        this.items = todos;
      }
    });
  }

  addItem() {
    let addModal = this.modalCtrl.create(AddItemPage);

    addModal.onDidDismiss((item) => {
      if (item) {
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
    let alert = this.alertCtrl.create({
      title: 'Deletar Tarefa?',
      message: 'Não será possivel reverter a ação.',
      buttons: [{ text: 'Cancelar', role: 'cancel', cssClass: 'danger' },
      {
        text: 'Deletar', handler: () => {
          (this.items).splice(index, 1);
          this.dataService.save(this.items);
        }
      }
      ]
    });
    alert.present();
  }

  updateItem(index) {
    let alert = this.alertCtrl.create({
      title: 'Atualizar Tarefa?',
      message: 'Digite sua nova tarefa para atualizar.',
      inputs: [{ name: 'title', placeholder: 'Title', value: this.items[index].title }, { name: 'description', placeholder: 'Description', value: this.items[index].description }],
      buttons: [{ text: 'Cancelar', role: 'cancel', cssClass: 'danger' },
      {
        text: 'Atualizar', handler: data => {
          this.items[index].title = data.title;
          this.items[index].description = data.description;
          this.dataService.save(this.items);
        }
      }
      ]
    });
    alert.present();
  }

}
