export const environment = {
  production: true,
  apiUrl: 'https://missing-times.herokuapp.com',
  appUrl: 'https://missing-times.jonaz.dev',
  endpoint: {
    userProfile: '/v1/user/profile',
    absence: {
      newAbsenceToday: '/v1/absence/new/today',
      newAbsenceDate: '/v1/absence/new/date',
      getAbsencesForDate: '/v1/absences-for-date',
      getAbsenceHistoryByDays: '/v1/absence/history',
      updateAbsence: '/v1/absence/update'
    },
    statistic: {
      hoursByDays: '/v1/statistic/hours-by-days',
      allHours: '/v1/statistic/all-hours',
      yearHours: '/v1/statistic/year-hours'
    }
  },
  supabase: {
    url: 'https://kgjzqbfwrbwqspwmqjqx.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnanpxYmZ3cmJ3cXNwd21xanF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxODQ5NzcsImV4cCI6MTk2MDc2MDk3N30.TqDQpL_iDHMVqVhJCPGsPuUlEYVYGVEORjTCkDhDpow'
  }
};
