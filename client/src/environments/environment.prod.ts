export const environment = {
  production: true,
  apiUrl: 'https://missing-times.herokuapp.com',
  appUrl: 'https://missing-times.jonaz.dev',
  endpoint: {
    userProfile: '/v1/user/profile',
    absence: {
      newAbsenceToday: '/v1/absence/new/today',
      getAbsences: '/v1/absences'
    }
  },
  supabase: {
    url: 'https://kgjzqbfwrbwqspwmqjqx.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnanpxYmZ3cmJ3cXNwd21xanF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxODQ5NzcsImV4cCI6MTk2MDc2MDk3N30.TqDQpL_iDHMVqVhJCPGsPuUlEYVYGVEORjTCkDhDpow'
  }
};
