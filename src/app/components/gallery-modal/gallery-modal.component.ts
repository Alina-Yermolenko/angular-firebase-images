import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-gallery-modal',
  templateUrl: './gallery-modal.component.html',
  styleUrls: ['./gallery-modal.component.scss'],
})
export class GalleryModalComponent {
  selectedImage: string = "";
  userId: string = '';
  firestore: Firestore;
  errorText: string = '';
  loading = false;
  
  constructor(
    private afAuth: AngularFireAuth,
    private firestoreService: Firestore,
    public dialogRef: MatDialogRef<GalleryModalComponent>,
    ) {
    this.firestore = firestoreService
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    this.selectedImage = target.value;
  }

  ngOnInit(): void {
    this.afAuth
      .authState.subscribe((user) => {
        if (user) {
          this.userId = user.uid;
        }
      });
  }

  async uploadImage() {
    this.loading = true;
    try {
      await this.preloadImage(this.selectedImage);
      const imgCollection = collection(this.firestore, `users/${this.userId}/images`);
      const createdAt = new Date();
      await addDoc(imgCollection, { imageUrl: this.selectedImage, createdAt });
      this.dialogRef.close(true);
      this.selectedImage = '';
      this.errorText = '';
    } catch (error) {
      console.error('Invalid image URL.');
      this.errorText = 'Invalid image URL.';
    }
    this.loading = false;
  }

  async isValidLink(url: string) {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  preloadImage(src: string) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = resolve;
      image.onerror = reject;
      image.src = src;
    });
  }
}
