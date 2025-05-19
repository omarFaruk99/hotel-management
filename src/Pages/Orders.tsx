import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { TabPanel, TabView } from "primereact/tabview";

const Orders = () => {
  return (
    <div className="card">
      <TabView>
        <TabPanel header="Pending Orders">
          <DataTable value={[]} loading={true}>
            <Column field="order_number" header="Order Number" />
            <Column field="order_type" header="Order Type" />
            <Column field="cooking_status" header="Cooking Status" />
            <Column field="payment_status" header="Payment Status" />
          </DataTable>
        </TabPanel>
        <TabPanel header="Completed Orders">
          <DataTable value={[]} loading={true}>
            <Column field="order_number" header="Order Number" />
            <Column field="order_type" header="Order Type" />
            <Column field="cooking_status" header="Cooking Status" />
            <Column field="payment_status" header="Payment Status" />
          </DataTable>
        </TabPanel>
        <TabPanel header="Canceled Orders">
          <DataTable value={[]} loading={true}>
            <Column field="order_number" header="Order Number" />
            <Column field="order_type" header="Order Type" />
            <Column field="cooking_status" header="Cooking Status" />
            <Column field="payment_status" header="Payment Status" />
          </DataTable>
        </TabPanel>
      </TabView>
    </div>
  );
};

export default Orders;
