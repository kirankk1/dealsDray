import { Button, Label, Table, TextInput, Select } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function EmployeeList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const { currentUser } = useSelector((state) => state.user);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      if (!currentUser) return;

      try {
        const res = await fetch(`/api/post/getemployees`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${currentUser.token}`, 
            'Content-Type': 'application/json',
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
      if (sortBy === "createdAt") return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === "designation") return a.designation.localeCompare(b.designation);
      return 0;
    });

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
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Image</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Mobile Number</Table.HeadCell>
                <Table.HeadCell>Designation</Table.HeadCell>
                <Table.HeadCell>Gender</Table.HeadCell>
                <Table.HeadCell>Course</Table.HeadCell>
                <Table.HeadCell>Created Date</Table.HeadCell>
                <Table.HeadCell>Edit</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
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
                    <Table.Cell>{new Date(employee.createdAt).toLocaleDateString()}</Table.Cell>
                    <Table.Cell>
                      <Button>Edit</Button>
                    </Table.Cell>
                    <Table.Cell>
                      <Button color="failure">Delete</Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          ) : (
            <p>No Employees Found</p>
          )}
        </div>
      </div>
    </div>
  );
}
