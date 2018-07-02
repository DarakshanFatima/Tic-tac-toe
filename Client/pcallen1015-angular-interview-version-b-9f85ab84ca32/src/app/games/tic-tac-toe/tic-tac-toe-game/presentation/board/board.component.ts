import { Component, ViewChild, forwardRef } from '@angular/core';
import { TicTacToeGameComponent } from '../../tic-tac-toe-game.component';
import { Player, GamesService } from '../../../../games.service';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  providers: [{ provide: TicTacToeGameComponent, useExisting: forwardRef(() => BoardComponent ) }]
})
export class BoardComponent extends TicTacToeGameComponent{
  squares = Array(9).fill(null);
  players: Player[];
  selectedPlayers = new Array<Player>();
  currentPlayer: Player;
  winner = null;
  choosePlayers = true;
  errorText = '';
  tied = false;

  constructor(private gameService: GamesService) { super(); 
    this.getPlayers();
    this.selectedPlayers.push(new Player());
    this.selectedPlayers.push(new Player());
    this.selectedPlayers[0].symbol ='X';
    this.selectedPlayers[1].symbol ='O';
  }

  public newGame(): void {
    this.choosePlayers = true;
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.tied = false;
    //this.getPlayers();
  }

  get gameStatusMessage(){
    if (this.winner) 
      { return `Player ${this.winner} has ${this.currentPlayer.score} won!`; } 
    else if (this.tied) {
      return 'Game tied. Play again.'
    }
    else {
    return `Player ${this.currentPlayer.name}'s turn`; }
  }

  handleMove(position) {
    if(!this.winner && !this.squares[position] ){
      this.squares[position] = this.currentPlayer.symbol;
      if(this.winnigMove()) {
        this.winner = this.currentPlayer.name;
        this.players.forEach(x => {
          if (x.name === this.currentPlayer.name) {
            x.score += 1;
            this.currentPlayer.score = x.score;
            this.addNewWin(x);
          }
        })
      }
      else if (this.squares.findIndex(x => x === null) <= 0) {
        this.tied = true;
      }
      else {
      this.currentPlayer = this.currentPlayer === this.selectedPlayers[0] ? this.selectedPlayers[1] : this.selectedPlayers[0]; }
    }
  }

  winnigMove() {
    const conditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // colums
      [0, 4, 8], [2, 4, 6]             // diagonal 
    ];
    for (let condition of conditions) {
        if ( this.squares[condition[0]]
            && this.squares[condition[0]] === this.squares[condition[1]]
            && this.squares[condition[1]] === this.squares[condition[2]]) {
              return true;
        }
    }
    return false;
  }
  
  addPlayer(newPlayer: string) {
    const player = new Player;
    player.name = newPlayer;
    if (typeof this.selectedPlayers[0].name == 'undefined'){
        this.selectedPlayers[0].name = this.selectedPlayers[1].name = newPlayer;
      }
    this.addPlayerToDatabase(player);
    newPlayer = "";
  }

  addPlayerToDatabase(player: Player) {
    this.gameService.addPlayer(player).subscribe((data: any) => {
      console.log(data);
      this.getPlayers();
    },
    error => () => {
       console.log('error', error);
    });
  }

  addNewWin(player: Player) {
    this.gameService.updatePlayer(player).subscribe((data: any) => {
      console.log(data);
      //this.getPlayers();
    },
    error => () => {
       console.log('error', error);
    })
  }

  getPlayers() {
    this.players = new Array<Player>();
    this.gameService.getPlayers().subscribe((data: any) => {
      data.Win.forEach (d => {
        const p = new Player;
        p.id = d._id;
        p.name = d.name;
        p.score = d.score;
        p.symbol = d.symbol;
        p.game = d.game;
        this.players.push(p);
      })
      if (this.players.length > 0) { this.selectedPlayers[0] = this.players[0]; this.selectedPlayers[0].symbol = 'X';}
      if (this.players.length > 1) { this.selectedPlayers[1] = this.players[1]; this.selectedPlayers[1].symbol ='O';}
             
      console.log("getting players");
      console.log(this.players);
    },
    error => () => {
       console.log('error', 'Damn', error);
    });
  }

  startGame() {
     if (this.selectedPlayers[0].name === this.selectedPlayers[1].name) {
       this.errorText = 'Both players cannot be same';
     }
     else if (this.selectedPlayers[0].symbol === this.selectedPlayers[1].symbol) {
       this.errorText = "Both symbols cannot be same";
     }
     else {
      this.choosePlayers = false;
      this.currentPlayer = this.selectedPlayers[0];
      console.log(this.selectedPlayers);
      console.log(this.currentPlayer);
     }
  }
 
}
