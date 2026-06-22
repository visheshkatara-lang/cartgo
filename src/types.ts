/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number; // in INR or USD, let's use standard INR represented with symbols or customisable
  originalPrice?: number;
  weight: string;
  image: string;
  description: string;
  shelfLife: string;
  benefits: string[];
  nutrients: { label: string; value: string }[];
  rating: number;
  reviewsCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStage = 'confirmed' | 'packing' | 'out_for_delivery' | 'arriving' | 'delivered';

export interface DeliveryRider {
  name: string;
  phone: string;
  avatar: string;
  rating: number;
  vehicleNumber: string;
}

export interface DeliveryTimelineStep {
  stage: OrderStage;
  title: string;
  description: string;
  durationMs: number;
}
