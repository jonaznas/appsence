package dev.jonaz.missingtimes.module

import dev.jonaz.missingtimes.service.JwtService
import dev.jonaz.missingtimes.service.UserService
import org.koin.dsl.module

val appModule = module {
  single { JwtService() }
  single { UserService()}
}
