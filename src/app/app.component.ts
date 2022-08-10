import { Component } from '@angular/core';
import wordList from '../assets/json/words.json';

interface Word {
  id: number;
  ge: string;
  vn: string;
  so: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  show = true;
  see = false;
  no = 1;
  min = 36;
  // max = 96;
  max = 51;
  vnWord = '';
  geWord = '';
  words: Word[] = wordList;
  count = 0;

  // speak
  selectedVoice: SpeechSynthesisVoice | null;
  voices: SpeechSynthesisVoice[];
  selectedRate: number = 1;
  canSpeak: boolean = false;

  constructor() {
    this.selectedVoice = null;
    this.voices = [];
    this.selectedRate = 1;

    this.words = wordList;
    let id = this.getRandomArbitrary(this.min, this.max)
    let word = this.words.find((obj) => {
      return obj.id === id;
    });
    if (word) {
      this.vnWord = word.vn;
      this.geWord = word.ge;
    }
  }

  change() {
    if (!this.show) {
      this.show = true;
    }
    if (!this.see) {
      this.see = true;
    }
  }

  next() {
    this.count = this.count + 1;
    this.no = this.no * -1;
    this.show = this.no > 0;
    this.see = !this.show;
    let id = this.getRandomArbitrary(this.min, this.max)
    let word = this.words.find((obj) => {
      return obj.id === id;
    });
    if (word) {
      this.vnWord = word.vn;
      this.geWord = word.ge;
    }
  }

  getRandomArbitrary(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  copyMessage() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.geWord;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  speakMessage() {
    var utterance = new SpeechSynthesisUtterance(this.geWord);
    utterance.voice = this.selectedVoice;
    utterance.rate = this.selectedRate;
    speechSynthesis.speak(utterance);
  }

  checkAbleSpeak() {
    this.voices = window.speechSynthesis.getVoices();
    if (this.voices.length > 0) {
      this.selectedVoice = (this.voices[137] || null);
      this.canSpeak = true;
    }
  }
}
