import { ChangeDetectorRef, ElementRef, OnChanges, Renderer2, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
declare var MediaRecorder: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnChanges {

  audioChunks:any = [];
  @ViewChild('figAudio', { static: true }) figAudio: ElementRef;
  @ViewChild('audio', { static: true }) audio: ElementRef;
  @ViewChild('audSrc', { static: true }) audSrc: ElementRef;

  recording = false;
  playAudio = false;
  stopRecording = false;

  audioUrlRecording: any;
  audioBlob: any;
  mediaRecorder: any;


  constructor(
    private render: Renderer2,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
    navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      const recording = document.getElementById('recording');
      const stopRecording = document.getElementById('stopRecording');
      const playRecording = document.getElementById('playRecord');

      this.mediaRecorder = new MediaRecorder(stream);
      this.render.listen(recording, 'click',  () => {
        this.startRecording();
      });
      this.render.listen(stopRecording, 'click',  () => {
        this.stopAudio();
      });
      this.render.listen(playRecording, 'click',  () => {
        this.playRecording();
      });
    });
  }

  ngOnChanges() {
  }

  startRecording(): void {
    navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      const recording = document.getElementById('recording');
      const stopRecording = document.getElementById('stopRecording');
      const playRecording = document.getElementById('playRecord');

      this.mediaRecorder = new MediaRecorder(stream);
      this.render.listen(recording, 'click',  () => {
        this.startRecording();
      });
      this.render.listen(stopRecording, 'click',  () => {
        this.stopAudio();
      });
      this.render.listen(playRecording, 'click',  () => {
        this.playRecording();
      });
    });
    // this.audioChunks = [];
    // this.mediaRecorder.start();
    // this.mediaRecorder.addEventListener("dataavailable", event => {
    //   this.audioChunks.push(event.data);
    // });
  }

  playRecording(): void {
    // debugger;
    console.log(this.audioChunks);
    const audioBlob = new Blob(this.audioChunks);
    this.audioUrlRecording = URL.createObjectURL(audioBlob);
    const audio = new Audio(this.audioUrlRecording);
    console.log(audioBlob);
    audio.play();
  }

  stopAudio(): void {
    // debugger;
    this.mediaRecorder.stop();
    console.log(this.audioChunks);
    this.audioBlob = new Blob([this.audioChunks], {
      type: 'audio/ogg'
    });
    console.log(this.audioBlob);
    this.audSrc.nativeElement.setAttribute('src', URL.createObjectURL(this.audioBlob));
    this.audio.nativeElement.load();
  }

  deleteAudio(): void {
    this.audioChunks = [];
    this.audSrc.nativeElement.setAttribute('src', '');
    this.audio.nativeElement.load();
  }

  audFileSelected(event:  any): void {
    let files = event.target.files;
    console.log(files)
    console.log(URL.createObjectURL(files[0]));
    this.audSrc.nativeElement.setAttribute('src', URL.createObjectURL(files[0]));
    this.audio.nativeElement.load();
  }

}
