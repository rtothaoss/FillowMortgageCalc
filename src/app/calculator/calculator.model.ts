//this will hold the model for all the fields needed for the calc service

export class Calculator {
  constructor(
    public homePrice: number,
    public downPayment: number,
    public downPaymentPercentage: number,
    public loanProgram: number,
    public interestRate: number,
    public propertyTax: number,
    public propertyTaxRate: number,
    public homeInsurance: number,
    public hoaDues: number,
    public pmi: string,
    public taxesAndInsurance: string
  ) {}
}
