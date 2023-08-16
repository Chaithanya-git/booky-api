import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { BookService } from './book.service';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('books')
@ApiTags('Books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({ status: 200, description: 'Return all books' })
  async getAllBooks() {
    return await this.bookService.getAllBooks();
  }

  @Post('buy/:id')
  @ApiOperation({ summary: 'Buy a book' })
  @ApiParam({ name: 'id', description: 'The ID of the book', type: Number })
  @ApiQuery({
    name: 'quantity',
    description: 'The quantity of books to buy',
    type: Number,
  })
  @ApiResponse({ status: 200, description: 'Book successfully bought' })
  async buyBook(@Param('id') id: number, @Query('quantity') quantity: number) {
    return await this.bookService.buyBook(id, quantity);
  }
}
