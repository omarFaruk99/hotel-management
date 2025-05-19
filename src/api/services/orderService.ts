import { apiClient } from "../config/apiConfig";
import {
  OrderResponse,
  OrderStatusResponse,
  OrderTypeResponse,
} from "../types/orderTypes";

/**
 * Service for handling order-related API calls
 */
export const orderService = {
  /**
   * Fetch orders with pagination
   * @param page - Page number (starts from 0)
   * @param size - Number of items per page
   * @returns Promise with order data
   */
  getOrders: async (page: number = 0, size: number = 100) => {
    try {
      const response = await apiClient.get<OrderResponse>(
        `/api/order?page=${page}&size=${size}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  },

  /**
   * Fetch order statuses (Processing, Completed, Cancelled)
   */
  getOrderStatuses: async () => {
    try {
      const response = await apiClient.get<OrderStatusResponse>(
        "/api/order_status?page=0&size=100"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching order statuses:", error);
      throw error;
    }
  },

  /**
   * Fetch order types (Take-Away, Dine-In)
   */
  getOrderTypes: async () => {
    try {
      const response = await apiClient.get<OrderTypeResponse>(
        "/api/order_type?page=0&size=100"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching order types:", error);
      throw error;
    }
  },

  /**
   * Search orders by order number
   * @param orderNumber - Order number to search for (e.g., "ORD-0366")
   */
  searchByOrderNumber: async (orderNumber: string) => {
    try {
      const response = await apiClient.get<OrderResponse>(
        `/api/order?page=0&size=100&filters=[["order_number","like","${orderNumber}"]]`
      );
      return response.data;
    } catch (error) {
      console.error("Error searching orders by number:", error);
      throw error;
    }
  },

  /**
   * Filter orders by type
   * @param orderTypeId - ID of the order type
   */
  filterByOrderType: async (orderTypeId: number) => {
    try {
      const response = await apiClient.get<OrderResponse>(
        `/api/order?page=0&size=100&filters=[["order_type_id",${orderTypeId}]]`
      );
      return response.data;
    } catch (error) {
      console.error("Error filtering orders by type:", error);
      throw error;
    }
  },

  /**
   * Filter orders by status
   * @param orderStatusId - ID of the order status
   */
  filterByOrderStatus: async (orderStatusId: number) => {
    try {
      const response = await apiClient.get<OrderResponse>(
        `/api/order?page=0&size=100&filters=[["order_status_id",${orderStatusId}]]`
      );
      return response.data;
    } catch (error) {
      console.error("Error filtering orders by status:", error);
      throw error;
    }
  },

  /**
   * Filter orders by cooking status
   * @param cookingStatus - 1 = Completed, 2 = Pending
   */
  filterByCookingStatus: async (cookingStatus: 1 | 2) => {
    try {
      const response = await apiClient.get<OrderResponse>(
        `/api/order?page=0&size=100&filters=[["cooking_complete_status",${cookingStatus}]]`
      );
      return response.data;
    } catch (error) {
      console.error("Error filtering orders by cooking status:", error);
      throw error;
    }
  },

  /**
   * Filter orders by payment status
   * @param paymentStatus - 1 = Completed, 2 = Incomplete
   */
  filterByPaymentStatus: async (paymentStatus: 1 | 2) => {
    try {
      const response = await apiClient.get<OrderResponse>(
        `/api/order?page=0&size=100&filters=[["payment_status",${paymentStatus}]]`
      );
      return response.data;
    } catch (error) {
      console.error("Error filtering orders by payment status:", error);
      throw error;
    }
  },
};
