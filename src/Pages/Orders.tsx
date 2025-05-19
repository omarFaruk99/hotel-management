import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { TabPanel, TabView } from "primereact/tabview";
import { Tag } from "primereact/tag";
import React, { useEffect, useState } from "react";
import { orderService } from "../api/services/orderService";
import { Order } from "../api/types/orderTypes";

const Orders: React.FC = () => {
  // State management
  const [pendingOrders, setPendingOrders] = useState<Order[]>([]);
  const [completedOrders, setCompletedOrders] = useState<Order[]>([]);
  const [canceledOrders, setCanceledOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedRows, setExpandedRows] = useState<any>(null);
  const [activeTab, setActiveTab] = useState(0);

  // Filter states for each tab separately
  const [orderNumberFilter, setOrderNumberFilter] = useState("");
  const [orderTypeFilter, setOrderTypeFilter] = useState<number | null>(null);
  const [cookingStatusFilter, setCookingStatusFilter] = useState<1 | 2 | null>(
    null
  );
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<1 | 2 | null>(
    null
  );

  // Fetch orders for each status tab
  const fetchOrdersByStatus = async (statusId: number) => {
    setLoading(true);
    try {
      let response;

      // Apply filters within the context of the order status
      if (orderNumberFilter) {
        // First get filtered by order number
        response = await orderService.searchByOrderNumber(orderNumberFilter);
        // Then filter by status (client-side since API doesn't support multiple filters)
        response.data.items = response.data.items.filter(
          (item) => item.order_status_id === statusId
        );
      } else if (orderTypeFilter !== null) {
        // First get filtered by order type
        response = await orderService.filterByOrderType(orderTypeFilter);
        // Then filter by status (client-side)
        response.data.items = response.data.items.filter(
          (item) => item.order_status_id === statusId
        );
      } else if (cookingStatusFilter !== null) {
        // First get filtered by cooking status
        response = await orderService.filterByCookingStatus(
          cookingStatusFilter
        );
        // Then filter by status (client-side)
        response.data.items = response.data.items.filter(
          (item) => item.order_status_id === statusId
        );
      } else if (paymentStatusFilter !== null) {
        // First get filtered by payment status
        response = await orderService.filterByPaymentStatus(
          paymentStatusFilter
        );
        // Then filter by status (client-side)
        response.data.items = response.data.items.filter(
          (item) => item.order_status_id === statusId
        );
      } else {
        // No additional filters, get orders by status directly
        response = await orderService.filterByOrderStatus(statusId);
      }

      return response.data.items;
    } catch (error) {
      console.error(`Error fetching orders with status ${statusId}:`, error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Load data for all tabs
  const loadAllTabs = async () => {
    setLoading(true);
    try {
      const pending = await fetchOrdersByStatus(1);
      const completed = await fetchOrdersByStatus(2);
      const canceled = await fetchOrdersByStatus(3);

      setPendingOrders(pending);
      setCompletedOrders(completed);
      setCanceledOrders(canceled);
    } catch (error) {
      console.error("Error loading orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial data load
  useEffect(() => {
    loadAllTabs();
  }, []);

  // Reload when filters change
  useEffect(() => {
    loadAllTabs();
  }, [
    orderNumberFilter,
    orderTypeFilter,
    cookingStatusFilter,
    paymentStatusFilter,
  ]);

  // Clear all filters
  const clearFilters = () => {
    setOrderNumberFilter("");
    setOrderTypeFilter(null);
    setCookingStatusFilter(null);
    setPaymentStatusFilter(null);
  };

  // Order number filter template
  const orderNumberFilterTemplate = () => {
    return (
      <InputText
        value={orderNumberFilter}
        onChange={(e) => {
          // Clear other filters
          setOrderTypeFilter(null);
          setCookingStatusFilter(null);
          setPaymentStatusFilter(null);
          // Set this filter
          setOrderNumberFilter(e.target.value);
        }}
        placeholder="Search by order number"
        className="p-column-filter"
      />
    );
  };

  // Order type filter template
  const orderTypeFilterTemplate = () => {
    const orderTypeOptions = [
      { label: "All", value: null },
      { label: "Dine In", value: 1 },
      { label: "Take Away", value: 2 },
    ];

    return (
      <Dropdown
        value={orderTypeFilter}
        options={orderTypeOptions}
        onChange={(e) => {
          // Clear other filters
          setOrderNumberFilter("");
          setCookingStatusFilter(null);
          setPaymentStatusFilter(null);
          // Set this filter
          setOrderTypeFilter(e.value);
        }}
        placeholder="Select order type"
        className="p-column-filter"
      />
    );
  };

  // Cooking status filter template
  const cookingStatusFilterTemplate = () => {
    const cookingStatusOptions = [
      { label: "All", value: null },
      { label: "Completed", value: 1 },
      { label: "Pending", value: 2 },
    ];

    return (
      <Dropdown
        value={cookingStatusFilter}
        options={cookingStatusOptions}
        onChange={(e) => {
          // Clear other filters
          setOrderNumberFilter("");
          setOrderTypeFilter(null);
          setPaymentStatusFilter(null);
          // Set this filter
          setCookingStatusFilter(e.value);
        }}
        placeholder="Select cooking status"
        className="p-column-filter"
      />
    );
  };

  // Payment status filter template
  const paymentStatusFilterTemplate = () => {
    const paymentStatusOptions = [
      { label: "All", value: null },
      { label: "Completed", value: 1 },
      { label: "Pending", value: 2 },
    ];

    return (
      <Dropdown
        value={paymentStatusFilter}
        options={paymentStatusOptions}
        onChange={(e) => {
          // Clear other filters
          setOrderNumberFilter("");
          setOrderTypeFilter(null);
          setCookingStatusFilter(null);
          // Set this filter
          setPaymentStatusFilter(e.value);
        }}
        placeholder="Select payment status"
        className="p-column-filter"
      />
    );
  };

  // Order type body template
  const orderTypeBodyTemplate = (rowData: Order) => {
    return rowData.order_type_id === 1 ? "Dine In" : "Take Away";
  };

  // Cooking status body template
  const cookingStatusBodyTemplate = (rowData: Order) => {
    return rowData.cooking_complete_status === 1 ? (
      <Tag severity="success" value="Completed" />
    ) : (
      <Tag severity="warning" value="Pending" />
    );
  };

  // Payment status body template
  const paymentStatusBodyTemplate = (rowData: Order) => {
    return rowData.payment_status === 1 ? (
      <Tag severity="success" value="Completed" />
    ) : (
      <Tag severity="warning" value="Pending" />
    );
  };

  // Expanded row template to show details
  const rowExpansionTemplate = (data: Order) => {
    return (
      <div className="p-3">
        <h5>Order Details</h5>
        <div className="grid">
          <div className="col-12 md:col-6">
            <div className="p-2">
              <div className="font-bold mb-2">Order Information</div>
              <div className="mb-2">
                <span className="font-semibold mr-2">Order Number:</span>
                <span>{data.order_number}</span>
              </div>
              <div className="mb-2">
                <span className="font-semibold mr-2">Order Date:</span>
                <span>{new Date(data.event_time).toLocaleString()}</span>
              </div>
              {data.end_time && (
                <div className="mb-2">
                  <span className="font-semibold mr-2">Completion Time:</span>
                  <span>{new Date(data.end_time).toLocaleString()}</span>
                </div>
              )}
              <div className="mb-2">
                <span className="font-semibold mr-2">Total Price:</span>
                <span>${data.total_price}</span>
              </div>
              <div className="mb-2">
                <span className="font-semibold mr-2">Discount:</span>
                <span>${data.total_discount}</span>
              </div>
              <div className="mb-2">
                <span className="font-semibold mr-2">Net Payable:</span>
                <span>${data.net_payable}</span>
              </div>
            </div>
          </div>
          <div className="col-12 md:col-6">
            <div className="p-2">
              <div className="font-bold mb-2">Food Items</div>
              {data.food_list.map((foodItem) => (
                <div
                  key={foodItem.id}
                  className="mb-3 p-2 surface-200 border-round"
                >
                  <div className="font-semibold mb-2">
                    {foodItem.food_item.name}
                  </div>
                  <ul className="list-none p-0 m-0">
                    {foodItem.size_list.map((size) => (
                      <li
                        key={size.id}
                        className="flex justify-content-between mb-2"
                      >
                        <span>
                          {size.food_item_contains_size.size_name} x{" "}
                          {size.quantity}
                        </span>
                        <span className="font-medium">${size.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Handle tab change
  const handleTabChange = (e: any) => {
    setActiveTab(e.index);
  };

  // Table component for each tab
  const renderOrderTable = (orders: Order[]) => {
    return (
      <DataTable
        value={orders}
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
        rowExpansionTemplate={rowExpansionTemplate}
        dataKey="id"
        loading={loading}
        className="p-datatable-gridlines"
        showGridlines
        rowHover
        sortMode="single"
        removableSort
      >
        <Column expander style={{ width: "3rem" }} />
        <Column
          field="order_number"
          header="Order Number"
          filter
          filterElement={orderNumberFilterTemplate}
          showFilterMenu={false}
          sortable
        />
        <Column
          field="order_type_id"
          header="Order Type"
          body={orderTypeBodyTemplate}
          filter
          filterElement={orderTypeFilterTemplate}
          showFilterMenu={false}
          sortable
        />
        <Column
          field="cooking_complete_status"
          header="Cooking Status"
          body={cookingStatusBodyTemplate}
          filter
          filterElement={cookingStatusFilterTemplate}
          showFilterMenu={false}
          sortable
        />
        <Column
          field="payment_status"
          header="Payment Status"
          body={paymentStatusBodyTemplate}
          filter
          filterElement={paymentStatusFilterTemplate}
          showFilterMenu={false}
          sortable
        />
      </DataTable>
    );
  };

  return (
    <div className="card">
      <TabView activeIndex={activeTab} onTabChange={handleTabChange}>
        <TabPanel header={`Pending Orders (${pendingOrders.length})`}>
          {renderOrderTable(pendingOrders)}
        </TabPanel>
        <TabPanel header={`Completed Orders (${completedOrders.length})`}>
          {renderOrderTable(completedOrders)}
        </TabPanel>
        <TabPanel header={`Canceled Orders (${canceledOrders.length})`}>
          {renderOrderTable(canceledOrders)}
        </TabPanel>
      </TabView>
    </div>
  );
};

export default Orders;
