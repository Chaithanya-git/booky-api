import { EntityRepository, Repository } from 'typeorm';
import { Books } from '../entities/book.entity';

@EntityRepository(Books)
export class BookRepository extends Repository<Books> {}
