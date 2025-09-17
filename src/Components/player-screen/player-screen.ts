import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VIDEO_CONTENT, VideosClass } from '../../models/videos-class';

@Component({
  selector: 'app-player-screen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './player-screen.html',
  styleUrl: './player-screen.scss'
})
export class PlayerScreen implements OnInit {
  video: VideosClass | undefined;
  isPlaying = false;
  poster: string = 'assets/default-thumbnail.jpg';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Check localStorage first
    const savedVideos = localStorage.getItem('videos');
    if (savedVideos) {
      const parsedVideos: VideosClass[] = JSON.parse(savedVideos);
      this.video = parsedVideos.find(v => v.id === id);
    }

    // Fallback to default content
    if (!this.video) {
      this.video = VIDEO_CONTENT.find(v => v.id === id);
    }

    // Generate poster if video has URL
    if (this.video?.url) {
      this.generateThumbnailFromUrl(this.video.url).then(thumbnail => {
        this.poster = thumbnail;
      });
    }
  }

  async generateThumbnailFromUrl(url: string): Promise<string> {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;

      video.src = url;
      video.currentTime = 1;

      video.addEventListener('loadeddata', () => {
        canvas.width = video.videoWidth || 300;
        canvas.height = video.videoHeight || 180;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const thumbnail = canvas.toDataURL('image/png');
        resolve(thumbnail);
        //  Don’t revoke Base64 or local blob URLs here
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(video.src);
        }
      });
    });
  }

  togglePlay(video: HTMLVideoElement) {
    if (this.isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    this.isPlaying = !this.isPlaying; //  keep play state in sync
  }

  downloadVideo() {
    if (!this.video) return;
    const a = document.createElement('a');
    a.href = this.video.url;
    a.download = `${this.video.title || 'video'}.mp4`;
    a.click();
  }

  getPoster(): string {
    return this.poster;
  }
}
