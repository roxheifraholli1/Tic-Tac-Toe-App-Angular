import { Gamelogic } from './../gamelogic';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [Gamelogic]
})
export class GameComponent implements OnInit {

  constructor(public game:Gamelogic) { }

  ngOnInit(): void {
  }
   
  startGame():void{
   this.game.gameStart();
   const currentPlayer = 'Current turn: Player '+this.game.currentTurn;
   const information = document.querySelector('.current-status');
   information!.innerHTML = currentPlayer;

  }

  async clickSubField(subField:any):Promise<void>{
    if(this.game.gameStatus === 1){
      const position = subField.currentTarget.getAttribute('position');
      
      this.game.setField(position,this.game.currentTurn);
       const color = this.game.getPlayerColorClass();
       subField.currentTarget.classList.add(color);
    

        await this.game.checkGameEndFull().then((end:boolean) => {
          if(this.game.gameStatus === 0 && end){
            const information = document.querySelector('.current-status');
               information!.innerHTML = 'No winner,draw!';
          }
        });
        await this.game.checkGameEndsWinner().then((end:boolean) => {
          if(this.game.gameStatus === 0 && end){
            const information = document.querySelector('.current-status');
               information!.innerHTML = 'The winner is Player nr '+this.game.currentTurn;
          }
        });

       

       this.game.changePlayer();
    
       if(this.game.gameStatus === 1){
         const currentPlayer = 'Current turn: Player '+this.game.currentTurn;
         const information = document.querySelector('.current-status');
         information!.innerHTML = currentPlayer;
       }
      }
    

  }

}
