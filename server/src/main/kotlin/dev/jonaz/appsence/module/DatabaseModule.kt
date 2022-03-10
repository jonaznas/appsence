package dev.jonaz.appsence.module

import dev.jonaz.appsence.util.exposed.ExposedClient
import org.koin.dsl.module

val databaseModule = module {
  single { ExposedClient() }
}
