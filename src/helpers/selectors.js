export function getAppointmentsForDay(state, day) {
  const correctDay = state.days.filter(days => days.name === day);
  const appointments = [];

  if (correctDay[0]) {
    const dayIDs = correctDay[0].appointments

    for (const numAppts of dayIDs) {
      appointments.push(state.appointments[numAppts]);
    }
  }
  return appointments;
}