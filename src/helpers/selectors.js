//Reusuable Helper Functions

//Function that returns an array of all the appointments for the day
export function getAppointmentsForDay(state, day) {
  const theDay = state.days.filter(days => days.name === day);
  
  const appointments = [];

  if (theDay[0]) {
    
    for (const appntmnt of theDay[0].appointments) {
      appointments.push(state.appointments[appntmnt]);
    }
  }
  return appointments;
}

//Check if the section is filled.
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewerData = state.interviewers[interview.interviewer];
  return {...interview, interviewer: interviewerData};
}

//Get the interviewer based on the day
export function getInterviewersForDay(state, day) {
  const theDay = state.days.filter(days => days.name === day);
  const interviewers = [];
  if (theDay[0]) {
  
    for (const intervwer of theDay[0].interviewers) {
      interviewers.push(state.interviewers[intervwer]);
    }
  }
  return interviewers;
}

//A fucntion to calculate remainging spots for the day
export function updateSpots(state, appointments) {
  const daysObj = state.days.find((day) => day.name === state.day);
  let spots = 0;

  for (const id of daysObj.appointments) {
    const appointment = appointments[id];
    if (!appointment.interview) {
      spots++;
    }
  }
  const day = { ...daysObj, spots };
  return state.days.map((dayItem) => (dayItem.name === state.day ? day : dayItem));
}