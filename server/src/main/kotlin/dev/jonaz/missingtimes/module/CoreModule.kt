package dev.jonaz.missingtimes.module

import dev.jonaz.missingtimes.service.JwtService
import org.koin.dsl.module

val coreModule = module {
  single { JwtService() }
}
