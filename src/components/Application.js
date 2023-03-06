import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import "components/Application.scss";
import "components/Appointment";
import Appointment from "components/Appointment";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";


export default function Application(props) {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      console.log(all[0]);
      console.log(all[1]);
      console.log(all[2]);
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });
  }, []);

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  
  const appointmentArray = dailyAppointments.map(appointment => {
    return (
      <Appointment 
        key={appointment.id} 
        {...appointment} 
      />
    )
  });
  
  const setDay = day => setState({ ...state, day });

  return (
    <main className="layout">
      <section className="sidebar">
      <img
      className="sidebar--centered"
      src="images/logo.png"
      alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList days={state.days} value={state.day} onChange={setDay} />
      </nav>
      <img
      className="sidebar__lhl sidebar--centered"
      src="images/lhl.png"
      alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {appointmentArray}
        <Appointment key="last" time="5pm"/>
      </section>
    </main>
  );
}
