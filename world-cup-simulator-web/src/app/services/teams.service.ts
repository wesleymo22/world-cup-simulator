import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Team } from '../Models/Team';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  apiUrl = 'https://localhost:7050/api/teams/group'

  constructor(private HttpClient: HttpClient) { }

  public getGroups(){
    return this.HttpClient.get<Team[][]>(this.apiUrl)
  }
}
