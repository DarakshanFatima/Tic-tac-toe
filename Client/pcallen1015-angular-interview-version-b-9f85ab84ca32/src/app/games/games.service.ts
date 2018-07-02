import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
//import { Player } from './player';

/**
 * Basic metadata defining a Game
 */
export class Game {
  /**
   * Unique ID for the game
   */
  public id: string;

  /**
   * Name of the game
   */
  public name: string;
}

export class Player {
  id : number;
  name : string;
  game : string = 'tic-tac-toe';
  symbol : string;
  score : number = 0;
}

/**
 * The implemented games
 */
const GAMES: Game[] = [
  {
    id: 'tic-tac-toe',
    name: 'Tic-Tac-Toe',
  }
]

/**
 * Service for consolidating shared game-related functionality and utilities
 */
@Injectable()
export class GamesService {
  public uri = 'http://localhost:8080/wins/';
  /**
   * Initialize the service
   * @param http 
   */
  constructor(private http: HttpClient) { }

  /**
   * Get the available games
   */
  public get games(): Game[] { return GAMES; }

  /**
   * Get a single game by its ID
   * @param gameId 
   */
  public getGame(gameId: string) { return GAMES.find((game: Game) => game.id === gameId); }

  public getPlayers(): Observable<any> {
    return this.http.get<any>(this.uri);
  }

  public addPlayer(player: Player):Observable<any> {
      return this.http.post<any>(this.uri, player);
  }

  public updatePlayer(player: Player): Observable<any> {
      return this.http.put<any>(this.uri + player.id, JSON.stringify(player));
  }

}

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.headers.has('Content-Type')) {
            req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        }

        req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
        console.log(JSON.stringify(req.headers));
        return next.handle(req);
    }
}