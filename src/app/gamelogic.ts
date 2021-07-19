
import { Status } from './gamestatus';


export class Gamelogic {
 
 
     gamefield:Array<number>=[];
     currentTurn:number;
     gameStatus:Status;

     winSituationsOne:Array<Array<number>> = [
       [1,1,1,0,0,0,0,0,0],
       [0,0,0,1,1,1,0,0,0],
       [0,0,0,0,0,0,1,1,1],
       [1,0,0,1,0,0,1,0,0],
       [0,1,0,0,1,0,0,1,0],
       [0,0,1,0,0,1,0,0,1],
       [0,0,1,0,1,0,1,0,0],
       [1,0,0,0,1,0,0,0,1]
     ];

     winSituationsTwo:Array<Array<number>> = [
      [2,2,2,0,0,0,0,0,0],
      [0,0,0,2,2,2,0,0,0],
      [0,0,0,0,0,0,2,2,2],
      [2,0,0,2,0,0,2,0,0],
      [0,2,0,0,2,0,0,2,0],
      [0,0,2,0,0,2,0,0,2],
      [0,0,2,0,2,0,2,0,0],
      [2,0,0,0,2,0,0,0,2]
    ];

    
    
     public constructor(){
      this.gamefield = [0,0,0,0,0,0,0,0,0];
      this.gameStatus = Status.STOP;
    }

    
    gameStart():void {
      this.gamefield = [0,0,0,0,0,0,0,0,0];
      this.currentTurn = this.randomPlayerStart();
      console.log(this.currentTurn);
      this.gameStatus= Status.START;
    }
  randomPlayerStart(): number {
   const startPlayer = Math.floor(Math.random()*2)+1;

   return startPlayer;
  }
  setField(position: number, value: number):void {
    this.gamefield[position] = value;
    
  }

  getPlayerColorClass():string {
    const colorClass = (this.currentTurn === 2) ? 'player-two' : 'player-one';
    return colorClass;
  }

  changePlayer():void {
    this.currentTurn = (this.currentTurn === 2) ? 1 : 2;

  }

  async checkGameEndFull():Promise<boolean> {
    let isFull = true;
    if(this.gamefield.includes(0)){
      isFull = false;
    }
     if(isFull){
       
       this.gameEnds();
       return true;
     }else {
       return false;
     }
  }
  gameEnds():void {
    this.gameStatus = Status.STOP;
  }


  arrayEquals(a:Array<any>,b:Array<any>):boolean{
       return Array.isArray(a) && Array.isArray(b) && a.length === b.length && 
       a.every((value,index) => value === b[index]);
  }

   
  async checkGameEndsWinner():Promise<boolean> {
    let isWinner = false;
    const checkarray= (this.currentTurn === 1) ? this.winSituationsOne : this.winSituationsTwo;
    
    const currentArray: number[] = [];
    
    this.gamefield.forEach((subfield, index) => {
    if(subfield !== this.currentTurn){
      currentArray[index]  = 0;
    }else{
      currentArray[index] = subfield;
    }
    });

     checkarray.forEach((checkfield,checkIndex)=> {
       if(this.arrayEquals(checkfield,currentArray)){
          isWinner = true;

       }
     });

    console.log(currentArray);
    
    if(isWinner){
       
       this.gameEnds();
       return true;
     }else {
       return false;
     }
  }


}
