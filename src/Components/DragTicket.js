/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from "react";
import { Card, CardBody, Col } from "reactstrap";
import { Container, Row } from "reactstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import BootstrapTheme from "@fullcalendar/bootstrap";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchUserTicketPending,
  getTicketsOfUser,
} from "../Slice/ticketSlice";
import { fetchUsers } from "../Slice/userSlice";
import { createUserTicket, updateExistingTicket } from "../Slice/userTicket";
import { toast } from "react-toastify";
import Navbar from "./Navbar";

const DragTicket = () => {
  const calendarComponentRef = useRef(null);
  const [droppedTickets, setDroppedTickets] = useState([]);
  const { tickets } = useSelector((state) => state.tickets);
  const { users } = useSelector((state) => state.users);
  const status = useSelector((state) => state.users.status);
  const [selectedUser, setSelectedUser] = useState();
  const [availableTickets, setAvailableTickets] = useState([]);
  const [isNewDrag, setIsNewDrag] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState([]);

  const dispatch = useDispatch();

  const notify = () => {
    toast.success('Tickets fetched successfully', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  };

  useEffect(() => {
    if (tickets) {
      const updatedTickets = tickets.map((ticket) => ({
        ...ticket,
        disabled: false,
      }));
      setAvailableTickets(updatedTickets);
      
    }
  }, [tickets]);
  
  useEffect(() => {
    const setupDraggable = () => {
      if (calendarComponentRef.current) {
        const containerEl = document.getElementById("external-events");
        new Draggable(containerEl, {
          itemSelector: ".fc-event",
          eventData: function (eventEl) {
            // Get the ticket information from the data attributes
            setIsNewDrag(true);
            setSelectedTicket(true);
            const title = eventEl.getAttribute("title");
            const id = eventEl.getAttribute("data");
            const description = eventEl.getAttribute("data-description");
            const user_id = eventEl.getAttribute("user-id"); // Corrected attribute name
            console.log("User ID:", user_id);
            const estimated_time = parseInt(
              eventEl.getAttribute("data-duration"),
              10
            );

            // Include additional data in eventData
            const ticket_id = id;
            const datetime = new Date().toISOString();
            
            return {
              title: title,
              id: id,
              estimated_time: estimated_time,
              ticket_id: ticket_id,
              user_id: user_id,
              datetime: datetime,
              description: description,
            };
          },
          dragend: function () {
            setIsNewDrag(false);
            setSelectedTicket(false);
          },
        });
      }
    };

    setupDraggable();
  }, []);

  const removeEvent = (info) => {
    if (window.confirm("Are you sure you want to remove this ticket?")) {
      const updatedDroppedTickets = droppedTickets.filter(
        (ticket) => ticket.id !== info.event.id
      );
      setDroppedTickets(updatedDroppedTickets);
      
      // Mark the dropped ticket as disabled
      const ticketId = info.event.extendedProps.ticket_id;
      setAvailableTickets((prevAvailableTickets) => {
        return prevAvailableTickets.map((ticket) => {
          if (ticket.ticketId === ticketId) {
            return { ...ticket, disabled: false };
          }
          return ticket;
        });
      });

      info.event.remove();
    }
  };
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleUserSelection = (user) => {
    dispatch(fetchUserTicketPending());
    setSelectedUser(user);
    dispatch(getTicketsOfUser(user.id));
    notify();
  };
  
  const handleTicketDrop = (info) => {
    const { estimated_time, ticket_id, user_id, datetime, description } =
      info.event._def.extendedProps;
    const { title } = info.event._def;

    //if eventis existing
    const existingEvent = droppedTickets.find(
      (event) => event.id === ticket_id
    );

 

    // Calculate the end time based on the estimated time
    const startTime = info.event.start;
    const endTime = new Date(startTime);
    endTime.setMinutes(startTime.getMinutes() + estimated_time); // Subtract estimated_time

    // Create a new event object with start and end times
    const event = {
      title: title,
tickets:{
          ticketId:ticket_id
        },      start: startTime,
      end: endTime,
      dropDate: new Date(),
      user_id: user_id,
      description: description,
      extendedProps: {
        estimated_time: estimated_time,
        user_id: user_id,
        description: description,
        tickets:{
          ticketId:ticket_id
        },
        title: title,
        start: startTime,
        end: endTime,
        dropDate: new Date(),
      },
    };

    function formatDate(date) {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const seconds = date.getSeconds().toString().padStart(2, "0");

      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
    }

    const userTicketData = {
      user: {
        id: user_id,
      },
      tickets: {
        ticketId: ticket_id,
      },
      dropDate: formatDate(new Date()),
      startTicketTime: formatDate(startTime),
      endTicketTime: formatDate(endTime),
    };
    if (existingEvent) {
      console.log("Ticket-->", userTicketData.tickets.ticketId)
      dispatch(updateExistingTicket(userTicketData, userTicketData.user.id, userTicketData.tickets.ticketId));
    return;
    }

    if (isNewDrag) {
      console.log("New Drag")
      dispatch(createUserTicket(userTicketData));
    }
 

    setAvailableTickets((prevAvailableTickets) => {
      return prevAvailableTickets.map((ticket) => {
        if (ticket.ticketId === ticket_id) {
          return { ...ticket, disabled: true };
        }
        return ticket;
      });
    });

    // Add the newevent to the droppedTickets array
    setDroppedTickets((prevDroppedTickets) => [...prevDroppedTickets, event]);

    // Remove the event from the calendar, as we have added it to droppedTickets
    info.event.remove();

    console.log("Dropped Ticket Information:");
    console.log("Ticket ID:", ticket_id);
    console.log("User ID:", user_id);
    console.log("Dropped Datetime:", datetime);
    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Duration:", estimated_time + " minutes");
    console.log("Start Time:", startTime);
    console.log("End Time", endTime);
  };

  return (
    <>
    <Navbar/>
          <React.Fragment>
        <div className="plan">
          <Container fluid>
            <div className="page-title-box">
              <Row className="align-items-center">
                <Col sm="6">
                  <h2
                    className="page-title"
                    style={{ color: "#fff", marginLeft: "20px" }}
                  >
                    Plan Calendar
                  </h2>
                </Col>
              </Row>
            </div>

            <Row>
              <Col md="3">
                <div
                  id="external-events"
                  style={{
                    padding: "20px",
                    width: "100%",
                    height: "auto",
                    maxHeight: "-webkit-fill-available",
                    color: "blue",
                  }}
                >
                  <div className="Sidebar">
                    {status === "loading" && (
                      <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    )}

                    <div className="UserList">
                      <h2>Users</h2>
                      {users.map((user) => (
                        <div key={user.id} className="UserCard">
                          <button
                            className={`btn btn ${
                              user.id === selectedUser?.id ? "active" : ""
                            }`}
                            onClick={() => {
                              handleUserSelection(user);
                            }}
                          >
                            {user.name.toUpperCase()}
                          </button>
                        </div>
                      ))}
                    </div>

                    <span align="center">
                      <h3 style={{ marginTop: "20px" }}>
                        {selectedUser && `${selectedUser.name.toUpperCase()}'s`}{" "}
                        Tickets
                      </h3>
                    </span>
                    {status === "loading" && (
                      <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    )}
                    <div className="ticket-card">
                      {availableTickets &&
                        availableTickets.map((ticket) => (    
                          <div
                            className={`fc-event ${
                              ticket.disabled ? "disabled" : ""
                            }`}
                            title={ticket.title}
                            data={ticket.ticketId}
                            data-duration={ticket.estimatedTime}
                            data-description={ticket.desciption}
                            user-id={ticket.userIds}
                            key={ticket.ticketId}
                            disabled={selectedTicket ? true : false}
                          >
                            <div className="ticket-card-1">
                              <p style={{ padding: "15px" }}>
                                {ticket.title}
                                <br />
                                Time (min): {ticket.estimatedTime}
                                <br />
                                Description: {ticket.desciption}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </Col>
              <Col md="9">
                <Card>
                  <CardBody>
                    <FullCalendar
                      ref={calendarComponentRef}
                      plugins={[
                        BootstrapTheme,
                        dayGridPlugin,
                        interactionPlugin,
                        timeGridPlugin,
                      ]}
                      initialView="timeGridWeek"
                      slotDuration="00:05:00"
                      slotMinTime="09:30:00"
                      slotMaxTime="20:30:00"
                      handleWindowResize={true}
                      themeSystem="bootstrap"
                      eventClick={removeEvent}
                      selectable={true}
                      events={droppedTickets}
                      eventOverlap={false}
                      eventClassNames="custom-event"
                      eventTimeFormat={{ hour: "numeric", minute: "2-digit" }}
                      slotLabelFormat={{ hour: "2-digit", minute: "2-digit" }}
                      eventDrop={handleTicketDrop}
                      editable={true}
                      headerToolbar={{
                        left: "prev,today,next",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay",
                      }}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    </>
  );
};

export default DragTicket;
