import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GameoverPage } from '../gameover/gameover.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  score = 0;
  ordem = [];
  ordemJogador = [];
  scorejogador;

  verde = "verde";
  vermelho="vermelho";
  amarelo="amarelo";
  azul="azul";
  display = 'listview'



  ngOnInit(): void {
  }

  constructor(private modalController:ModalController) {
  }

  start(): void {
    this.display='none';
    setTimeout(() => {
      this.ordemJogador = [];
      let sorteio = Math.floor(Math.random() * 4);
      //pilha, vai colocando em ordem as cores
      this.ordem[this.ordem.length] = sorteio;
      console.log(this.ordem);
  
      for(let i in this.ordem){
        this.mudaCor(i,Number(i)+1); 

      }
    }, 1000);
  }


  rodada(): void {

    if(this.ordem.length != this.ordemJogador.length){
      if(this.ordem[this.ordemJogador.length - 1] != this.ordemJogador[this.ordemJogador.length -1]){
        this.gameOver();
      }
      return;
    }
    
    if(this.ordem.toString() === this.ordemJogador.toString()){
      console.log('acertou')
      this.score++;
      this.start();
    } else {
      console.log('errou')
      this.gameOver();
    }

  }

  click(color): void {

    this.ordemJogador[this.ordemJogador.length] = color;
    
    this.rodada();
 
  }

  botaoverde(): void {
    this.click(0);
  }

  botaovermelho(): void {
    this.click(1);
  }

  botaoamarelo(): void {
    this.click(2);
  }

  botaoazul(): void {
    this.click(3);
  }

  mudaCor(i,number): void {
    number = number * 700;
    setTimeout(() => {
      if (this.ordem[i] == 0) {
        this.verde = "verdeclaro";
      }
      else if (this.ordem[i] == 1) {
        this.vermelho = "vermelhoclaro";
  
      }
      else if (this.ordem[i] == 2) {
        this.amarelo = "amareloclaro";
  
      }
      else if (this.ordem[i] == 3) {
        this.azul = "azulclaro";
      }
      
    }, number-100);
    setTimeout(() => {      
      this.verde = "verde";
      this.vermelho="vermelho";
      this.amarelo="amarelo";
      this.azul="azul";
       
     }, number+400);

  }

  async gameOver(){
    const modal = await this.modalController.create({
      component: GameoverPage,
      componentProps: {
        score:this.score
      }
      
    });
    this.display='';
    this.score = 0;
    this.ordem = [];
    return await modal.present();
  }
  

}
