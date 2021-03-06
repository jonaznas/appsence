export const environment = {
  production: true,
  apiUrl: 'https://api.appsence.tech',
  appUrl: 'https://appsence.tech',
  endpoint: {
    userProfile: '/v1/user/profile',
    absence: {
      newAbsenceToday: '/v1/absence/new/today',
      newAbsenceDate: '/v1/absence/new/date',
      getAbsenceById: '/v1/absence/{id}',
      getAbsencesForDate: '/v1/absences-for-date',
      getAbsenceHistoryByDays: '/v1/absence/history',
      getUnexcused: '/v1/absence/unexcused',
      updateAbsence: '/v1/absence/update',
      deleteAbsence: '/v1/absence/delete'
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
