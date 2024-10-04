import { Button, Label, Table, TextInput, Select, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";


export default function EmployeeList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const { currentUser } = useSelector((state) => state.user);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false);
  const [employeeIdToDelete, setEmployeeIdToDelete] = useState(null);


  useEffect(() => {
    const fetchEmployees = async () => {
      if (!currentUser) return;

      try {
        const res = await fetch(`/api/post/getemployees`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        if (res.ok) {
          setEmployees(data.posts);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching employees:", error.message);
      }
    };

    fetchEmployees();
  }, [currentUser]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const filteredEmployees = employees
    .filter(
      (emp) =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "email") return a.email.localeCompare(b.email);
      if (sortBy === "createdAt")
        return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === "designation")
        return a.designation.localeCompare(b.designation);
      return 0;
    });

    const handleEdit =(employeeId)=>{
      navigate(`/update-employee/${employeeId}`);
    }

    const handleDelete = async () => {
      if (!employeeIdToDelete) return;
  
      try {
        const res = await fetch(`/api/post/employee/${employeeIdToDelete}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
            "Content-Type": "application/json",
          },
        });
  
        if (res.ok) {
          
          setEmployees(employees.filter((emp) => emp._id !== employeeIdToDelete));
          setShowModal(false); 
          setEmployeeIdToDelete(null);
        } else {
          const data = await res.json();
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error deleting employee:", error.message);
      }
    };
    

  return (
    <div className="flex p-3">
      {/* Left Side - Filters */}
      <div className="w-1/4 pr-4">
        <h2 className="text-lg font-semibold mb-2">Filters</h2>
        <div className="mb-4">
          <Label htmlFor="sortBy" value="Sort By" />
          <Select id="sortBy" onChange={handleSortChange} value={sortBy}>
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="createdAt">Created Date</option>
            <option value="designation">Designation</option>
          </Select>
        </div>
      </div>

      {/* Right Side - Employee List */}
      <div className="w-3/4">
        <div className="flex justify-end gap-4 mb-4">
          <h1 className="my-auto text-gray-800 font-semibold">
            Total Count: {filteredEmployees.length}
          </h1>
          <Link to="/create-employee">
            <Button type="button" gradientDuoTone="purpleToBlue">
              Create Employee
            </Button>
          </Link>
        </div>

        <div className="flex justify-end gap-6 mt-4">
          <label className="whitespace-nowrap my-auto">Search</label>
          <TextInput
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-1/2"
          />
        </div>
        <div className="table-auto md:mx-auto p-3 overflow-x-scroll scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300">
          {currentUser && employees.length > 0 ? (
            <Table hoverable className="shadow-md ">
              <Table.Head>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Image</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Mobile Number</Table.HeadCell>
                <Table.HeadCell>Designation</Table.HeadCell>
                <Table.HeadCell>Gender</Table.HeadCell>
                <Table.HeadCell>Course</Table.HeadCell>
                <Table.HeadCell>Created Date</Table.HeadCell>
                <Table.HeadCell>Action</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {filteredEmployees.map((employee) => (
                  <Table.Row key={employee._id}>
                    <Table.Cell>{employee.name}</Table.Cell>
                    <Table.Cell>
                      <img
                        src={employee.imageUrl}
                        className="w-20 h-10 object-cover bg-gray-500"
                      />
                    </Table.Cell>
                    <Table.Cell>{employee.email}</Table.Cell>
                    <Table.Cell>{employee.number}</Table.Cell>
                    <Table.Cell>{employee.designation}</Table.Cell>
                    <Table.Cell>{employee.gender}</Table.Cell>
                    <Table.Cell>{employee.course}</Table.Cell>
                    <Table.Cell>
                      {new Date(employee.createdAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell className="flex gap-6">
                      <span className="font-medium text-blue-500 hover:underline cursor-pointer" onClick={()=> handleEdit(employee._id)} >Edit</span>
                      <span
                      onClick={() => {
                        setShowModal(true);
                        setEmployeeIdToDelete(employee._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          ) : (
            <p>No Employees Found</p>
          )}
        </div>
        <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete your post?
            </h3>
            <div className="flex justify-center gap-4 ">
              <Button color="failure" onClick={handleDelete} >
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      </div>
    </div>
  );
}
