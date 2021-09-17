import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-gameover',
  templateUrl: './gameover.page.html',
  styleUrls: ['./gameover.page.scss'],
})
export class GameoverPage implements OnInit {
  score;
    
  constructor(private modalCtrl: ModalController,) { }

  ngOnInit() {
  }

  reiniciar():void{
    this.modalCtrl.dismiss();

  }

}
