import { Component, OnInit } from '@angular/core';
import { Match, Team } from './Models/Team';
import { TeamsService } from './services/teams.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
constructor(service: TeamsService) {
  service.getGroups().subscribe(groups => {
    this.groups = groups
    this.populateKnockouts(groups);
  })
}

  title = 'world-cup-simulator-web';
  groups!: Team[][]
  roundOf16!: Match[]
  quarter!: Match[]
  semi!: Match[]
  final!: Match
  winner!: Team

  ngOnInit() {
    this.initRoundOf16();
    this.initQuarter();
    this.initSemi();
    this.initFinal();
    this.initWinner();
  }

  onMoveTeam(groups: any){
    this.populateKnockouts(groups);
    this.initQuarter();
    this.initSemi();
    this.initFinal();
    this.initWinner();
  }

  changeQuarter(LastMatch: number, winner: Team){
    if(this.roundOf16[LastMatch].teamOne?.name == '' ||
      this.roundOf16[LastMatch].teamTwo?.name == '')
        return;

    var currentMatch = this.calculateNextMatch(LastMatch);
    var isTeamOneSide = this.isTeamOneSideNextMatch(LastMatch);

    if(isTeamOneSide)
      this.quarter[currentMatch].teamOne = winner;
    else
      this.quarter[currentMatch].teamTwo = winner;

      var nextMach = this.calculateNextMatch(currentMatch)
      var loser = this.roundOf16[LastMatch].teamOne!.name == winner.name ?
        this.roundOf16[LastMatch].teamTwo : this.roundOf16[LastMatch].teamOne

      if(this.semi[nextMach].teamOne == loser || this.semi[nextMach].teamTwo == loser)
      this.changeSemi(currentMatch, winner!, loser);
  }

  changeSemi(LastMatch: number, winner: Team, Loser: Team | undefined = undefined){
    if(this.quarter[LastMatch].teamOne?.name == '' ||
      this.quarter[LastMatch].teamTwo?.name == '')
        return;

    var currentMatch = this.calculateNextMatch(LastMatch);
    var isTeamOneSide = this.isTeamOneSideNextMatch(LastMatch);

    if(isTeamOneSide)
      this.semi[currentMatch].teamOne = winner;
    else
      this.semi[currentMatch].teamTwo = winner;

    if(Loser == undefined)
    Loser = this.quarter[LastMatch].teamOne!.name == winner.name ?
      this.quarter[LastMatch].teamTwo : this.quarter[LastMatch].teamOne

    if(this.final.teamOne == Loser || this.final.teamTwo == Loser)
      this.changeFinal(currentMatch, winner, Loser);
  }

  changeFinal(LastMatch: number, winner: Team, Loser: Team | undefined = undefined){
    if(this.semi[LastMatch].teamOne?.name == '' ||
      this.semi[LastMatch].teamTwo?.name == '')
      return;

    switch(LastMatch){
      case 0:
        this.final.teamOne = winner
        break;
      case 1:
        this.final.teamTwo = winner
        break;

    }
  }

  changeWinner(winner: Team){
    if(this.final.teamOne?.name == '' ||
    this.final.teamTwo?.name == '')

      return;
    this.winner = winner;
  }

  initRoundOf16(){
    this.roundOf16 = []
    for(var i=0; i < 8; i++){
      this.roundOf16[i] = {
        teamOne: {name: '', img: ''},
        teamTwo: {name: '', img: ''}
      }
    }
  }

  initQuarter(){
    this.quarter = []
    for(var i=0; i < 4; i++){
      this.quarter[i] = {
        teamOne: {name: '', img: ''},
        teamTwo: {name: '', img: ''}
      }
    }
  }

  initSemi(){
    this.semi = []
    for(var i=0; i < 2; i++){
      this.semi[i] = {
        teamOne: {name: '', img: ''},
        teamTwo: {name: '', img: ''}
      }
    }
  }

  initFinal(){
    this.final = {
      teamOne: {name: '', img: ''},
      teamTwo: {name: '', img: ''}
    }
  }

  initWinner(){
    this.winner = {name: '', img: ''}
  }

  getBackgroundStyle(team: any){
    return {'background-image':'url('+ team?.img +')'}
  }

  populateKnockouts(groups: Team[][]){
    this.roundOf16 = [];
    this.roundOf16.push({teamOne: groups[0][0], teamTwo: groups[1][1]});
    this.roundOf16.push({teamOne: groups[1][0], teamTwo: groups[0][1]});
    this.roundOf16.push({teamOne: groups[2][0], teamTwo: groups[3][1]});
    this.roundOf16.push({teamOne: groups[3][0], teamTwo: groups[2][1]});
    this.roundOf16.push({teamOne: groups[4][0], teamTwo: groups[5][1]});
    this.roundOf16.push({teamOne: groups[5][0], teamTwo: groups[4][1]});
    this.roundOf16.push({teamOne: groups[6][0], teamTwo: groups[7][1]});
    this.roundOf16.push({teamOne: groups[7][0], teamTwo: groups[6][1]});
  }

  calculateNextMatch(match: number){
    switch(match)
    {
      case 0:
        return 0;
      case 2:
        return 0;
      case 1:
        return 1;
      case 3:
        return 1;
      case 4:
        return 2;
      case 6:
        return 2;
      case 5:
        return 3;
      case 7:
        return 3;
      default:
        return 0;
    }
  }

  isTeamOneSideNextMatch(LastMatch: number){
    switch(LastMatch){
      case 0:
      case 1:
      case 4:
      case 5:
        return true;
      case 2:
      case 3:
      case 6:
      case 7:
        default:
          return false;
    }
  }
}

