import { Progress } from "antd";
import React from "react";

const StockOutProgressBar = ({ quantity }) => {
  return (
    <>
      {quantity <= 10 && quantity > 0 ? (
        <>
          <h4>
            Hurry! Only{" "}
            <span className="font-semibold text-[#ff4626]">{quantity}</span>{" "}
            units left in stock!
          </h4>
          <Progress
            className="max-w-[300px] "
            status="active"
            strokeColor={{
              "0%": "#ff4626",
              "25%": "#f88333",
              "50%": "#f2aa3a",
              "75%": "#ecd543",
              "100%": "#ecd543",
            }}
            showInfo={false}
            percent={quantity * 10}
          />
        </>
      ) : (
        <div className="text-blue-gray-700 font-medium font-kanit text-sm">
          Avilable QTY. {quantity}
        </div>
      )}
    </>
  );
};

export default StockOutProgressBar;
