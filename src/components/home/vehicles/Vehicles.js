import React, { useEffect, useRef, useState } from "react";
import "./vehicles.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import axios from "axios";

import { Schedule } from "@mui/icons-material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Box } from "@mui/material";
import Sidebar from "../../Sidebar";
import Navbar from "../../Navbar";
//  import TimeSlotSelector from "./TimeSlotSelector";

const Vehicles = ({ onSlotSelect }) => {
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [showSelectDate, setShowSelectDate] = useState(false);
  // const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [error, setError] = useState(false);
  const [villaNumber, setVillaNumber] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [bookedBy, setBookedBy] = useState("");
  const [formError, setFormError] = useState(false);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);

  const [bookedByOptions, setBookedByOptions] = useState([]);
  const [successModal, setSuccessModal] = useState(false);
  const [vehiclesData, setVehiclesData] = useState([]);

  //display vehicles card in dashboard
  const [vehicles, setVehicles] = useState(new Set());

  const areaGraphRef = useRef(null);
  const barGraphRef = useRef(null);

  const timeSlots = [
    { id: 1, time: "0:00 AM" },
    { id: 2, time: "0:30 AM" },
    { id: 3, time: "1:00 AM" },
    { id: 4, time: "1:30 AM" },
    { id: 5, time: "2:00 AM" },
    { id: 6, time: "2:30 AM" },
    { id: 7, time: "3:00 AM" },
    { id: 8, time: "3:30 AM" },
    { id: 9, time: "4:00 AM" },
    { id: 10, time: "4:30 AM" },
    { id: 11, time: "5:00 AM" },
    { id: 12, time: "5:30 AM" },
    { id: 13, time: "6:00 AM" },
    { id: 14, time: "6:30 AM" },
    { id: 15, time: "7:00 AM" },
    { id: 16, time: "7:30 AM" },
    { id: 17, time: "8:00 AM" },
    { id: 18, time: "8:30 AM" },
    { id: 19, time: "9:00 AM" },
    { id: 20, time: "9:30 AM" },
    { id: 21, time: "10:00 AM" },
    { id: 22, time: "10:30 AM" },
    { id: 22, time: "11:00 AM" },
    { id: 22, time: "11:30 AM" },
    { id: 22, time: "12:00 PM" },
    { id: 23, time: "12:30 PM" },
    { id: 24, time: "1:00 PM" },
    { id: 25, time: "1:30 PM" },
    { id: 26, time: "2:00 PM" },
    { id: 27, time: "2:30 PM" },
    { id: 28, time: "3:00 PM" },
    { id: 29, time: "3:30 PM" },
    { id: 30, time: "4:00 PM" },
    { id: 31, time: "4:30 PM" },
    { id: 32, time: "5:00 PM" },
    { id: 33, time: "5:30 PM" },
    { id: 34, time: "6:00 PM" },
    { id: 35, time: "6:30 PM" },
    { id: 36, time: "7:00 PM" },
    { id: 37, time: "7:30 PM" },
    { id: 38, time: "8:00 PM" },
    { id: 39, time: "8:30 PM" },
    { id: 40, time: "9:00 PM" },
    { id: 41, time: "9:30 PM" },
    { id: 42, time: "10:00 PM" },
    { id: 43, time: "10:30 PM" },
    { id: 44, time: "11:00 PM" },
    { id: 45, time: "11:30 PM" },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:3000/vehicles")
      .then((response) => {
        setVehiclesData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vehicles data:", error);
      });
  }, []);

  useEffect(() => {
    // Filter vehicle numbers based on the selected vehicle
    const filteredVehicleNumbers = vehiclesData
      .filter((vehicle) => vehicle.vehicleName === selectedVehicle)
      .map((vehicle) => vehicle.vehicleNum);
    setVehicleNumbers(filteredVehicleNumbers);
  }, [selectedVehicle, vehiclesData]);

  const handleVehicleChange = (event) => {
    setSelectedVehicle(event.target.value);
    // Reset selected vehicle number when a different vehicle is selected
    setVehicleNumber("");
  };

  // const [vehicleCounts, setVehicleCounts] = useState({
  //   Tractor: 0,
  //   JCB: 0,
  // });

  const fetchSlotData = () => {
    axios
      .get("http://localhost:3000/getslots")
      .then((response) => {
        // Process the fetched data to get the count of available slots for each vehicle type
        const slotsData = response.data.data;
        const counts = {
          Tractor: 0, // Initialize Tractor count to 0
          // Initialize other vehicle counts similarly
        };
        slotsData.forEach((slot) => {
          // Increment the count of available slots for the corresponding vehicle type
          counts[slot.selectedVehicle]++;
        });
        setVehicleCounts(counts); // Update the state variable with the counts
      })
      .catch((error) => {
        console.error("Error fetching slot data:", error);
      });
  };

  //useeffect
  useEffect(() => {
    const fetchSlotData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getslots");
        const slotsData = response.data.data;
        const counts = {
          Tractor: 0,
        };
        slotsData.forEach((slot) => {
          counts[slot.selectedVehicle]++;
        });
        setVehicleCounts(counts);
      } catch (error) {
        console.error("Error fetching slot data:", error);
      }
    };

    fetchSlotData();
  }, []);

  const [bookedSlots, setBookedSlots] = useState([]);

  const [vehicleNumbers, setVehicleNumbers] = useState([]);

  const handleVehicleClick = (selectedVehicle) => {
    setSelectedVehicle(selectedVehicle);
    toggleModal();
  };

  // const toggleModal = () => setModal(!modal);
  const toggleModal = () => {
    if (!modal) {
      // If modal is opening, do nothing
      setModal(true);
    } else {
      // If modal is closing, reset the form
      // setFromTime("");
      // setToTime("");
      setVillaNumber("");
      setVehicleNumber("");
      setBookedBy("");
      setFormError(false);
      setModal(false);
    }
  };

 

  const handleCancel = () => {
    toggleModal();
  };

  const handlereset = () => {
    setVillaNumber("");
    setVehicleNumber("");
    // setBookedBy("");
    setFormError("");
    setSelectedDate("");
    setSelectedSlot("");
  };

  //slot
  // const [selectedSlot, setSelectedSlot] = useState('');

  // Function to handle slot selection
  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
  };

  

  const handleSlotSelect = (slotTime) => {
    if (!bookedSlots.includes(slotTime)) {
      setSelectedSlot(slotTime);
    } else {
      alert('This slot is already booked. Please select another slot.');
    }
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedSlot) {
      alert('Please select a slot.');
      return;
    }

    // Validate form fields and selectedSlot
    if (!selectedSlot || !selectedVehicle || !vehicleNumber || !villaNumber || !selectedDate) {
      alert('Please fill out all fields and select a slot.');
      return;
    }

    const data = {
      selectedVehicle: selectedVehicle,
      selectedDate: selectedDate,
      vehicleNumber: vehicleNumber,
      villaNumber: villaNumber,
      selectedSlot: selectedSlot
    };

  //  console.log("POST DATA",data);
       //axios:
    axios.post("http://localhost:3000/createSlots", data)
      .then((response) => {
        console.log(response.status);
        console.log("Form data submitted successfully:", response.data);
        alert("Form submitted successfully!"); // Show success message
        setSuccessModal(true);
        fetchSlotData(); // Refresh slot data if needed
        setShowSelectDate(false); // Hide date selection if needed

        setBookedSlots([...bookedSlots, selectedSlot]);

        // Clear selectedSlot state
        setSelectedSlot(null);
      })
      .catch((error) => {
        console.error("Error submitting form data:", error);
      });
  };

  

  const closeSuccessModal = () => {
    setSuccessModal(false);
  };

  useEffect(() => {
    fetch("http://localhost:3000/getslots", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data, "userData");
        setData(data.data);
      });
  }, []);

  //vehiclenum
  // useEffect(() => {
  //   axios.get("http://localhost:3000/getVehicle").then((response) => {
  //     const vehicleNumbers = response.data.map((vehicle) => vehicle.vehicleNum);
  //     setVehicleNumbers(vehicleNumbers);
  //   }).catch((error) => {
  //     console.error("Error fetching vehicle numbers:", error);
  //   });
  // }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3000/vehicles") // Correct endpoint to fetch all vehicle numbers
      .then((response) => {
        const vehicleNumbers = response.data.map(
          (vehicle) => vehicle.vehicleNum
        );
        setVehicleNumbers(vehicleNumbers);
      })
      .catch((error) => {
        console.error("Error fetching vehicle numbers:", error);
      });
  }, []);

  const handleVehicleNumberChange = (event) => {
    setVehicleNumber(event.target.value);
  };

  //time
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("00:00");

  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    setSelectedDate(date);
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();

    // Add leading zero to month and day if needed
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  //from - to
  // const [fromTime, setFromTime] = useState("");
  // const [toTime, setToTime] = useState("");

  // const handleFromTimeChange = (event) => {
  //   setFromTime(event.target.value);
  // };

  // const handleToTimeChange = (event) => {
  //   setToTime(event.target.value);
  // };

  //bookedby
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3000/createusers") // Endpoint to fetch all usernames
  //     .then((response) => {
  //       const usernames = response.data.map((user) => user.username);
  //       setBookedByOptions(usernames);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching usernames:", error);
  //     });
  // }, []);

  const handleBookedByChange = (event) => {
    setBookedBy(event.target.value);
  };

  useEffect(() => {
    let areaChartInstance = null;
    let barChartInstance = null;

    // Destroy existing chart instances before re-rendering
    if (areaChartInstance) {
      areaChartInstance.destroy();
    }
    if (barChartInstance) {
      barChartInstance.destroy();
    }

    return () => {
      if (areaChartInstance) {
        areaChartInstance.destroy();
      }
      if (barChartInstance) {
        barChartInstance.destroy();
      }
    };
  }, []);

  // total slots
  const [totalSlots, setTotalSlots] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3000/getTotalSlotCount")
      .then((res) => {
        setTotalSlots(res.data.totalSlots);
      })
      .catch((err) => {
        console.error("Error fetching total slot count:", err);
      });
  }, []);

  // total vehicles
  const [totalVehicles, setTotalVehicles] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3000/getTotalVehiclesCount")
      .then((res) => {
        setTotalVehicles(res.data.totalVehicles);
      })
      .catch((err) => {
        console.error("Error fetching total slot count:", err);
      });
  }, []);

  // total users
  const [totalusers, setTotalusers] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3000/getTotalCreateusersCount")
      .then((res) => {
        setTotalusers(res.data.totalusers);
      })
      .catch((err) => {
        console.error("Error fetching total slot count:", err);
      });
  }, []);

  //individual vehicle count
  // const [tractorCount, setTractorCount] = useState(0);

  // useEffect(() => {
  //     axios.get('http://localhost:3000/vehicles/count-Tractor')
  //         .then(response => {
  //             setTractorCount(response.data.count);
  //         })
  //         .catch(error => {
  //             console.error('Error fetching tractor count:', error);
  //         });
  // }, []);

  const [vehicleCounts, setVehicleCounts] = useState({});
  useEffect(() => {
    axios
      .get("http://localhost:3000/vehicles/counts")
      .then((response) => {
        setVehicleCounts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vehicle counts:", error);
      });
  }, []);

  //booked slot count
 
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    // Fetch data from backend when the component mounts
    axios
      .get("http://localhost:3000/slots")
      .then((response) => {
        setSlots(response.data); // Update state with fetched data
      })
      .catch((error) => {
        console.error("Error fetching slots:", error);
        // Handle error if needed
      });
  }, []);

  const countSelectedVehicles = () => {
    const vehicleCounts = {};
    slots.forEach((slot) => {
      const { selectedVehicle } = slot;
      if (vehicleCounts[selectedVehicle]) {
        vehicleCounts[selectedVehicle]++;
      } else {
        vehicleCounts[selectedVehicle] = 1;
      }
    });
    return vehicleCounts;
  };


  useEffect(() => {
    axios
      .get("http://localhost:3000/vehicles")
      .then((response) => {
        // Extract unique vehicle names using Set
        const uniqueVehicleNames = new Set(
          response.data.map((vehicle) => vehicle.vehicleName)
        );
        setVehicles(uniqueVehicleNames);
      })
      .catch((error) => {
        console.error("Error fetching vehicle data:", error);
      });
  }, []);

  //hover popup
  const [showMessage, setShowMessage] = useState(false);

  const handleMouseEnter = () => {
    setShowMessage(true);
  };

  const handleMouseLeave = () => {
    setShowMessage(false);
  };

  //
  const colors = ["#f1f1f1", "#fff", "#000"];

  // Function to get a random color class
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  return (

  <div>  
  <Navbar/>
    <Box sx={{ width: "100%", p: 1, height: "100vh", mt: 1, borderRadius: 5 }}>
   
      <div class="grid-containers">
        {/* Slot count  */}
        <div className="grid-items">
          <div className="d-flex justify-content-between align-items-center">
            <div className="count-text">
              <h1>
                <b>{totalSlots}</b>
              </h1>
              <h5><strong>Booked Slots</strong></h5>
            </div>
            <div className="icon-wrapper">
              <ListAltIcon className="list-icon" sx={{ fontSize: 45 }} />
            </div>
          </div>
        </div>

        <div
          className="grid-items"
          //  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
        >
          <div className="d-flex justify-content-between align-items-center">
            <div className="count-text">
              <h1>
                <b>{totalVehicles}</b>
              </h1>
              <h5><strong>Total Vehicles</strong></h5>
            </div>
            <div className="icon-wrapper">
              <AgricultureIcon className="list-icon" sx={{ fontSize: 55 }} />
            </div>
          </div>
          {/* <div className={`message-box ${showMessage ? "show" : ""}`}>
            <div>
              <h2>Vehicle Counts:</h2>
              <ul>
                {Object.keys(vehicleCounts).map((vehicleName) => (
                  <li key={vehicleName}>
                    {vehicleName}: {vehicleCounts[vehicleName]}
                  </li>
                ))}
              </ul>
            </div>
          </div> */}
        </div>

        {/* Total users  */}
        <div className="grid-items">
          <div className="d-flex justify-content-between align-items-center">
            <div className="count-text">
              <h1>
                <b>{totalusers}</b>
              </h1>
              <h5><strong>Total Users</strong></h5>
            </div>
            <div className="icon-wrapper">
              <PeopleAltIcon className="list-icon" sx={{ fontSize: 55 }} />
            </div>
          </div>
        </div>
      </div>
      {/* <hr /> */}

      {/* //  */}
      <div className="container-fluid mt-5">

       <div className="m-1"><h4><strong>Click here to book your Slot</strong></h4></div> 
        <div className="row">
          {/* Main Container */}
          <div className="col-lg-8">
            <div className="row">
              <div className="row">
                {[...vehicles].map((vehicleName, index) => (
                  <div key={index} className="col-xl-4 col-lg-6 col-md-6 mb-4">
                    <div className={"card"}>
                      <div className={`card-body ${getRandomColor()}`}>
                        {/* <div className="card-body"  > */}
                        <div className="d-flex align-items-center">
                          <img
                            // src="https://4.imimg.com/data4/KJ/BY/MY-14831048/john-deere-5050d-tractor.jpg"
                            alt=""
                            className="vehicle-icon"
                          />
                          <h5 className="card-title ms-2">
                            <b>{vehicleName}</b>
                          </h5>
                        </div>
                        <div
                          onClick={() => handleVehicleClick(vehicleName)}
                          className="d-grid"
                        >
                          <span>Total {/* Add your total logic here */}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* vv imp  */}
              {/* <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          // mt: 3,
          mt: 1,
        }}
      >
        {Object.keys(vehicleCounts).map((vehicleName, index) => (
          <Box
            key={index}
            sx={{
              // width: "30%",
              // width: "5%",
              // p: 1,
              // mt: 1,
              // borderRadius: 5,
              // border: "1px solid #ccc",
              // textAlign: "center",
              
            }}
          >
            <h5>
              <b>{vehicleName}</b>
            </h5>
            <p>Total = {vehicleCounts[vehicleName]}</p>
          </Box>
        ))}
      </Box> */}

              {/* booked slots count */}
              {/* <div>
            <h2>Slots Data</h2>
            <div>
                {Object.entries(countSelectedVehicles()).map(([vehicle, count]) => (
                    <div key={vehicle}>
                        <p>{`${vehicle}: ${count}`}</p>
                    </div>
                ))} 
            </div>
        </div> */}

              {/*  */}
            </div>
          </div>

          {/* Second Container  unhide*/}
          {/* <div className="col-lg-4">
            <div className="card">
              <div className="secondcard-body">
                <h5 className="card-title">
                  <b className="thank-you1">Slot details</b>
                </h5>
                <p className="card-text d-grid">
                  <span className="thank-you">
                    {" "}
                    <b>Thank you..! Your slot has been booked.</b>
                  </span>
                  <span>
                    {" "}
                    <b>Please find the details below</b>
                  </span>
                </p>
                <form>
                 
                </form>
              </div>
            </div>
          </div> */}

          {/* //  */}
          <div class="boxes2-container"></div>

          {/* </div>   */}
          <div>

            <Modal
              isOpen={modal}
              toggle={toggleModal}
              centered={true}
              style={{ marginTop: "40px" }}
              size="xl"
            >
              <ModalHeader toggle={toggleModal}>
                <h4>Slot Details:</h4>
              </ModalHeader>
              <ModalBody>
                <form className="form1" onSubmit={handleSubmit}>
                  <div className="d-flex justify-content-between">
                    <div
                      className="input d-flex flex-column flex-grow-1"
                      style={{ marginLeft: "10px" }}
                    >
                      <div className="m-2 p-1">
                        <label htmlFor="input2">
                          <h4>Vehicle Name</h4>
                        </label>
                        <input
                          type="text"
                          id="input6"
                          value={selectedVehicle}
                          readOnly
                          style={{ width: "75%" }}
                        />
                      </div>

                      <div className="m-2 p-1">
                        <label htmlFor="vehicleNumber">
                          <h4>Vehicle Number</h4>
                        </label>
                        <select
                          id="vehicleNumber"
                          value={vehicleNumber}
                          onChange={handleVehicleNumberChange}
                          style={{ width: "75%" }}
                        >
                          <option value="">Vehicle Number</option>
                          {vehicleNumbers.map((number) => (
                            <option key={number} value={number}>
                              {number}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div
                      className="input d-flex flex-column flex-grow-1"
                      style={{ marginRight: "10px" }}
                    >
                      <div className="m-2 p-1">
                        <label htmlFor="villa number">
                          <h4>Villa Number</h4>
                        </label>
                        <input
                          type="text"
                          id="villa number"
                          value={villaNumber}
                          placeholder="Villa Number"
                          onChange={(e) => setVillaNumber(e.target.value)}
                          style={{ width: "75%" }}
                        />
                      </div>

                      <div className="m-2 p-1">
                        <label htmlFor="slot-date">
                          <h4>Slot Date (IST)</h4>
                        </label>
                        <input
                          className="date-input"
                          type="date"
                          id="slot-date"
                          value={selectedDate.toISOString().split("T")[0]}
                          onChange={handleDateChange}
                          min={getCurrentDate()}
                          style={{ width: "75%" }}
                        />
                      </div>

                     

                      {/* booked / avaialble  */}
                      {/* <div className="m-2 p-1">
                    <label>From Time:</label>
                    <input
                      type="time"
                      value={fromTime}
                      onChange={handleFromTimeChange}
                    />

                    <label>To Time:</label>
                    <input
                      type="time"
                      value={toTime}
                      onChange={handleToTimeChange}
                    />
                  </div> */}
                    </div>
                  </div>

                  {/* //slots */}
                  <div>
                    {/* <TimeSlotSelector onSlotSelect={handleSlotSelect} /> */}
                    <div className="m-2 p-1">
                        <div className="time-slot-selector">
                        <div className="container">
                        <div className="left-content"><h5>Slots</h5></div>

                        <div className="right-content">

                        <div class='m-1'>
                        <input type="radio" id="available" name="status" value="available"></input>
                        <label for="available">Available</label>
                      </div>

                      <div class='m-1'>
                        <input type="radio1" id="booked" name="status" value="booked"></input>
                        <label for="booked">Booked</label>
                      </div>
                                </div>
                          </div>
                          
                          <div className="time-slots">
                            {/* {timeSlots.map((slot) => (
                              <div
                                key={slot.time}
                                className={`time-slot-button ${
                                  selectedSlot === slot.time ? "selected" : ""
              
                                }`}
                                onClick={() => handleSlotSelect(slot.time)}
                              >
                                {slot.time}
                              </div>
                            ))} */}

{timeSlots.map((slot) => (
          <div
            key={slot.time}
            className={`time-slot-button ${
              selectedSlot === slot.time ? "selected" : ""
            } ${bookedSlots.includes(slot.time) ? "booked disabled" : ""}`}
            onClick={() => handleSlotSelect(slot.time)}
          >
            {slot.time}
          </div>
        ))}
                          </div>
                        </div>
                        

                        {selectedSlot && (
        <div className="selected-slot bg-white d-flex">
          <h6>Selected Slot:</h6>
          <p>{selectedSlot}</p>
        </div>
      )}

                      </div>
                  </div>

                  {/* <label>Booked By</label>
                  <select
                    className="form-group-input"
                    id="input7"
                    value={bookedBy}
                    onChange={handleBookedByChange}
                  >
                    <option value="">Select Booked By</option>
                    {bookedByOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select> */}

                  {formError && (
                    <p className="error">Please fill out all fields.</p>
                  )}
                  <div className="text-end">
                    <Button
                      color="secondary"
                      className=" m-1"
                      onClick={handlereset}
                    >
                      Reset
                    </Button>
                    <Button color="primary" onClick={handleSubmit}>
                      Submit
                    </Button>
                  </div>
                </form>
              </ModalBody>
            </Modal>
          </div>
        </div>
      </div>
    </Box>
    </div>
  );
};

export default Vehicles;
