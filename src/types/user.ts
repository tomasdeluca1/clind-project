export interface Subscription {
  isActive: boolean;
  customerId?: string;
  variantId?: string;
  status?: string;
  renewsAt?: string;
  endsAt?: string;
  updatedAt?: Date;
}

export interface User {
  auth0Id: string;
  email: string;
  name?: string;
  picture?: string;
  subscription?: Subscription;
  createdAt: Date;
  updatedAt: Date;
}

export const DEFAULT_USER_SUBSCRIPTION: Subscription = {
  isActive: false,
  updatedAt: new Date(),
};

// Extend Auth0 User type
declare module "@auth0/nextjs-auth0" {
  interface User {
    subscription?: Subscription;
  }
}
