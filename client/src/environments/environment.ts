export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  appUrl: 'http://localhost:4200',
  endpoint: {
    userProfile: '/v1/user/profile',
    absence: {
      newAbsenceToday: '/v1/absence/new/today',
      newAbsenceDate: '/v1/absence/new/date',
      getAbsencesForDate: '/v1/absences-for-date',
      getAbsenceHistoryByDays: '/v1/absence/history',
      updateAbsence: '/v1/absence/update'
    }
  },
  supabase: {
    url: 'https://kgjzqbfwrbwqspwmqjqx.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnanpxYmZ3cmJ3cXNwd21xanF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxODQ5NzcsImV4cCI6MTk2MDc2MDk3N30.TqDQpL_iDHMVqVhJCPGsPuUlEYVYGVEORjTCkDhDpow'
  }
};
