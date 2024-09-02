// // import React, { useState } from 'react';
// // import DatePicker from 'react-datepicker';
// // import 'react-datepicker/dist/react-datepicker.css';
// // import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
// // import './selectdate.css';
// // import axios from 'axios';

// // const SelectDate = () => {
// //   const [selectedDate, setSelectedDate] = useState(null);
// //   const [selectedSlot, setSelectedSlot] = useState(null); 
// //   const currentDate = new Date();
// //   const [error, setError] = useState(false);
// //   const [villaNumber, setVillaNumber] = useState('');
// //   const [vehicleNumber, setVehicleNumber] = useState('');
// //   const [bookedBy, setBookedBy] = useState('');
// //   const [formError, setFormError] = useState(false);
// //   const [modal, setModal] = useState(false);

// //   const toggleModal = () => setModal(!modal);

// //   const handleSelectSlot = (slot) => {
// //     if (selectedDate) {
// //       setSelectedSlot(slot);
// //       toggleModal(); // Show modal
// //       setError(false);
// //     } else {
// //       setError(true);
// //       setTimeout(() => {
// //         setError(false);
// //       }, 2000);
// //     }
// //   };

// //   const handleDateChange = date => {
// //     setSelectedDate(date);
// //   };

// //   const handleCancel = () => {
// //     toggleModal();
// //   };

// //   const handlereset = () => {
   
// //       setVillaNumber('');
// //       setVehicleNumber('');
// //       setBookedBy('');
// //       setFormError('');
// //   }

// //   const handleSubmit = (event) => {
// //     event.preventDefault();
// //     if (!villaNumber.trim() || !vehicleNumber.trim() || !bookedBy.trim()) {
// //       setFormError(true);
// //       return;
// //     }
// //     toggleModal(); // Close modal
// //     // Reset form values
// //     setSelectedDate(null);
// //     setSelectedSlot(null);
// //     setVehicleNumber('');
// //     setVillaNumber('');
// //     setBookedBy('');
// //   };

// //   // backend
// //   axios.post('http://localhost:3000/createform', {
// //     selectedDate: selectedDate,
// //     selectedSlot: selectedSlot,
// //     villaNumber: villaNumber,
// //     vehicleNumber: vehicleNumber,
// //     bookedBy: bookedBy,
// //   })
// //   .then(response => {
// //     console.log("Form data submitted successfully:", response.data);
// //   })
// //   .catch(error => {
// //     console.error("Error submitting form data:", error);
// //     // Handle error
// //   });

// //   return (
// //     <div>
// //       <div className=''>
// //         <div className="date-picker-wrapper d-flex"> 
// //           <DatePicker
// //             selected={selectedDate}
// //             onChange={handleDateChange}
// //             dateFormat="dd/MM/yyyy"
// //             placeholderText="Select a date"
// //             className="date-picker"
// //             popperPlacement="top-end"
// //             minDate={currentDate}
// //           />
// //           {error && (
// //             <div className="error-popup">
// //               <p>Please select a date</p>
// //             </div>
// //           )}
// //         </div>

// //         <div className="select-container">
// //           {[
// //             '6AM-7AM', '7AM-8AM', '8AM-9AM', '9AM-10AM', '10AM-11AM',
// //             '11AM-12PM', '12PM-1PM', '1PM-2PM', '2PM-3PM', '3PM-4PM',
// //             '4PM-5PM', '5PM-6PM', '6PM-7PM', '7PM-8PM', '8PM-9PM',
// //             '9PM-10PM', '10PM-11PM', '11PM-12AM'
// //           ].map((timeRange, index) => (
// //             <div className="select-item" key={index} onClick={() => handleSelectSlot(timeRange)}>
// //               {timeRange}
// //             </div>
// //           ))}
          
// //           <div type="button" className="select-item1" onClick={() => handleSelectSlot('Available')}>
// //             Available
// //           </div>
// //           <div type="button" className="select-item1" onClick={() => handleSelectSlot('Booked')}>
// //             Booked
// //           </div>
// //         </div>

// //         <Modal isOpen={modal} toggle={toggleModal} centered={true}>
// //           <ModalHeader toggle={toggleModal}>Slot Details:</ModalHeader>
// //           <ModalBody>
// //             <form onSubmit={handleSubmit}>
// //               <div className="form-group">
// //                 <label htmlFor="input1">Slot date:</label>
// //                 <input type="text" id="input1" value={selectedDate ? selectedDate.toLocaleDateString('en-US') : ''} readOnly />
// //               </div>
// //               <div className="form-group">
// //                 <label htmlFor="input2">Slot time:</label>
// //                 <input type="text" id="input2" value={selectedSlot} readOnly />
// //               </div>

// //               <div className="form-group">
// //                 <label htmlFor="input4">Vehicle Number:</label>
// //                 <input type="text" id="input4" value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} />
// //               </div>

// //               <div className="form-group">
// //                 <label htmlFor="input3">Villa Number:</label>
// //                 <input type="text" id="input3" value={villaNumber} onChange={(e) => setVillaNumber(e.target.value)} />
// //               </div>
            
