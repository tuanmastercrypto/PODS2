'use client';
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "@/store/Store"; // Import store và persistor

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      {/* Bọc ứng dụng bằng PersistGate để đảm bảo dữ liệu được khôi phục trước khi render */}
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default StoreProvider;
