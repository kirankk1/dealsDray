import {
  Alert,
  Button,
  FileInput,
  Label,
  Select,
  TextInput,
} from "flowbite-react";
import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // For making API requests

export default function CreateEmployee() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [publishError, setPublishError] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleUploadImage = async () => {
    if (!file) {
      setImageUploadError("Please select an image");
      return;
    }
    setImageUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageUploadError("Image upload failed");
        setImageUploadProgress(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUploadProgress(null);
          setImageUploadError(null);
          setFormData({ ...formData, imageUrl: downloadURL });
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.number ||
      !formData.designation ||
      !formData.gender ||
      !formData.course || !formData.imageUrl
    ) {
      setPublishError("Please fill in all required fields.");
      return;
    }
    try {
      const res = await fetch(`/api/post/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      if (res.ok) {
        setPublishError(null);
        navigate("/employee-list");
      }
    } catch (error) {
      console.error(error);
      setPublishError("Failed to create employee");
    }
  };

  return (
    <div className="">
      <div className="p-5 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-semibold">
          Create Employee
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Name */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="name" className="font-semibold">
                Name
              </Label>
              <TextInput
                type="text"
                name="name"
                placeholder="Enter employee Name"
                id="name"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full"
              />
            </div>
            {/* Email */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="email" className="font-semibold">
                Email
              </Label>
              <TextInput
                type="email"
                name="email"
                placeholder="example@gmail.com"
                id="email"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full"
              />
            </div>
            {/* Number */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="number" className="font-semibold">
                Number
              </Label>
              <TextInput
                type="tel"
                name="number"
                placeholder="9213456789"
                id="number"
                onChange={(e) =>
                  setFormData({ ...formData, number: e.target.value })
                }
                className="w-full"
              />
            </div>
            {/* Designation */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="designation" className="font-semibold">
                Designation
              </Label>
              <TextInput
                type="text"
                name="designation"
                placeholder="HR/Manager/Sales"
                id="designation"
                onChange={(e) =>
                  setFormData({ ...formData, designation: e.target.value })
                }
                className="w-full"
              />
            </div>
            {/* Gender */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="gender" className="font-semibold">
                Gender
              </Label>
              <Select
                id="gender"
                name="gender"
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
                className="w-full"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="transgender">Transgender</option>
              </Select>
            </div>
            {/* Course */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="course" className="font-semibold">
                Course
              </Label>
              <TextInput
                type="text"
                name="course"
                placeholder="MCA/BCA/BSC"
                id="course"
                onChange={(e) =>
                  setFormData({ ...formData, course: e.target.value })
                }
                className="w-full"
              />
            </div>
            {/* File Upload */}
            <div className="flex gap-3">
              <FileInput
                type="file"
                accept="image/*"
                className="w-2/3"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <Button
                type="button"
                gradientDuoTone="purpleToBlue"
                size="sm"
                outline
                className="w-1/3"
                onClick={handleUploadImage}
                disabled={imageUploadProgress}
              >
                {imageUploadProgress ? (
                  <div className="w-16 h-16">
                    <CircularProgressbar
                      value={imageUploadProgress}
                      text={`${imageUploadProgress || 0}%`}
                    />
                  </div>
                ) : (
                  "Upload Image"
                )}
              </Button>
            </div>
            {imageUploadError && (
              <Alert color="failure">{imageUploadError}</Alert>
            )}
            {formData.imageUrl && (
              <img
                src={formData.imageUrl}
                alt="upload"
                className="w-full h-72 object-cover"
              />
            )}
            {/* Submit */}
            <Button
              type="submit"
              gradientDuoTone="greenToBlue"
              className="w-full"
            >
              Create Employee
            </Button>
            {publishError && (
              <Alert className="mt-5" color="failure">
                {publishError}
              </Alert>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