// //               <div className="form-group">
// //                 <label htmlFor="input5">Booked By:</label>
// //                 <input type="text" id="input5" value={bookedBy} onChange={(e) => setBookedBy(e.target.value)} />
// //               </div>
// //               {formError && <p className="error">Please fill out all fields.</p>}
// //               <div className='float-end m-2'>
// //               <Button color="secondary" className='m-2' onClick={handlereset}>Reset</Button>
// //             <Button color="primary" onClick={handleSubmit}>Submit</Button>
// //             </div>
// //             </form>
// //           </ModalBody>
// //         </Modal>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SelectDate;








// // SelectDate.jsx
// import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
// import './selectdate.css';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const SelectDate = ({ onDataSelect }) => {
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const currentDate = new Date();
//   const [error, setError] = useState(false);
//   const [villaNumber, setVillaNumber] = useState('');
//   const [vehicleNumber, setVehicleNumber] = useState('');
//   const [bookedBy, setBookedBy] = useState('');
//   const [formError, setFormError] = useState(false);
//   const [modal, setModal] = useState(false);
//   const navigate = useNavigate();

//   const toggleModal = () => setModal(!modal);

//   const handleSelectSlot = (slot) => {
//     if (selectedDate) {
//       setSelectedSlot(slot);
//       toggleModal(); // Show modal
//       setError(false);
//     } else {
//       setError(true);
//       setTimeout(() => {
//         setError(false);
//       }, 2000);
//     }
//   };

//   const handleDateChange = date => {
//     setSelectedDate(date);
//   };

//   const handleCancel = () => {
//     toggleModal();
//   };

//   const handlereset = () => {
//     setVillaNumber('');
//     setVehicleNumber('');
//     setBookedBy('');
//     setFormError('');
//   }

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (!villaNumber.trim() || !vehicleNumber.trim() || !bookedBy.trim()) {
//       setFormError(true);
//       return;
//     }
//     const data = {
//       selectedDate: selectedDate,
//       selectedSlot: selectedSlot,
//       vehicleNumber: vehicleNumber,
//       villaNumber: villaNumber,
//       bookedBy: bookedBy,
//     };

//     axios.post('http://localhost:3000/createSlots', data)
//     .then(response => {
//       console.log(response.status);
//       console.log("Form data submitted successfully:", response.data);
//       alert('form submitted successfully')
//       navigate('/home');
//     })
//     .catch(error => {
//       console.error("Error submitting form data:", error);
//     });



//     onDataSelect(data); // Pass selected data to parent component
//     toggleModal(); // Close modal
//     // Reset form values
//     setSelectedDate(null);
//     setSelectedSlot(null);
//     setVehicleNumber('');
//     setVillaNumber('');
//     setBookedBy('');
//   };

//   return (
//     <div>
//       <div className=''>
//         <div className="date-picker-wrapper d-flex"> 
//           <DatePicker
//             selected={selectedDate}
//             onChange={handleDateChange}
//             dateFormat="dd/MM/yyyy"
//             placeholderText="Select a date"
//             className="date-picker"
//             popperPlacement="top-end"
//             minDate={currentDate}
//           />
//           {error && (
//             <div className="error-popup">
//               <p>Please select a date</p>
//             </div>
//           )}
//         </div>

//         <div className="select-container">
//           {[
//             '6AM-7AM', '7AM-8AM', '8AM-9AM', '9AM-10AM', '10AM-11AM',
//             '11AM-12PM', '12PM-1PM', '1PM-2PM', '2PM-3PM', '3PM-4PM',
//             '4PM-5PM', '5PM-6PM', '6PM-7PM', '7PM-8PM', '8PM-9PM',
//             '9PM-10PM', '10PM-11PM', '11PM-12AM'
//           ].map((timeRange, index) => (
//             <div className="select-item" key={index} onClick={() => handleSelectSlot(timeRange)}>
//               {timeRange}
//             </div>
//           ))}
          
//           <div type="button" className="select-item1" onClick={() => handleSelectSlot('Available')}>
//             Available
//           </div>
//           <div type="button" className="select-item1" onClick={() => handleSelectSlot('Booked')}>
//             Booked
//           </div>
//         </div>

//         <Modal isOpen={modal} toggle={toggleModal} centered={true}>
//           <ModalHeader toggle={toggleModal}>Slot Details:</ModalHeader>
//           <ModalBody>
//             <form onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <label htmlFor="input1">Slot date:</label>
//                 <input type="text" id="input1" value={selectedDate ? selectedDate.toLocaleDateString('en-US') : ''} readOnly />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="input2">Slot time:</label>
//                 <input type="text" id="input2" value={selectedSlot} readOnly />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="input4">Vehicle Number:</label>
//                 <input type="text" id="input4" value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="input3">Villa Number:</label>
//                 <input type="text" id="input3" value={villaNumber} onChange={(e) => setVillaNumber(e.target.value)} />
//               </div>
            
//               <div className="form-group">
//                 <label htmlFor="input5">Booked By:</label>
//                 <input type="text" id="input5" value={bookedBy} onChange={(e) => setBookedBy(e.target.value)} />
//               </div>
//               {formError && <p className="error">Please fill out all fields.</p>}
//               <div className='float-end m-2'>
//                 <Button color="secondary" className='m-2' onClick={handlereset}>Reset</Button>
//                 <Button color="primary" onClick={handleSubmit}>Submit</Button>
//               </div>
//             </form>
//           </ModalBody>
//         </Modal>
//       </div>
//     </div>
//   );
// };

// export default SelectDate;
