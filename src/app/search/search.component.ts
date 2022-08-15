import { Component, OnInit } from '@angular/core';
import { IBook } from '../shared/student';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { combineLatest, map } from 'rxjs';
import {
  Firestore, addDoc, collection, collectionData,
  doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc, getDocs, query, where
} from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  books: IBook[] = [];
  isSearchEmpty: boolean = false;
  searchParams = {
    name: null,
    genre: null,
    author: null,
  };
  
  constructor(private afsCompact:AngularFirestore) { }

ngOnInit(): void {

}

onSearchBook() {
  this.books = [];
  const $name = this.afsCompact
    .collection('books', (ref) =>
      ref.where('name', '==', this.searchParams.name)
    )
    .valueChanges({ idField: 'id' });

  const $genre = this.afsCompact
    .collection('books', (ref) =>
      ref.where('genre', '==', this.searchParams.genre)
    )
    .valueChanges({ idField: 'id' });

  const $author = this.afsCompact
    .collection('books', (ref) =>
      ref.where('author', '>=', this.searchParams.author)
    )
    .valueChanges({ idField: 'id' });

  combineLatest([$name, $genre, $author])
    .pipe(map(([one, two, three]) => [...one, ...two, ...three]))
    .subscribe((response: any) => {
      this.books = response;
      if (response.length > 0) {
      } else {
        this.isSearchEmpty = true;
      }
    });
}

}
