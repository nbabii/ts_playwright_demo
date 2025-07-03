export type UserInfo = {
      email: string
      password: string,
      question: string,
      answer: string,
}

export type UserAddress = {
      country: string;
      name: string;
      mobile: string;
      zip: string;
      address: string;
      city: string;
      state: string;
}

export type PaymentCard = {
      name: string;
      number: string;
      expirationMonth: string;
      expirationYear: string;
}