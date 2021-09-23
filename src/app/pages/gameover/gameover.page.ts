import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-gameover',
  templateUrl: './gameover.page.html',
  styleUrls: ['./gameover.page.scss'],
})
export class GameoverPage implements OnInit {
  score;
  // bestScore;
    
  constructor(private modalCtrl: ModalController,) { }

  ngOnInit() {
  }

  start():void{
    this.modalCtrl.dismiss();

  }
  sair():void{
    navigator['app'].exitApp();
  }


}
