"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { MdOutlineLinkedCamera } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phoneOrId: "",
    role: "",
    className: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  type FormData = {
    fullName: string;
    phoneOrId: string;
    role: string;
    className: string;
  };

  const handleChange = <T extends keyof FormData>(field: T, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" })); // clear error when typing
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Partial<FormData> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.phoneOrId.trim())
      newErrors.phoneOrId = "Phone or ID is required";
    if (!formData.role.trim()) newErrors.role = "Role is required";
    if (!formData.className.trim()) newErrors.className = "Class is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("✅ Form submitted:", formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg mx-auto p-6 space-y-6 bg-white shadow-md rounded-2xl"
      >
        <div>
          <div className="flex flex-col justify-center items-center relative">
            <Link to={"/"} className="w-[16px] h-[16px] absolute top-5 left-0">
              <IoArrowBack />
            </Link>
            <h3 className="text-[24px] font-bold mb-[32px] mt-[66px]">
              Create Account
            </h3>

            <button className="relative ">
              <img
                className="w-20 h-20 rounded-full bg-[#4893bb] hover:bg-[#33627b]"
                src="https://img.icons8.com/?size=96&id=DnvVED73VLBQ&format=png"
                alt="profile"
              />
              <p className="bg-[#114368] w-8 h-8 rounded-full flex items-center justify-center text-white absolute right-0 bottom-0">
                <MdOutlineLinkedCamera />
              </p>
            </button>
            <p className="text-[#53433F] font-medium text-[14px]">
              Add Profile Photo
            </p>
          </div>
        </div>
        {/* full name */}
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName}</p>
          )}
        </div>
        {/* phone or id */}
        <div className="space-y-2">
          <Label htmlFor="phoneOrId">Phone or ID</Label>
          <Input
            id="phoneOrId"
            placeholder="Enter phone number or ID"
            value={formData.phoneOrId}
            onChange={(e) => handleChange("phoneOrId", e.target.value)}
          />
          {errors.phoneOrId && (
            <p className="text-red-500 text-sm">{errors.phoneOrId}</p>
          )}
        </div>

        {/* Class */}
        <div className="w-full space-y-2">
          <Label htmlFor="className">Class</Label>
          <Select onValueChange={(value) => handleChange("className", value)}>
            <SelectTrigger className="w-full" id="className">
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A">A</SelectItem>
              <SelectItem value="B">B</SelectItem>
              <SelectItem value="C">C</SelectItem>
            </SelectContent>
          </Select>
          {errors.className && (
            <p className="text-red-500 text-sm">{errors.className}</p>
          )}
        </div>

        {/* Role */}
        <div className="w-full space-y-2">
          <Label htmlFor="role">Role</Label>
          <Select onValueChange={(value) => handleChange("role", value)}>
            <SelectTrigger className="w-full" id="role">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A">A</SelectItem>
              <SelectItem value="B">B</SelectItem>
              <SelectItem value="C">C</SelectItem>
            </SelectContent>
          </Select>
          {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
        </div>

        <Button
          type="submit"
          className="w-full bg-[#114368] hover:bg-[#1d3344]"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
