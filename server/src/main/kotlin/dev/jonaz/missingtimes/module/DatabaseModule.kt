package dev.jonaz.missingtimes.module

import dev.jonaz.missingtimes.util.exposed.ExposedClient
import org.koin.dsl.module

val databaseModule = module {
  single { ExposedClient() }
}
