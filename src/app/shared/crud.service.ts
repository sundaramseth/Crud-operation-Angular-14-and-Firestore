import { Injectable } from '@angular/core';
import { IBook } from './student';
import {
  Firestore, addDoc, collection, collectionData,
  doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private firestore: Firestore) { }

  //Add data to firestore
  addBook(book: IBook) {
    const bookRef = collection(this.firestore, 'books'); 
    return addDoc(bookRef, book);
  }
 //Display data from firestore
  getBooks(): Observable<IBook[]> {
    const booksRef = collection(this.firestore, 'books');
    return collectionData(booksRef, { idField: 'id' }) as Observable<IBook[]>;
  }

//Delete Book from firestore
delbook(book: IBook){
  const bookDocRef = doc(this.firestore, `books/${book.id}`);
  return deleteDoc(bookDocRef);
}

// Get book id from firestore
getBookByID(id: string) {
  const bookRef = doc(this.firestore, `books/${id}`);
  return docData(bookRef, { idField: 'id' }) as Observable<IBook>;
}

//Update data to firestore
updateBook(book: IBook) {
  const bookDocRef = doc(this.firestore, `books/${book.id}`);
  return setDoc(bookDocRef, book);
}

modifyBookPrice(book: IBook, amount: number) {
  const bookDocRef = doc(this.firestore, `books/${book.id}`);
  return updateDoc(bookDocRef, { price: amount });
}

}
