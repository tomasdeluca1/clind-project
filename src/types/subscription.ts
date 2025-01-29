export interface Subscription {
  id: string;
  userId: string;
  status: "active" | "inactive" | "past_due" | "cancelled";
  product_id: string;
  currentPeriodEnd: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface LemonSqueezyWebhook {
  meta: {
    event_name: string;
    custom_data: {
      userId: string;
    };
  };
  data: {
    id: string;
    type: string;
    attributes: {
      status: string;
      ends_at: string | null;
      created_at: string;
      updated_at: string;
      test_mode: boolean;
    };
    relationships: {
      store: {
        data: {
          id: string;
        };
      };
      order: {
        data: {
          id: string;
        };
      };
      product: {
        data: {
          id: string;
        };
      };
    };
  };
}
