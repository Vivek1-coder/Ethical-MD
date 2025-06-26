import React from "react";
import { Circles } from "react-loader-spinner";
export default function Loader() {
  return (
    <div className="h-full w-full grid justify-items-center  justify-center">
      <Circles
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}
