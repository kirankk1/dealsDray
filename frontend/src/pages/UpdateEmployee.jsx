import { Button, FileInput, Label, Select, TextInput } from "flowbite-react";
import React from "react";

export default function UpdateEmployee() {
  const handleSubmit = async () => {};

  return (
    <div>
      <div className="p-5 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-semibold">Update Employee</h1>
        <form>
          <div className="space-y-6">
            {/* Name */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="name" className="font-semibold">Name</Label>
              <TextInput
                type="text"
                name="name"
                placeholder="Enter employee Name"
                id="name"
                className="w-full"
              />
            </div>
            {/* Email */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="email" className="font-semibold">Email</Label>
              <TextInput
                type="email"
                name="email"
                placeholder="example@gmail.com"
                id="email"
                className="w-full"
              />
            </div>
            {/* Number */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="number" className="font-semibold">Number</Label>
              <TextInput
                type="tel"
                name="number"
                placeholder="9213456789"
                id="number"
                className="w-full"
              />
            </div>
            {/* Designation */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="designation" className="font-semibold">Designation</Label>
              <TextInput
                type="text"
                name="designation"
                placeholder="HR/Manager/Sales"
                id="designation"
                className="w-full"
              />
            </div>
            {/* Gender */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="gender" className="font-semibold">Gender</Label>
              <Select id="gender" className="w-full">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="transgender">Transgender</option>
              </Select>
            </div>
            {/* Course */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="course" className="font-semibold">Course</Label>
              <TextInput
                type="text"
                name="course"
                placeholder="MCA/BCA/BSC"
                id="course"
                className="w-full"
              />
            </div>
            {/* File Upload */}
            <div className="flex flex-row gap-3">
              <FileInput
                type="file"
                accept="image/*"
                className="w-full"
              />
              <Button
                type="button"
                gradientDuoTone="purpleToBlue"
                size="sm"
                outline
                className="w-1/2"
              >
                Upload Image
              </Button>
            </div>
          </div>
          <Button type="submit" className='mt-5 mx-auto w-full' gradientDuoTone="purpleToPink">
          Update Employee
        </Button>
        </form>
      </div>
    </div>
  );
}
