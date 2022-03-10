package dev.jonaz.appsence

import dev.jonaz.appsence.module.appModule
import dev.jonaz.appsence.module.databaseModule
import org.koin.core.context.startKoin

fun main() {
  startKoin {
    modules(appModule, databaseModule)
  }.run(::Application)
}
