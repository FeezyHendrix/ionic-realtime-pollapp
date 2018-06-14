import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PusherServiceProvider } from '../../providers/pusher-service/pusher-service';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public http : HttpClient, private pusher : PusherServiceProvider) {

  }

  event: string = 'vote';
  vote: string = '';
  ifVoted : boolean = false;
  voteCount = {
    salah: 0,
    kane: 0,
    eriksen: 0,
    kevin: 0,
  };

  playerData = [
    {
      name: 'Mo. Salah',
      goals: 30,
      assists: 12,
      shortName: 'salah',
      image: 'https://platform-static-files.s3.amazonaws.com/premierleague/photos/players/250x250/p118748.png'
    },
    {
      name: 'Christian Eriksen',
      goals: 8,
      assists: 13,
      shortName: 'eriksen',
      image: 'https://platform-static-files.s3.amazonaws.com/premierleague/photos/players/250x250/p80607.png',
    },
    {
      name: 'Harry Kane',
      goals: 26,
      assists: 5,
      shortName: 'kane',
      image:
        'https://platform-static-files.s3.amazonaws.com/premierleague/photos/players/40x40/p78830.png',
    },
    {
      name: "Kevin De'bruyne",
      goals: 10,
      assists: 17,
      shortName: 'kevin',
      image: 'https://platform-static-files.s3.amazonaws.com/premierleague/photos/players/40x40/p61366.png',
    },
];




  sendVotes(player){
    this.http.post('http://localhost:4000/vote', { player }).subscribe((res : any) => {
      this.vote  = res.player;
      this.ifVoted = true;
    })
  }

  getVoteClasses(player){
    return {
      elect : this.ifVoted && this.vote === player,
      lost : this.ifVoted && this.vote !== player
    }
  }

  ionViewDidLoad(){
    const channel = this.pusher.init();
    channel.bind(this.event, ({ player }) => {
      this.voteCount[player.shortName] += 1
    })
  }

}
