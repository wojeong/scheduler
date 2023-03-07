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

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewerData = state.interviewers[interview.interviewer];
  return {...interview, interviewer: interviewerData};
}

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