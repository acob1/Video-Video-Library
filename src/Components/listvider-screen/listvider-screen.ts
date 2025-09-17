import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VIDEO_CONTENT, VideosClass } from '../../models/videos-class';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-listvider-screen',
  standalone: true,
  imports: [CommonModule, FormsModule, QRCodeComponent],
  templateUrl: './listvider-screen.html',
  styleUrl: './listvider-screen.scss'
})
export class ListviderScreen implements OnInit {
  showUploadForm = false;
  showQRCode = false;
  qrCodeData: string = '';
  selectedVideoFile: File | null = null;
  newVideo: Partial<VideosClass> = {};
  videos: VideosClass[] = [];

  //  Selection mode
  selectionMode = false;
  selectedIds: Set<number> = new Set<number>();

  constructor(private router: Router) {}

  ngOnInit(): void {
    const savedVideos = localStorage.getItem('videos');
    if (savedVideos) {
      this.videos = JSON.parse(savedVideos);
    } else {
      this.videos = [...VIDEO_CONTENT];
    }
  }

  openVideo(videoId: number) {
    if (this.selectionMode) {
      this.toggleSelect(videoId);
    } else {
      this.router.navigate(['/videos', videoId]);
    }
  }

  //  Toggle selection mode
  toggleSelectionMode() {
    this.selectionMode = !this.selectionMode;
    if (!this.selectionMode) {
      this.selectedIds.clear();
    }
  }

  toggleSelect(videoId: number) {
    if (this.selectedIds.has(videoId)) {
      this.selectedIds.delete(videoId);
    } else {
      this.selectedIds.add(videoId);
    }
  }

  deleteSelected() {
    if (this.selectedIds.size === 0) return;

    this.videos = this.videos.filter(v => !this.selectedIds.has(v.id));
    localStorage.setItem('videos', JSON.stringify(this.videos));

    this.selectedIds.clear();
    this.selectionMode = false;

    alert('Selected videos deleted successfully!');
  }

  // --- existing upload methods remain unchanged ---
  openUploadForm() { this.showUploadForm = true; }
  closeUploadForm() { this.showUploadForm = false; }

  async saveVideo() {
    let thumbnail = 'https://via.placeholder.com/300x180';
    let videoUrl = this.newVideo.url ?? '';

    if (this.selectedVideoFile) {
      thumbnail = await this.generateThumbnail(this.selectedVideoFile);
    }

    const newId = this.videos.length + 1;
    const videoLink = `${window.location.origin}/videos/${newId}`;

    const newEntry: VideosClass = {
      id: newId,
      title: this.newVideo.title ?? '',
      description: this.newVideo.description ?? '',
      type: this.newVideo.type ?? '',
      meta: this.newVideo.meta ?? '',
      distributed: this.newVideo.distributed ?? '',
      url: videoUrl,
      thumbnail,
      qrcode: videoLink
    };

    this.videos.push(newEntry);
    localStorage.setItem('videos', JSON.stringify(this.videos));

    this.qrCodeData = videoLink;
    this.showQRCode = true;

    this.closeUploadForm();
    this.newVideo = {};
    this.selectedVideoFile = null;
  }

  generateThumbnail(file: File): Promise<string> {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      video.src = URL.createObjectURL(file);
      video.currentTime = 1;
      video.addEventListener('loadeddata', () => {
        canvas.width = 300;
        canvas.height = 180;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const thumbnail = canvas.toDataURL('image/png');
        resolve(thumbnail);
        URL.revokeObjectURL(video.src);
      });
    });
  }

  onVideoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedVideoFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.newVideo.url = reader.result as string;
      };
      reader.readAsDataURL(file);

      const videoUrl = URL.createObjectURL(file);
      const video = document.createElement('video');
      video.src = videoUrl;
      video.currentTime = 1;
      video.onloadeddata = () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
        this.newVideo.thumbnail = canvas.toDataURL('image/png');
      };
    }
  }

  async shareVideo() {
    if (navigator.share) {
      await navigator.share({
        title: 'Watch this video',
        text: 'Scan or click to watch this video',
        url: this.qrCodeData
      });
    } else {
      alert('Sharing not supported. Copy this link:\n' + this.qrCodeData);
    }
  }
}
