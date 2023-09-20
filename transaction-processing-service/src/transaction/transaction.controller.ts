import { Controller, Get, Post, Param, Body, NotFoundException } from '@nestjs/common';
import { TransactionDto } from './dto/transaction.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('transaction')
export class TransactionController {
  private transactionMap: Map<string, CreateTransactionDto> = new Map();

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto): TransactionDto {
    const reference = createTransactionDto.reference;
    this.transactionMap.set(reference, createTransactionDto);
    return {
      ...createTransactionDto,
      status: 'pending',
      updateDateTime: new Date(),
    };
  }

  @Get(':reference/status')
  getStatus(@Param('reference') reference: string): TransactionDto {
    const transaction = this.transactionMap.get(reference);
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    const createDateTime = new Date(transaction.createDateTime);
    const currentTime = new Date();

    const timeDiffInSeconds =
      (currentTime.getTime() - createDateTime.getTime()) / 1000;

    const updatedTransaction: TransactionDto = {
      ...transaction,
      status: 'pending',
      updateDateTime: new Date()
    };

    if (timeDiffInSeconds < 60) {
      updatedTransaction.status = 'pending';
    } else if (timeDiffInSeconds >= 60 && timeDiffInSeconds <= 120) {
      // Generate a random number between 0 and 1
      const random = Math.random();
      updatedTransaction.status = random < 0.5 ? 'accepted' : 'rejected';
    } else {
      updatedTransaction.status = 'rejected';
    }

    return updatedTransaction;
  }
}
