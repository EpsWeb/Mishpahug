/// <reference types='@types/googlemaps' />

import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {AgmCoreModule, MapsAPILoader} from '@agm/core';
import {ancestorWhere} from 'tslint';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {logger} from 'codelyzer/util/logger';

@Component({
  selector: 'max-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.sass']
})
export class TestComponent implements OnInit {
  constructor(private http: HttpClient) {
  }

  form: FormGroup;
  lat;
  long;

  getUserIP = function (onNewIP) {
    const myPeerConnection = RTCPeerConnection || webkitRTCPeerConnection;
    const pc = new myPeerConnection({
        iceServers: []
      }),
      localIPs = {},
      ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;

    // key;

    function iterateIP(ip) {
      if (!localIPs[ip]) {
        onNewIP(ip);
      }
      localIPs[ip] = true;
    }

    pc.createDataChannel('');

    pc.createOffer().then(function (sdp) {
      sdp.sdp.split('\n').forEach(function (line) {
        if (line.indexOf('candidate') < 0) {
          return;
        }
        line.match(ipRegex).forEach(iterateIP);
      });

      pc.setLocalDescription(sdp);
    }).catch(function (reason) {
      // An error occurred, so handle the failure to connect
    });

    pc.onicecandidate = function (ice) {
      if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) {
        return;
      }
      ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
    };
  };

  ngOnInit() {
    let myIP = '';
    this.getUserIP((ip) => {
      console.log(ip);
      myIP = ip;
      console.log(myIP);
      this.http.get('http://api.ipapi.com/api/check?access_key=3f11cd082defe9e03f19b4ffc348076f')
        .subscribe((res) => {
          console.log(res);
          this.lat = res.latitude;
          this.long = res.longitude;
          console.log(this.lat, this.long);
        });
    });
    console.log(this.lat, this.long);
  }

  smbt() {
    console.log(this.lat, this.long);
  }
}





















