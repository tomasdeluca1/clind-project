export interface LemonSqueezyVariant {
  id: string;
  type: "variants";
  attributes: {
    name: string;
    price: number;
    description?: string;
    status: "pending" | "draft" | "published";
    pay_what_you_want: boolean;
    is_subscription: boolean;
    interval: "day" | "week" | "month" | "year" | null;
    interval_count: number | null;
    trial_duration_days: number | null;
    sort: number;
  };
  relationships: {
    product: {
      data: {
        type: "products";
        id: string;
      };
    };
  };
}
export interface PricingPlan {
  type: "products";
  id: string;
  attributes: {
    store_id: number;
    name: string;
    slug: string;
    description: string;
    status: "pending" | "draft" | "published";
    status_formatted: string;
    thumb_url: string;
    large_thumb_url: string;
    price: number;
    price_formatted: string;
    from_price: number;
    to_price: number;
    pay_what_you_want: boolean;
    buy_now_url: string;
    from_price_formatted: string;
    to_price_formatted: string;
    created_at: string;
    updated_at: string;
    test_mode: boolean;
  };
}

export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface CheckoutOptions {
  embed: boolean;
  media: boolean;
  logo: boolean;
  desc: boolean;
  discount: boolean;
  dark: boolean;
  subscription_preview: boolean;
  button_color: string;
}

export interface ProductOptions {
  name?: string;
  description?: string;
  media?: string[];
  redirect_url: string;
  receipt_button_text: string;
  receipt_link_url: string;
  receipt_thank_you_note: string;
  enabled_variants?: string[];
}

export interface CheckoutData {
  custom: {
    userId: string;
    [key: string]: any;
  };
  email?: string;
  name?: string;
  billing_address?: any[];
  tax_number?: string;
  discount_code?: string;
  variant_quantities?: any[];
}

export interface LemonSqueezyCheckout {
  type: "checkouts";
  attributes: {
    store_id: string;
    variant_id: string;
    custom_price: number | null;
    product_options: ProductOptions;
    checkout_options: CheckoutOptions;
    checkout_data: CheckoutData;
    expires_at: string | null;
    created_at: string;
    updated_at: string;
    test_mode: boolean;
    url: string;
  };
  relationships: {
    store: {
      data: {
        type: "stores";
        id: string;
      };
    };
    variant: {
      data: {
        type: "variants";
        id: string;
      };
    };
  };
}
