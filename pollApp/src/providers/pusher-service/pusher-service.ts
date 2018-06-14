import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



declare const Pusher: any;

@Injectable()
export class PusherServiceProvider {

  channel;

  constructor(public http: HttpClient) {
    var pusher = new Pusher('e23f5a6056e5daeb6066', {
    cluster: 'eu',
    encrypted: true,
    });
    this.channel = pusher.subscribe('vote-channel');
  }


  public init(){
    return this.channel;
  }
}
