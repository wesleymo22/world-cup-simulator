import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Team } from '../Models/Team';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  @Output()
  moveTeam = new EventEmitter<any>();

  @Input()
  groups!: Team[][];

  ngOnInit(): void {
    this.initGroup()
  }

  initGroup(){
    this.groups = [];
    for(var i=0; i<8; i++){
      this.groups[i] = [
        {name: '', img: '' },
        {name: '', img: '' },
        {name: '', img: '' },
        {name: '', img: '' }
      ]
    }9
  }

  drop(event: any, index: number){
    moveItemInArray(this.groups[index], event.previousIndex, event.currentIndex)
    this.moveTeam.emit(this.groups)
  }

}
