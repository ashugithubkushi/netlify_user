import React, { useEffect, useState } from "react";
import "./bookings.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import axios from "axios";
import { Box } from "@mui/material";
import Navbar from "../../Navbar";
import Sidebar from "../../Sidebar";

const Bookings = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    selectedVehicle: "",
    selectedDate: null,
    fromTime: "",
    toTime: "",
    vehicleNumber: "",
    villaNumber: "",
    bookedBy: ""
  });
  const [vehicleNames, setVehicleNames] = useState([]);
  const [vehicleNumbers, setVehicleNumbers] = useState([]);

  const [bookedByOptions, setBookedByOptions] = useState([]);

  //delete
  const [selectedRow, setSelectedRow] = useState(null);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);

  const toggleConfirmDeleteModal = () => setConfirmDeleteModal(!confirmDeleteModal);
  const handleDelete = (slot) => {
    setSelectedRow(slot);
    toggleConfirmDeleteModal();
  };



  const confirmDelete = () => {
    setData(data.filter(slot => slot !== selectedRow));
  
    toggleConfirmDeleteModal();
  
    axios.delete(`http://localhost:3000/deleteslots/${selectedRow._id}`)
      .then(res => {
        console.log("Slot deleted successfully:", res.data);
      })
      .catch(err => {
        console.error("Error deleting slot:", err);
      });
  };




  const toggleModal = () => setModal(!modal);

  useEffect(() => {
    axios
      .get("http://localhost:3000/getslots")
      .then((res) => setData(res.data.data))
      .catch((error) => console.error("Error fetching slots:", error));

  //   axios
  //     .get("http://localhost:3000/vehicles")
  //     .then((res) => {
  //       const vehicles = res.data;
  //       const names = vehicles.map(vehicle => vehicle.vehicleName);
  //       const numbers = vehicles.map(vehicle => vehicle.vehicleNum);
  //       setVehicleNames(names);
  //       setVehicleNumbers(numbers);
  //     })
  //     .catch((error) => console.error("Error fetching vehicles:", error));
  // }, []);

    axios
      .get("http://localhost:3000/vehicles")
      .then((res) => {
        const vehicles = res.data;
        const names = vehicles.map(vehicle => vehicle.vehicleName);
        const uniqueNames = [...new Set(names)]; // Remove duplicates
        const numbers = vehicles.map(vehicle => vehicle.vehicleNum);
        const uniqueNumbers = [...new Set(numbers)]; // Remove duplicates
        setVehicleNames(uniqueNames);
        setVehicleNumbers(uniqueNumbers);
      })
      .catch((error) => console.error("Error fetching vehicles:", error));
  }, []);


  //bookedby
  useEffect(() => {
    // Fetch usernames from the createusers collection
    axios
      .get("http://localhost:3000/createusers")
      .then((res) => {
        const users = res.data.map((user) => user.username);
        setBookedByOptions(users);
      })
      .catch((error) => console.error("Error fetching usernames:", error));
  }, []);





  const handleEdit = (slot) => {
    setSelectedSlot(slot);
    setFormData(slot); // Set form data with selected slot data, including fromTime and toTime
    toggleModal();
  };

  const handleFromTimeChange = (event) => {
    setFormData({ ...formData, fromTime: event.target.value });
  };
  
  const handleToTimeChange = (event) => {
    setFormData({ ...formData, toTime: event.target.value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, selectedDate: date });
  };

  // const handleSubmit = () => {
  //   console.log("Updated slot:", formData);
  //   const updatedData = data.map(slot => {
  //     if (slot === selectedSlot) {
  //       return formData;
  //     }
  //     return slot;
  //   });
  //   setData(updatedData); // Update the data state with the modified array
  //   toggleModal();
  // };

  const handleSubmit = () => {
    // Update the slot in the frontend state
    const updatedData = data.map(slot => {
      if (slot === selectedSlot) {
        return formData;
      }
      return slot;
    });
    setData(updatedData); // Update the data state with the modified array
    toggleModal();
  
    // Call handleUpdate to update the slot in the backend
    handleUpdate(selectedSlot._id, formData);
  };
  
  const handleUpdate = (slotId, updatedSlotData) => {
    axios.put(`http://localhost:3000/updateslots/${slotId}`, updatedSlotData)
      .then(res => {
        console.log("Slot updated successfully in backend:", res.data);
      })
      .catch(err => {
        console.error("Error updating slot in backend:", err);
      });
  };

  // const handleUpdate = (e) => {
  //     e.preventDefault();
  //     if (validateForm()) {
  //       axios
  //         .put(`http://localhost:3000/updateslots/${editVehicleId}`, {
  //           selectedVehicle,
  //           selectedDate,
  //           fromTime,
  //           toTime,
  //           vehicleNumber,
  //           villaNumber,
  //           bookedBy,
  //         })
  //         .then((result) => {
  //           console.log(result);
  //           const updatedIndex = vehicles.findIndex(
  //             (v) => v._id === editVehicleId
  //           );
  //           const updatedVehicle = {
  //             ...vehicles[updatedIndex],
  //             selectedVehicle,
  //             selectedDate,
  //             fromTime,
  //             toTime,
  //             vehicleNumber,
  //             villaNumber,
  //             bookedBy,
  //           };
  //           const updatedVehicles = [
  //             ...vehicles.slice(0, updatedIndex),
  //             updatedVehicle,
  //             ...vehicles.slice(updatedIndex + 1),
  //           ];
  //           setVehicles(updatedVehicles);
  //           toggleEditModal();
  //         })
  //         .catch((err) => console.log(err));
  //     }
  //   };
  // }

  
  return (
 <div> 
<Navbar/>
    <Box sx={{ width: '100%', p:2 , height: '100vh', mt:1, borderRadius:5}}>

<div className="table-container1">
<div className="table-container">
<div className="slot m-1"><h5><b>Slot Details</b></h5></div>

<table className="table-no-border">
  <thead>
    <tr>
      <th>S.No</th>
      <th>Vehicle Name</th>
      <th>Date</th>
      <th>Slot Time</th>
      <th>Vehicle Number</th>
      <th>Villa Number</th>
      {/* <th>Booked By</th> */}
      {/* <th>Action</th> */}
    </tr>
  </thead>
  <tbody>
    {data.map((slot, index) => (
      <tr key={index} className="divider-row">
        <td>{index + 1}</td> {/* S.No starts from 1 */}
        <td>{slot.selectedVehicle}</td>
        <td>{slot.selectedDate}</td>
        <td>{slot.fromTime} - {slot.toTime}</td>
        <td>{slot.vehicleNumber}</td>
        <td>{slot.villaNumber}</td>
        {/* <td>{slot.bookedBy}</td> */}
        {/* <td>
          <button className="btn btn-success m-2" onClick={() => handleEdit(slot)}>Edit</button>
          <button className="btn btn-danger" onClick={() => handleDelete(slot)}>Delete</button>
        </td> */}
      </tr>
    ))}
  </tbody>
</table>

      </div>
      </div>

      {/* delete */}
      <Modal isOpen={confirmDeleteModal} toggle={toggleConfirmDeleteModal} centered={true}>
        <ModalHeader toggle={toggleConfirmDeleteModal}>Confirm Delete</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this slot?
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleConfirmDeleteModal}>Cancel</Button>
          <Button color="danger" onClick={confirmDelete}>Delete</Button>
        </ModalFooter>
      </Modal>




      <Modal isOpen={modal} toggle={toggleModal} centered={true}>
        <ModalHeader toggle={toggleModal}>Edit Slot</ModalHeader>
        <ModalBody>
        <ModalBody>
  {/* <form onSubmit={handleSubmit}> */}
  <form onSubmit={handleUpdate}>
    <div className="form-group">
      <label>Vehicle Name:</label>
      <select
        name="selectedVehicle"
        value={formData.selectedVehicle}
        onChange={handleInputChange}
      >
        <option value="">Select Vehicle</option>
        {vehicleNames.map((name, index) => (
          <option key={index} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>


    <div className="form-group">
      <label>Date:</label>
      <DatePicker
  selected={formData.selectedDate}
  onChange={(date) => handleDateChange(date)}
  dateFormat="yyyy-MM-dd"
/>
    </div>



    <div className="form-group">
  <label>From Time:</label>
  <input
    type="time"
    name="fromTime"
    value={formData.fromTime}
    onChange={handleFromTimeChange}
  />
</div>
<div className="form-group">
  <label>To Time:</label>
  <input
    type="time"
    name="toTime"
    value={formData.toTime}
    onChange={handleToTimeChange}
  />
</div>

    

    <div className="form-group">
      <label>Vehicle Number:</label>
      <select
        name="vehicleNumber"
        value={formData.vehicleNumber}
        onChange={handleInputChange}
      >
        <option value="">Select Vehicle Number</option>
        {vehicleNumbers.map((number, index) => (
          <option key={index} value={number}>
            {number}
          </option>
        ))}
      </select>
    </div>
   


  
    <div className="form-group">
      <label>Villa Number:</label>
      <input
        type="text"
        name="villaNumber"
        value={formData.villaNumber}
        onChange={handleInputChange}
      />
    </div>
    {/* <div className="form-group">
      <label>Booked By:</label>
      <input
        type="text"
        name="bookedBy"
        value={formData.bookedBy}
        onChange={handleInputChange}
      />
    </div> */}
    <div className="form-group">
  <label>Booked By:</label>
  <select
    name="bookedBy"
    value={formData.bookedBy}
    onChange={handleInputChange}
  >
    <option value="">Select User</option>
    {bookedByOptions.map((user, index) => (
      <option key={index} value={user}>
        {user}
      </option>
    ))}
  </select>
</div>
  </form>
</ModalBody>

        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleSubmit}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
  
    </Box>

    </div>
  );
};

