import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CrudService } from '../shared/crud.service';
import { IBook } from '../shared/student';


@Component({
  selector: 'app-editbook',
  templateUrl: './editbook.component.html',
  styleUrls: ['./editbook.component.scss']
})
export class EditbookComponent implements OnInit {

  @Input() id!: string;
  book!: IBook;

  constructor(private crudService:CrudService, public activeModal:NgbActiveModal) { }

  ngOnInit() {
    if (this.id)
      this.crudService.getBookByID(this.id).subscribe(res => {
        this.book = res;
      });
  }

  onUpdate() {
    this.crudService.updateBook(this.book).then(() => {
      this.activeModal.close();
      console.log('Data add successfully');
    })
  }
  setPrice(book: IBook, price: number) {
    this.crudService.modifyBookPrice(book, price)
  }

}
