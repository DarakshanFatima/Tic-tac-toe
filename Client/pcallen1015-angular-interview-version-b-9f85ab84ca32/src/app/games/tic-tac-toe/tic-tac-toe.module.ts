import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicTacToeGameComponent } from './tic-tac-toe-game/tic-tac-toe-game.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CellComponent } from './tic-tac-toe-game/presentation/cell/cell.component';
import { BoardComponent } from './tic-tac-toe-game/presentation/board/board.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    TicTacToeGameComponent,
    CellComponent,
    BoardComponent,
  ],
  exports: [
    TicTacToeGameComponent,
  ],
  bootstrap: [TicTacToeGameComponent]
})
export class TicTacToeModule { }