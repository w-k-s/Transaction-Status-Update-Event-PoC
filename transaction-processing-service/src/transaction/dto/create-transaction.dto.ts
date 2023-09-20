export class CreateTransactionDto {
  reference: string;
  currency: string;
  amount: number;
  createDateTime: Date;
}
