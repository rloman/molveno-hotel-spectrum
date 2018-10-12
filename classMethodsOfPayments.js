class MethodsOfPayments {
  constructor(byInvoice, cash, paypal, ideal, creditCard, debitCard) {
    this._byInvoice = byInvoice;
    this._cash = cash;
    this._paypal = paypal;
    this._ideal = ideal;
    this._creditCard = creditCard;
    this._debitCard = debitCard;
  }

  get byInvoice() {
    return this._byInvoice;
  }

  get cash() {
    return this._cash;
  }

  get paypal() {
    return this._paypal;
  }

  get ideal() {
    return this._ideal;
  }

  get creditCard() {
    return this._creditCard;
  }

  get debitCard() {
    return this._debitCard;
  }
}
