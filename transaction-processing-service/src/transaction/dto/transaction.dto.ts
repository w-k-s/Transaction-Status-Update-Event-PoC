export class TransactionDto {
  reference: string;
  currency: string;
  amount: number;
  status: string;
  createDateTime: Date;
  updateDateTime: Date;
}
