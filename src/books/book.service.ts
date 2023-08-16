import {
  Injectable,
  NotFoundException,
  NotAcceptableException,
} from '@nestjs/common';
import { BookRepository } from './repo/book.repository';
import { EntityManager, Transaction, TransactionManager } from 'typeorm';
import { Books } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(private bookRepository: BookRepository) {}

  async getAllBooks(): Promise<Books[]> {
    return await this.bookRepository.find();
  }

  async findById(id: number): Promise<Books> {
    const book = await this.bookRepository.findOne(id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  // Transaction Implementation for Buying books
  @Transaction()
  async buyBook(
    id: number,
    quantity: number,
    @TransactionManager() manager?: EntityManager,
  ): Promise<Books> {
    const book = await this.findById(id);
    // Perform additional business logic, e.g., deducting balance, updating user records, etc.

    // Update the book's status and quantity after performing checks
    if (quantity <= 0) {
      throw new NotAcceptableException(`Quantity should be more than 0`);
    }
    if (book.quantity < quantity || book.sold === true) {
      throw new NotAcceptableException(
        `Available Quantity of the Book with ID ${id} is ${book.quantity} `,
      );
    }
    book.quantity = book.quantity - quantity;
    if (book.quantity === 0) {
      book.sold = true;
    }

    // Save the changes within the transaction
    const updatedBook = await manager.save(Books, book);
    console.log(updatedBook);
    return updatedBook;
  }
}
