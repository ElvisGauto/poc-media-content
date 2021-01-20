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

  constructor() { }

  ngOnInit() {
    window.URL = window.URL || (window as any).webkitURL; 
    // navigator.getUserMedia  = navigator.getUserMedia || (navigator as any).webkitGetUserMedia || (navigator as any).mozGetUserMedia || (navigator as any).msGetUserMedia;
    // navigator.getUserMedia({ audio: true }, this.startRecording, this.onFail);

    navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      this.mediaRecorder = new MediaRecorder(stream);
    });
  }

  onFail(): any {
    console.log('fail');
  }

  startRecording(): any {
    this.deleteAudio();
    this.btnRecording = false;
    this.btnStopRecording = true;
    this.mediaRecorder.start();
    this.mediaRecorder.addEventListener("dataavailable", event => {
      this.audioChunks = [];
      this.audioChunks.push(event.data);
    });
  }
  
  stopAudio(): void {
    // debugger;
    this.mediaRecorder.stop();
    setTimeout(() => {
      this.addToAudioTag();
    }, 1000)
    this.btnStopRecording = false;
    this.btnRecording = true;
  }
  
  addToAudioTag(): void {
    // debugger;
    const i = this.audioChunks.length;
    console.log(this.audioChunks);
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
