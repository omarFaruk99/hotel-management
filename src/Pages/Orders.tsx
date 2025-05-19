import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { TabPanel, TabView } from "primereact/tabview";
import { useEffect, useState } from "react";
import { orderService } from "../api/services/orderService";
import { Order } from "../api/types/orderTypes";

const Orders = () => {
  // Step 1.1: Add state to store orders
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Step 1.2: Add function to fetch orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderService.getOrders();
      setOrders(response.data.items);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // Step 1.3: Call fetchOrders when component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  // Step 1.4: Filter orders by status
  const pendingOrders = orders.filter((order) => order.order_status.id === 1);
  const completedOrders = orders.filter((order) => order.order_status.id === 2);
  const canceledOrders = orders.filter((order) => order.order_status.id === 3);

  return (
    <div className="card">
      <TabView>
        <TabPanel header={`Pending Orders (${pendingOrders.length})`}>
          <DataTable value={pendingOrders} loading={loading}>
            <Column field="order_number" header="Order Number" />
            <Column field="order_type.name" header="Order Type" />
            <Column field="cooking_complete_status" header="Cooking Status" />
            <Column field="payment_status" header="Payment Status" />
          </DataTable>
        </TabPanel>
        <TabPanel header={`Completed Orders (${completedOrders.length})`}>
          <DataTable value={completedOrders} loading={loading}>
            <Column field="order_number" header="Order Number" />
            <Column field="order_type.name" header="Order Type" />
            <Column field="cooking_complete_status" header="Cooking Status" />
            <Column field="payment_status" header="Payment Status" />
          </DataTable>
        </TabPanel>
        <TabPanel header={`Canceled Orders (${canceledOrders.length})`}>
          <DataTable value={canceledOrders} loading={loading}>
            <Column field="order_number" header="Order Number" />
            <Column field="order_type.name" header="Order Type" />
            <Column field="cooking_complete_status" header="Cooking Status" />
            <Column field="payment_status" header="Payment Status" />
          </DataTable>
        </TabPanel>
      </TabView>
    </div>
  );
};

export default Orders;