export default Bookings;






// import React, { useState, useEffect } from "react";

// const Bookings = () => {
//   const [slots, setSlots] = useState([]);

//   useEffect(() => {
//     fetch("/slots")
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         setSlots(data); // Set the fetched slots data to state
//       })
//       .catch(error => {
//         console.error("Error fetching slots:", error);
//         // You can set an error state here if needed
//       });
//   }, []);

//   // Check if data is undefined or empty before mapping
//   if (!slots || slots.length === 0) {
//     return <div>No data available</div>;
//   }

//   return (
//     <div className="auth-inner" style={{ width: "auto" }}>
//       <table>
//         <thead>
//           <tr>
//             <th>Vehicle Name</th>
//             <th>Date</th>
//             <th>Slot time</th>
//             <th>Vehicle Number</th>
//             <th>Villa Number</th>
//             <th>Booked by</th>
//           </tr>
//         </thead>
//         <tbody>
//           {slots.map((item, index) => (
//             <tr key={index}>
//               <td>{item.selectedVehicle}</td>
//               <td>{`${item.selectedDate} (${item.submittedAt})`}</td>
//               <td>{item.selectedSlot}</td>
//               <td>{item.vehicleNumber}</td>
//               <td>{item.villaNumber}</td>
//               <td>{item.bookedBy}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Bookings;
