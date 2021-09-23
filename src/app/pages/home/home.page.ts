import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GameoverPage } from '../gameover/gameover.page';
import { LocalStorageService } from '../service/local-storage.service';
// import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  score = 0;
  bestScore;
  ordem = [];
  ordemJogador = [];

  verde = "verde";
  vermelho="vermelho";
  amarelo="amarelo";
  azul="azul";

  audio = new Audio();




  ngOnInit(): void {
    this.start();
    
  }

  constructor(
    private modalController:ModalController,
    private storage: LocalStorageService    
   ) {
    // this.bestScore=this.serviceRecord.get();
    this.bestScore = this.storage.get('score');
  }

  start(): void {
    //começo de tudo
    setTimeout(() => {
      //limpa a pilha do jogador
      this.ordemJogador = [];
      let sorteio = Math.floor(Math.random() * 4);
      //pilha, vai colocando em ordem as cores
      this.ordem[this.ordem.length] = sorteio;
  
      for(let i in this.ordem){
        //mostra as cores que o jogador deve acertar
        this.mudaCor(i,Number(i)+1); 

      }
    }, 1000);
  }


  rodada(): void {
    //compara a jogada com a ordem que deve ir

    if(this.ordem.length != this.ordemJogador.length){
      if(this.ordem[this.ordemJogador.length - 1] != this.ordemJogador[this.ordemJogador.length -1]){
        this.audio.pause();
        this.gameOver();
      }
      return;
    }
    
    if(this.ordem.toString() === this.ordemJogador.toString()){
      this.score++;
      this.start();
    } else {
      this.audio.pause();
      this.gameOver();
    }

  }

  click(color): void {
    //forma a pilha do jogador
    this.ordemJogador[this.ordemJogador.length] = color;
    
    this.rodada();
 
  }
  
  botaoverde(): void {
    this.click(0);
    this.playAudioVerde();

  }

  botaovermelho(): void {
    this.click(1);
    this.playAudioVermelho();

  }

  botaoamarelo(): void {
    this.click(2);
    this.playAudioAmarelo();

  }

  botaoazul(): void {
    this.click(3);
    this.playAudioAzul();

  }

  playAudioVerde(){
    this.audio.src = "../../../assets/sons/verde.mp3";
    this.audio.load();
    this.audio.play();
  }
  playAudioVermelho(){
    this.audio.src = "../../../assets/sons/vermelho.mp3";
    this.audio.load();
    this.audio.play();
  }
  playAudioAmarelo(){
    this.audio.src = "../../../assets/sons/amarelo.mp3";
    this.audio.load();
    this.audio.play();
  }
  playAudioAzul(){
    this.audio.src = "../../../assets/sons/azul.mp3";
    this.audio.load();
    this.audio.play();
  }
  playAudioerror(){
    let errorsound = new Audio();
    errorsound.src = "../../../assets/sons/error.mp3";
    errorsound.load();
    errorsound.play();
  }

  mudaCor(i,number): void {
    //faz as cores tocarem na ordem correta
    number = number * 700;
    setTimeout(() => {
      if (this.ordem[i] == 0) {
        this.verde = "verdeclaro";
        this.playAudioVerde();
      }
      else if (this.ordem[i] == 1) {
        this.vermelho = "vermelhoclaro";
        this.playAudioVermelho();
        
      }
      else if (this.ordem[i] == 2) {
        this.amarelo = "amareloclaro";
        this.playAudioAmarelo();
        
      }
      else if (this.ordem[i] == 3) {
        this.azul = "azulclaro";
        this.playAudioAzul();

      }
      
    }, number-100);
    setTimeout(() => {      
      this.verde = "verde";
      this.vermelho="vermelho";
      this.amarelo="amarelo";
      this.azul="azul";
       
     }, number+400);

  }
  maiorPonto():void{
    if(this.bestScore<=this.score){
      this.bestScore = this.score;
      this.storage.set('score',this.bestScore);
    }
  }

  async gameOver(){
    
    this.playAudioerror();
    this.maiorPonto();
    //abre a pag se o jogador perde
    const modal = await this.modalController.create({
      component: GameoverPage,
      componentProps: {
        score:this.score,
        bestScore:this.bestScore
      }
      
    });
    modal.onDidDismiss()
    .then(() => {
      this.start();
  });
  //limpa as pilhas de score e ordem
    
    this.score = 0;
    this.ordem = [];

 
    return await modal.present();

  }

  

}
