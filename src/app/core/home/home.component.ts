import { ChangeDetectorRef, ElementRef, OnChanges, Renderer2, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
declare var MediaRecorder: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  audioChunks:any = [];
  @ViewChild('audio', { static: true }) audio: ElementRef;
  @ViewChild('inputFile', { static: true }) inputFile: ElementRef;
  @ViewChild('audSrc', { static: true }) audSrc: ElementRef;
  URL = window.URL || (window as any).webkitURL;

  input: any;
  rec: any;
  gumStream: any;

  recording = false;
  playAudio = false;
  stopRecording = false;
  btnRecording = true;
  btnStopRecording = false;

  audioUrlRecording: any;
  audioBlob: any;
  mediaRecorder: any;

  constructor() { }

  ngOnInit() {
    // window.URL = window.URL || (window as any).webkitURL; 
    // navigator.getUserMedia  = navigator.getUserMedia || (navigator as any).webkitGetUserMedia || (navigator as any).mozGetUserMedia || (navigator as any).msGetUserMedia;
    // navigator.getUserMedia({ audio: true }, this.startRecording, this.onFail);

    // navigator.mediaDevices.getUserMedia({ audio: true })
    // .then(stream => {
    //   this.mediaRecorder = new MediaRecorder(stream);
    // });
  }

  onFail(): any {
    console.log('fail');
  }

  startRecording(): any {
    navigator.mediaDevices.getUserMedia({ audio: true, video:false })
    .then((stream) => {
      console.log(stream);
      let AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext;
      let audioContext = new AudioContext();
      this.input = audioContext.createMediaStreamSource(stream);

      this.gumStream = stream;

      this.rec = new (window as any).Recorder(this.input, { numChannels: 1 })
      this.rec.record();
    })
    .catch((err) => {
      alert(err);
    });
  }
  
  stopAudio(): void {
    console.log(this.rec);
    this.rec.stop();
    this.rec.exportWAV((data) => {
      const audio = document.getElementById('audio');
      audio.setAttribute('src', this.URL.createObjectURL(data));
    });
  }
  
  // addToAudioTag(blob): void {
  //   let url = URL.createObjectURL(blob);
  //   const audio = document.getElementById('audio');
  //   audio.setAttribute('src', url);
  // }

  deleteAudio(): void {
    this.audioChunks = [];
    this.inputFile.nativeElement.value = null;
    this.audSrc.nativeElement.setAttribute('src', '');
    this.audio.nativeElement.load();
  }

  // audFileSelected(event:  any): void {
  //   let files = event.target.files;
  //   this.audioChunks.push(files[0]);
  //   this.addToAudioTag();
  // }

}
