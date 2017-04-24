import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { BuyerListModal } from './../buyer-list-modal/buyer-list';
import { ShoppingList } from './../../models/shopping-list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-list-home',
  templateUrl: 'list-home.html',
})
export class ListHome {

  public list: Array<string>;
  public newItemValue: string;
  public buyerLists: FirebaseListObservable<ShoppingList[]>; // This will be retrieved from firebase

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private af: AngularFire) {
    this.list = new Array<string>();
    this.buyerLists = this.af.database.list('/lists');
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ListHome');
  }

  addItem(): void {
    this.list.push(this.newItemValue);
    this.newItemValue = "";
  }

  removeListItem(item: string): void {
    var index = this.list.indexOf(item);
    this.list.splice(index, 1);
  }

  activateList(): void {
    var newList: ShoppingList = new ShoppingList();
    newList.items = this.list;
    this.list = new Array<string>();
    this.newItemValue = "";

    // Push to firebase
    this.buyerLists.push(newList);
  }

  removeBuyerList(list: ShoppingList): void {
    // Remove from firebase
    this.buyerLists.remove(list.$key);
  }

  viewBuyerList(list: ShoppingList): void {
    let buyerListModal = this.modalCtrl.create(BuyerListModal, {"listData": list});
    buyerListModal.present();
  }

}
