// Local storage utilities
export const getAppointments = () => {
  return JSON.parse(localStorage.getItem('appointments') || '[]');
};

export const saveAppointment = (appointment) => {
  const appointments = getAppointments();
  appointment.id = Date.now();
  appointments.push(appointment);
  localStorage.setItem('appointments', JSON.stringify(appointments));
};

export const deleteAppointment = (id) => {
  const appointments = getAppointments();
  const updated = appointments.filter(apt => apt.id !== id);
  localStorage.setItem('appointments', JSON.stringify(updated));
};

export const getProgress = () => {
  return JSON.parse(localStorage.getItem('progress') || '[]');
};

export const saveProgress = (session) => {
  const progress = getProgress();
  session.id = Date.now();
  session.date = new Date().toISOString();
  progress.push(session);
  localStorage.setItem('progress', JSON.stringify(progress));
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};