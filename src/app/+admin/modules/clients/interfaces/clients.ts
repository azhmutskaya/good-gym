export interface Clients {
  id: string;
  isActive: boolean;
  gender: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  email: string;
  phones: [string];
  address: string;
  subscriptionId: string;
  subscriptionName: string;
  expirationDate: Date;
  balance: number;
}

export interface ClientsApi {
  Id: string;
  IsActive: boolean;
  Gender: string;
  FirstName: string;
  LastName: string;
  DateOfBirth: string;
  Email: string;
  Phones: [string];
  Address: string;
  SubscriptionId: string;
  SubscriptionName: string;
  ExpirationDate: string;
  Balance: string;
}
