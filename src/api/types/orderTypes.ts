// =============== API RESPONSE INTERFACES ===============
// These interfaces represent the structure of the responses from different API endpoints

/**
 * Response structure for /api/order_type endpoint
 * Example: GET /api/order_type?page=0&size=100
 * Contains list of order types like "Take-Away", "Dine-In"
 */
export interface OrderTypeResponse {
  status: boolean; // API success status
  data: {
    items: OrderType[]; // Array of order types
    last_page: number; // Total number of pages
    total: number; // Total number of items
    visible: number; // Number of items per page
  };
}

/**
 * Response structure for /api/order_status endpoint
 * Example: GET /api/order_status?page=0&size=100
 * Contains list of possible order statuses like "Processing", "Completed", "Cancelled"
 */
export interface OrderStatusResponse {
  status: boolean;
  data: {
    items: OrderStatus[]; // Array of order statuses
    last_page: number;
    total: number;
    visible: number;
  };
}

/**
 * Response structure for /api/order endpoint
 * Example: GET /api/order?page=0&size=100
 * Contains list of orders with their complete details
 */
export interface OrderResponse {
  status: boolean;
  data: {
    items: Order[]; // Array of orders
    last_page: number;
    total: number;
    visible: number;
  };
}

// =============== BASIC TYPE INTERFACES ===============
// These interfaces define the structure of individual data types

/**
 * Represents an order type (from /api/order_type endpoint)
 * Example: { id: 1, name: "Take-Away", note: "Order atleast equivalent of 400 taka.", min_order: 300 }
 */
export interface OrderType {
  id: number;
  name: string; // Name of the order type (e.g., "Take-Away", "Dine-In")
  note: string; // Additional information about the order type
  min_order: number; // Minimum order amount required
}

/**
 * Represents an order status (from /api/order_status endpoint)
 * Example: { id: 1, name: "Processing" }
 */
export interface OrderStatus {
  id: number;
  name: string; // Status name (e.g., "Processing", "Completed", "Cancelled")
}

/**
 * Represents a user in the system (could be waiter, chef, or customer)
 */
interface User {
  name: string;
  lastlogin: string; // Last login timestamp
}

/**
 * Main Order interface (from /api/order endpoint)
 * Contains all details about an order
 */
export interface Order {
  id: number;
  order_number: string; // Unique order identifier (e.g., "ORD-0331")
  order_type_id: number; // References OrderType.id
  order_type: OrderType; // The full order type object
  note: string; // Order notes
  cancellation_note: string; // Notes if order was cancelled
  cancellation_approval_status: number; // 0 = Not approved, 1 = Approved
  cancelled_by_id: number;
  cancelled_by: User | null; // User who cancelled the order (if cancelled)
  user_id: number;
  waiter: User | null; // Assigned waiter (for dine-in orders)
  chef_id: number;
  chef: User; // Chef assigned to prepare the order

  // Payment and Status
  payment_status: number; // 1 = Completed, 2 = Incomplete
  cooking_complete_status: number; // 1 = Completed, 2 = Pending
  total_cooking_time: number; // Time taken to prepare the order
  total_price: number; // Total price before discounts
  total_discount: number; // Total discount applied
  net_payable: number; // Final amount after discounts
  order_status_id: number; // References OrderStatus.id
  order_status: OrderStatus; // The full order status object

  // Timestamps
  event_time: string; // Order creation time
  end_time: string; // Order completion time

  // Order Items
  food_list: OrderFood[]; // List of food items in the order
  payment_detail: PaymentDetail[]; // Payment information
}

/**
 * Represents a food item in an order
 */
interface OrderFood {
  id: number;
  order_id: number; // References Order.id
  food_item_id: number;
  food_item: {
    id: number;
    name: string; // Name of the food item
    description: string;
    food_category_id: number;
    sold_count: number;
    food_photo_url?: string; // Optional photo URL
    cooking_time: number;
    status: number;
  };
  size_list: OrderFoodSize[]; // Available sizes for this food item
}

/**
 * Represents size options for a food item in an order
 */
interface OrderFoodSize {
  id: number;
  order_contains_food_id: number;
  food_item_contains_size_id: number;
  food_item_contains_size: {
    id: number;
    food_item_id: number;
    size_name: string; // Size name (e.g., "Small", "Large")
    price: number; // Price for this size
    discount_amount: number; // Discount on this size
  };
  quantity: number; // Quantity ordered
  price: number; // Total price for this size
}

/**
 * Represents payment details for an order
 */
interface PaymentDetail {
  id: number;
  order_id: number; // References Order.id
  payment_method_id: number;
  payment_method: {
    id: number;
    name: string; // Payment method name (e.g., "Cash")
    description: string;
  };
  paid_amount: number; // Amount paid by customer
  returned_amount: number; // Change returned to customer
  event_time: string; // Payment timestamp
}
