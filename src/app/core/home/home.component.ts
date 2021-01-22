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



  recording = false;
  playAudio = false;
  stopRecording = false;
  btnRecording = true;
  btnStopRecording = false;

  audioUrlRecording: any;
  audioBlob: any;
  mediaRecorder: any;
  context: any;
  recorder: any;
  tracks: any;

  constructor() { }

  ngOnInit() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
		navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
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
    this.btnRecording = false;
    this.btnStopRecording = true;
    const onSuccess = (stream) => {
      // this.mediaRecorder = new MediaRecorder(stream);
      this.tracks = stream.getTracks();
			this.context = new AudioContext();
			let mediaStreamSource = this.context.createMediaStreamSource(stream);
			this.recorder = new window.Recorder(mediaStreamSource);
			this.recorder.record();
    }
    const onFail = (err) => {
      console.log(err);
    }
    navigator.getUserMedia({audio: true}, onSuccess, onFail); 
  }
  
  stopAudio(): void {
    this.btnRecording = true;
    this.btnStopRecording = false;

    this.recorder.stop();
    this.tracks.forEach(track => track.stop());
    this.recorder.exportWAV((s) => {
      this.audSrc.nativeElement.setAttribute('src', window.URL.createObjectURL(s));
      this.audio.nativeElement.load();
    });
  }
  
  addToAudioTag(): void {
    // debugger;
    const audioBlob = new Blob(this.audioChunks);
    const audioUrlRecording = window.URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrlRecording);
    this.audSrc.nativeElement.setAttribute('src', audio.src);
    this.audio.nativeElement.load();
  }

  deleteAudio(): void {
    this.audioChunks = [];
    this.inputFile.nativeElement.value = null;
    this.audSrc.nativeElement.setAttribute('src', '');
    this.audio.nativeElement.load();
  }

  audFileSelected(event:  any): void {
    let files = event.target.files;
    this.audioChunks.push(files[0]);
    this.addToAudioTag();
  }

}
