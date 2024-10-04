import {
  Alert,
  Button,
  FileInput,
  Label,
  Select,
  TextInput,
} from "flowbite-react";
import React, { useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateEmployee() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [publishError, setPublishError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    designation: '',
    gender: '',
    course: '',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await fetch(`/api/post/getemployee/${id}`);
        const data = await res.json();
        if (res.ok) {
          setFormData({
            name: data.post.name,
            email: data.post.email,
            number: data.post.number,
            designation: data.post.designation,
            gender: data.post.gender,
            course: data.post.course,
            imageUrl: data.post.imageUrl || '' // Ensure imageUrl is set correctly
          });
          setLoading(false);
        } else {
          console.error(data.message);
          setLoading(false);
        }
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

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
          setFormData((prevData) => ({ ...prevData, imageUrl: downloadURL }));
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check required fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.number ||
      !formData.designation ||
      !formData.gender ||
      !formData.course ||
      !formData.imageUrl
    ) {
      setPublishError("Please fill in all required fields.");
      return;
    }
    try {
      const res = await fetch(`/api/post/employee/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
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
      setPublishError("Failed to update employee");
    }
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      <div className="p-5 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-semibold">
          Update Employee
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="flex flex-col gap-1">
              <Label htmlFor="name" className="font-semibold">Name</Label>
              <TextInput
                type="text"
                name="name"
                placeholder="Enter employee Name"
                id="name"
                value={formData.name} 
                onChange={(e) =>
                  setFormData((prevData) => ({ ...prevData, name: e.target.value }))
                }
                className="w-full"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="email" className="font-semibold">Email</Label>
              <TextInput
                type="email"
                name="email"
                placeholder="example@gmail.com"
                id="email"
                value={formData.email} 
                onChange={(e) =>
                  setFormData((prevData) => ({ ...prevData, email: e.target.value }))
                }
                className="w-full"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="number" className="font-semibold">Number</Label>
              <TextInput
                type="tel"
                name="number"
                placeholder="9213456789"
                id="number"
                value={formData.number} 
                onChange={(e) =>
                  setFormData((prevData) => ({ ...prevData, number: e.target.value }))
                }
                className="w-full"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="designation" className="font-semibold">Designation</Label>
              <TextInput
                type="text"
                name="designation"
                placeholder="HR/Manager/Sales"
                id="designation"
                value={formData.designation} 
                onChange={(e) =>
                  setFormData((prevData) => ({ ...prevData, designation: e.target.value }))
                }
                className="w-full"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="gender" className="font-semibold">Gender</Label>
              <Select
                id="gender"
                name="gender"
                value={formData.gender} 
                onChange={(e) =>
                  setFormData((prevData) => ({ ...prevData, gender: e.target.value }))
                }
                className="w-full"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="transgender">Transgender</option>
              </Select>
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="course" className="font-semibold">Course</Label>
              <TextInput
                type="text"
                name="course"
                placeholder="MCA/BCA/BSC"
                id="course"
                value={formData.course} 
                onChange={(e) =>
                  setFormData((prevData) => ({ ...prevData, course: e.target.value }))
                }
                className="w-full"
              />
            </div>
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
                alt="Uploaded"
                className="mx-auto w-1/2"
              />
            )}
            {publishError && <Alert color="failure">{publishError}</Alert>}
            <Button type="submit" className="w-full" gradientDuoTone="purpleToBlue">
              Update Employee
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
