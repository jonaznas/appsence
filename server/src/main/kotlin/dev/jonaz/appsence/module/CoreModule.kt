package dev.jonaz.appsence.module

import dev.jonaz.appsence.service.AbsenceService
import dev.jonaz.appsence.service.JwtService
import dev.jonaz.appsence.service.StatisticService
import dev.jonaz.appsence.service.UserService
import org.koin.dsl.module

val appModule = module {
  single { JwtService() }
  single { UserService() }
  single { AbsenceService() }
  single { StatisticService() }
}
