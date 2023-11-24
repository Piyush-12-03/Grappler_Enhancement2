/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { Calendar as FullCalendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import { useDispatch, useSelector } from "react-redux";
import listPlugin from "@fullcalendar/list";
import { fetchUsers } from "../Slice/userSlice";
import { createUserTicket, deleteUserTicket } from "../Slice/userTicket";
import {
  getDropTicketsOfUser,
  getTicketsOfUser,
  getTicketsOfUserByTicketid,
} from "../Slice/ticketSlice";
import Navbar from "./Navbar";

const Plan = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const { users, status: userStatus } = useSelector((state) => state.users);
  const { tickets, status: ticketStatus } = useSelector(
    (state) => state.tickets
  );

  // console.log(" Tickets use select", tickets);

  const calendarRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(fetchUsers()).catch((error) => {
        console.error("API Error:", error);
      });
    }
  }, [users]);

  useEffect(() => {
    return () => {
      // Clean up the calendar when the component unmounts
      if (calendarRef.current) {
        calendarRef.current.destroy();
      }
    };
  }, []);

  function formatDate(date) {
    const { year, month, day, hours, minutes, seconds } = {
      year: date.getFullYear(),
      month: (date.getMonth() + 1).toString().padStart(2, "0"),
      day: date.getDate().toString().padStart(2, "0"),
      hours: date.getHours().toString().padStart(2, "0"),
      minutes: date.getMinutes().toString().padStart(2, "0"),
      seconds: date.getSeconds().toString().padStart(2, "0"),
    };

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
  }

  const handleUserSelection = (user) => {
    // console.log("here inside user", user);
    // console.log("here inside user current", calendarRef.current);

    if (calendarRef.current) {
      // console.log("here inside remove");
      calendarRef.current.getEvents().forEach((event) => event.remove());
    }

    setSelectedUser(user);
    dispatch(getTicketsOfUser(user.id, user.name));
  };

  const isDateWithinBusinessHours = (startH, startMin, end, businessHours) => {
    const startTotalMinutes = startH * 60 + startMin;
    const endTotalMinutes = end.getHours() * 60 + end.getMinutes();

    const businessStartTotalMinutes =
      parseInt(businessHours.startTime.split(":")[0]) * 60 +
      parseInt(businessHours.startTime.split(":")[1]);
    const businessEndTotalMinutes =
      parseInt(businessHours.endTime.split(":")[0]) * 60 +
      parseInt(businessHours.endTime.split(":")[1]);

    return (
      startTotalMinutes >= businessStartTotalMinutes &&
      endTotalMinutes <= businessEndTotalMinutes
    );
  };

  useEffect(() => {
    if (selectedUser === null) {
      return;
    }

    // if (calendarRef.current) {
    //   calendarRef.current.destroy();
    // }

    const calendarEl = document.getElementById("calendar");
    const containerEl = document.getElementById("external-events");
    // console.log("here calen", calendarEl);
    const calendar = new FullCalendar(calendarEl, {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
      },
      initialView: "timeGridWeek",
      selectOverlap: false,
      eventOverlap: false,
      editable: true,
      eventDurationEditable:true,
      eventDisplay: true,
      // eventResizableFromStart: false,
      droppable: true,
      slotMinTime: "00:00:00",
      slotMaxTime: "23:59:00",
      businessHours: {
        daysOfWeek: [1, 2, 3, 4, 5],
        startTime: "10:30:00",
        endTime: "20:30:00",
        display: "inverse-background",
      },
      slotDuration: "00:10:00",
      slotLabelInterval: { minutes: 10 },

      eventSources:[
          // Fetch events from the database and add them to the calendar
          (fetchInfo, successCallback, failureCallback) => {
            // Fetch tickets for the selected user
            dispatch(getDropTicketsOfUser(selectedUser.id))
              .then((response) => {
                const events = response.payload.map((ticket) => ({
                  id: ticket.ticketId,
                  title: ticket.title,
                  start: ticket.startTicketTime,
                  end: ticket.endTicketTime,
                  allDay: false, // Assuming tickets have specific start and end times
                }));
                successCallback(events);
              })
              .catch((error) => {
                console.error("Error fetching tickets:", error);
                failureCallback(error);
              });
          },
        ],


      drop: function (info) {
        // console.log("Inside drop");
        info.jsEvent.preventDefault();

        const title = info.draggedEl.getAttribute("title");
        const description = info.draggedEl.getAttribute("data-description");
        const estimatedTime = info.draggedEl.getAttribute("data-duration");
        const userId = info.draggedEl.getAttribute("user-id");
        const id = info.draggedEl.getAttribute("data-ticketid");

        const ticket_id = id || null;

        const isEventAlreadyProcessed =
          info.draggedEl.getAttribute("data-dropped");

        if (!isEventAlreadyProcessed) {
          // console.log("inside 1st IFisEventAlreadyProcessed");
          info.draggedEl.setAttribute("data-dropped", "true");

          const businessHours = calendar.getOption("businessHours");

          function formatDateWithTime(date) {
            const hours = date.getHours().toString().padStart(2, "0");
            // const minutes = date.getMinutes().toString().padStart(2, "0");

            return `${hours}`;
          }

          // Usage
          const startHour1 = formatDateWithTime(info.date);
          const startMinute = info.date.getMinutes();
          const estimatedTimeInMinutes = parseInt(estimatedTime, 10);

          const endTime = new Date(info.date); // Clone the start time

          // Add the estimated time to the start time to get the end time
          endTime.setMinutes(startMinute + estimatedTimeInMinutes);

          // console.log("Start time:", startHour1);
          // console.log("End time:", formatDateWithTime(endTime));

          const isWithinBusinessHours = isDateWithinBusinessHours(
            startHour1,
            startMinute,
            endTime,
            businessHours
          );

          if (isWithinBusinessHours) {
            // console.log("inside 1st isWithinBusinessHours");

            const isEventAlreadyAdded = calendar
              .getEvents()
              .some((event) => event.id === ticket_id);

            if (!isEventAlreadyAdded) {
              const newTicketdata = {
                title: title,
                description: description,
                estimatedTime: estimatedTime,
                userId: userId,
                ticketId: ticket_id,
              };

              const calendarEvent = {
                user: {
                  id: userId,
                },
                tickets: {
                  ticketId: ticket_id,
                },
                title: newTicketdata.title,
                description: newTicketdata.description,
                dropDate: formatDate(new Date()),
                startTicketTime: formatDate(info.date),
                endTicketTime: formatDate(endTime),
              };
              console.log("Date", info.date);

              dispatch(createUserTicket(calendarEvent));
            } else {
              console.log("Ticket already added to the calendar");
            }
          } else {
            alert(
              "Ticket dropped outside business hours. Please drop within business hours."
            );
            console.log("Ticket dropped outside business hours");
            return;
          }
        } else {
          console.log("Event already processed. Ignoring drop.");
        }
      },

      eventClick: function (info) {
        const isConfirmed = window.confirm(
          "Are you sure you want to remove this event?"
        );

        if (isConfirmed) {
          const ticketId = info.event.extendedProps.ticketId;
          const userId = info.event.extendedProps.userId;

          // console.log("userIdddd", userId);
          // console.log("Selected Info user", selectedUser.id);

          if (userId == selectedUser.id) {
            info.event.remove();
            dispatch(deleteUserTicket(userId, ticketId));
            dispatch(getTicketsOfUserByTicketid(userId, ticketId));
            // console.log("Ticket removed");
          } else {
            console.log("Cannot remove event for a different user");
          }
        }
      },
    });

    new Draggable(containerEl, {
      itemSelector: ".fc-event",
      eventData: function (eventEl) {
        return {
          title: eventEl.getAttribute("title"),
          description: eventEl.getAttribute("data-description"),
          ticketId: eventEl.getAttribute("data-ticketId"),
          userId: eventEl.getAttribute("user-id"),
          estimatedTime: eventEl.getAttribute("data-duration"),
        };
      },
    });
    calendar.render();
    calendarRef.current = calendar;
  }, [selectedUser]);

  return (
    <>
      <Navbar />
      <div className="CalendarPage">
        <div className="Sidebar">
          {userStatus === "loading" && (
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
              {selectedUser && `${selectedUser?.name.toUpperCase()}'s`} Tickets
            </h3>
          </span>

          {ticketStatus === "loading" && (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          <div className="ticket-card">
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
              {tickets ? (
                tickets.map((ticket, index) => (
                  <div
                    key={index}
                    className={`fc-event`}
                    title={ticket.title}
                    data-ticketid={ticket.ticketId}
                    data-duration={ticket.estimatedTime}
                    data-description={ticket.description}
                    user-id={ticket.userIds}
                    draggable
                  >
                    <div className="ticket-card-11">
                      <p style={{ padding: "15px" }}>
                        Id: {ticket.ticketId}
                        <br />
                        Titile: {ticket.title}
                        <br />
                        Time (min): {ticket.estimatedTime}
                        <br />
                        Description: {ticket.description}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: "#fff" }}>
                  No tickets available. Select a user to get Tickets.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="Calendar">
          <div className="calendar-container">
            {selectedUser ? (
              <div id="calendar"></div>
            ) : (
              <h3 style={{ marginLeft: "350px" }}>
                Select a user to plan and view planned tasks.
              </h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Plan;
