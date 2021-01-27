import { ElementRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';

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
  }

  onFail(): any {
    console.log('fail');
  }

  startRecording(): any {
    this.deleteAudio();
    navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      this.btnRecording = false;
      this.btnStopRecording = true;

      this.tracks = stream.getTracks();
			this.context = new AudioContext();
			let mediaStreamSource = this.context.createMediaStreamSource(stream);
			this.recorder = new window.Recorder(mediaStreamSource);
      this.recorder.record();
      setTimeout(() => {
        this.stopAudio();
      }, 5000)
    })
    .catch(err => {
      console.log('please, accept')
    });
  }
  
  stopAudio(): void {
    URL = window.URL || window.webkitURL;
    this.btnRecording = true;
    this.btnStopRecording = false;
    this.recorder.stop();
    this.tracks.forEach(track => track.stop());
    
    const aud = document.querySelector('audio');
    
    const addAudioToSrc = (blob) => {
      let url = URL.createObjectURL(blob);
      aud.controls = true;
	    aud.src = url;
    }
    
    this.recorder.exportWAV(addAudioToSrc);
  }

  deleteAudio(): void {
    this.audioChunks = [];
    this.inputFile.nativeElement.value = null;
    const aud = document.querySelector('audio');
    aud.src = '';

    this.audSrc.nativeElement.setAttribute('src', '');
    this.audio.nativeElement.load();
  }

  audFileSelected(event:  any): void {
    let files = event.target.files;

    if (files[0].size <= 11775) {
      this.audioChunks.push(files[0]);
  
      const audioBlob = new Blob(this.audioChunks);
      const audioUrlRecording = window.URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrlRecording);
      const audioTag = document.querySelector('audio');
  
      audioTag.src = audio.src;
    } else {
      this.inputFile.nativeElement.value = null;
      alert('El archivo es muy grande');
    }
  }

}
