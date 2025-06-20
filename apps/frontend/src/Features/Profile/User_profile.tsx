import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { GoPencil } from "react-icons/go";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Profile_Assignment from "./Profile_Assignment";

const User_profile = () => {
  const [active, setActive] = useState<"edit" | "ai">("ai");
  const [tabValue, setTabValue] = useState("Assignment");

  // ----fake data
  const deuCorentday = [
    {
      title: "Mathematics",
      description: "Linear Equations Practice Set",
      teacher: "Mrs. Johnson",
      dueTime: "11:59 PM",
    },
    {
      title: "Mathematics",
      description: "Linear Equations Practice Set",
      teacher: "Mrs. Johnson",
      dueTime: "11:59 PM",
    },
    {
      title: "Mathematics",
      description: "Linear Equations Practice Set",
      teacher: "Mrs. Johnson",
      dueTime: "11:59 PM",
    },
  ];

  const comingUp = [
    {
      title: "Physics",
      description: "Forces Lab Report",
      teacher: "Dr. Brown",
      dueDate: "Feb 25",
    },
    {
      title: "Physics",
      description: "Forces Lab Report",
      teacher: "Dr. Brown",
      dueDate: "Feb 25",
    },
    {
      title: "Physics",
      description: "Forces Lab Report",
      teacher: "Dr. Brown",
      dueDate: "Feb 25",
    },
  ];
  // ----end fake data

  return (
    <div className=" lg:max-w-[1600px] mx-auto">
      <div className="relative bg-white overflow-hidden">
        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc"
          alt="classroom background"
          className="w-full h-32 md:h-[250px] lg:h-[400px] object-cover"
        />

        {/* Avatar */}
        <div className="absolute left-4 top-20 md:top-48 lg:top-[350px]">
          <div className="relative">
            <Avatar className="w-20 h-20 md:w-24 md:h-24 border-4 border-white">
              <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" />
              <AvatarFallback>SA</AvatarFallback>
            </Avatar>
            {/* Edit Icon */}
            <div className="absolute right-1 bottom-2 bg-[#3B7A9B] p-1 rounded-full w-7 h-7 flex items-center justify-center">
              <GoPencil className="text-white text-xs" />
            </div>
          </div>
        </div>
        {/* User Info */}
        <div className="pt-16 md:pt-20 lg:pt-24 pb-4 pl-4 ">
          <h2 className="text-2xl md:text-3xl font-semibold">Sarah Anderson</h2>
          <p className="text-lg md:text-[20px] md:text-base text-[#3B7A9B] font-medium">
            Student
          </p>
          <p className="text-lg md:text-base text-gray-600 max-w-xl">
            Digital artist & UI designer | Creating beautiful experiences
            through design
          </p>
        </div>
      </div>
      {/* button */}

      <div className="flex justify-center items-center gap-2 mt-6 w-full -ml-0 md:-ml-3 lg:-ml-0">
        <Button
          variant={active === "edit" ? "default" : "outline"}
          onClick={() => setActive("edit")}
          className={
            active === "edit"
              ? "rounded-md px-6 text-[16px] h-10 bg-[#3B7A9B] hover:bg-[#3B7A9B] w-[45%] lg:w-[30%]"
              : "rounded-md px-6 text-[16px] h-10 text-[#3B7A9B] w-[45%] lg:w-[30%]"
          }
        >
          Edit Profile
        </Button>
        <Button
          variant={active === "ai" ? "default" : "outline"}
          onClick={() => setActive("ai")}
          className={
            active === "ai"
              ? "rounded-md px-6 text-md h-10 bg-[#3B7A9B] hover:bg-[#3B7A9B] w-[45%] lg:w-[30%]"
              : "rounded-md px-6 text-md h-10 text-[#3B7A9B] w-[45%] lg:w-[30%]"
          }
        >
          Talk To AI
        </Button>
      </div>

      {/* tabs */}
      <Tabs
        value={tabValue}
        onValueChange={setTabValue}
        className="w-[400px] ml-3 mt-10"
      >
        <TabsList className="bg-white">
          <TabsTrigger
            className="text-[14px] md:text-[16px] mr-11 text-[#114368] data-[state=active]:shadow-none data-[state=active]:border-b-[#114368] data-[state=active]:border-4 data-[state=active]:rounded-none pb-[15px] px-0"
            value="Assignment"
          >
            Assignment
          </TabsTrigger>
          <TabsTrigger
            className="text-[14px] md:text-[16px] text-[#114368] data-[state=active]:shadow-none data-[state=active]:border-b-[#114368] data-[state=active]:border-4 data-[state=active]:rounded-none pb-[15px] px-0"
            value="QR Scan"
          >
            QR Scan
          </TabsTrigger>
        </TabsList>

        {tabValue === "Assignment" && (
          <TabsContent
            value="Assignment"
            className="w-screen -mx-[20px] px-[12px]"
          >
            <Profile_Assignment
              deuCorentday={deuCorentday}
              comingUp={comingUp}
            ></Profile_Assignment>
          </TabsContent>
        )}

        {tabValue === "QR Scan" && (
          <TabsContent value="QR Scan">QR Scan here.</TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default User_profile;
