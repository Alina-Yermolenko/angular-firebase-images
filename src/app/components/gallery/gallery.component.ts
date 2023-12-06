import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { MatDialog } from '@angular/material/dialog';
import { GalleryModalComponent } from '../gallery-modal/gallery-modal.component';
import { Firestore, collection } from '@angular/fire/firestore';
import { doc, deleteDoc, getDocs } from 'firebase/firestore';
import { Router } from '@angular/router';
import { query, orderBy } from "firebase/firestore";

interface Image {
 id: string;
 imageUrl: string;
 createdAt: Date;
}

@Component({
 selector: 'app-gallery',
 templateUrl: './gallery.component.html',
 styleUrls: ['./gallery.component.scss'],
})

export class GalleryComponent implements OnInit {
 userId: string = '';
 userGallery: Image[] = [];
 firestore: Firestore;
 dialogConfig = {
   width: '400px',
   data: { userId: this.userId },
 };

 constructor(
   private firestoreService: Firestore,
   private dialog: MatDialog,
   private router: Router,
 ) {
   this.firestore = firestoreService
 }

 ngOnInit(): void {
   this.checkUserSignInStatus();
   this.openAddImageModalIfRequired();
 }

 checkUserSignInStatus(): void {
   const auth = getAuth();
   onAuthStateChanged(auth, (user) => {
     if (user) {
       this.userId = user.uid;
       this.loadUserGallery();
     }
   });
 }

 openAddImageModalIfRequired(): void {
   if (this.router.url.includes('add-image') && this.dialog.openDialogs.length === 0) {
     this.dialog.open(GalleryModalComponent, this.dialogConfig);
   }
 }

 async loadUserGallery() {
   const imgCollection = collection(this.firestore, `users/${this.userId}/images`);
   const snapshot = await getDocs(query(imgCollection, orderBy('createdAt', "desc")));
   this.userGallery = snapshot.docs.map(doc => {
     const data = doc.data() as Image;
     return { ...data, id: doc.id };
   });
 }

 openAddImageModal() {
   if (this.dialog.openDialogs.length === 0) {
     const dialogRef = this.dialog.open(GalleryModalComponent, this.dialogConfig);
     this.router.navigate(['gallery', 'add-image']).then(() => {
       dialogRef.afterClosed().subscribe((result) => {
         if (result) {
           this.loadUserGallery();
         }
         this.router.navigate(['gallery']);
       });
     });
   }
 }

 async deleteImage(imageId: string) {
   const imageRef = doc(this.firestore, `users/${this.userId}/images/${imageId}`);
   await deleteDoc(imageRef);
   this.loadUserGallery();
 }
}
