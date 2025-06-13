import React from "react";
import BottomNaviation from "@/components/BottomNaviation";
import Header from "@/components/Header";

const page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title={"채팅"} />
      <BottomNaviation />
    </div>
  );
};

export default page;
