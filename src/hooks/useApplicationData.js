import { useState, useEffect } from "react";
import axios from "axios";
import { updateSpots } from "helpers/selectors";

// Custom Hook with multiple helper functions for code re-usability
export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  //Function that books an interview
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    //Sends PUT Response to update the Appointment as well as updating remaing spots
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      const days = updateSpots(state, appointments);
      setState((prev) => ({
        ...prev,
        appointments,
        days,
      }));
    });
  }

  //Function that cancels an Interview and bring it back to "EMPTY" seciont
  function cancelInterview(id) {
    
    //Opens the section by making the interview to null
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    //Update the states 
    return axios.delete(`/api/appointments/${id}`, appointment).then(() => {
      const days = updateSpots(state, appointments);
      setState((prev) => ({
        ...prev,
        appointments,
        days,
      }));
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
}