import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { IBook } from '../shared/student';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  book: IBook = { name: '', author: '', genre: '', price: 0 };

  constructor(private crudService:CrudService ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log(form);
    this.crudService.addBook(form.value).then(() => form.reset());
  }

}
