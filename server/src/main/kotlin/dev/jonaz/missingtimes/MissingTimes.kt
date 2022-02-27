package dev.jonaz.missingtimes

import dev.jonaz.missingtimes.module.appModule
import dev.jonaz.missingtimes.module.databaseModule
import org.koin.core.context.startKoin

fun main() {
  startKoin {
    modules(appModule, databaseModule)
  }.run(::Application)
}
