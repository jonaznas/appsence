package dev.jonaz.missingtimes

import dev.jonaz.missingtimes.module.coreModule
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import dev.jonaz.missingtimes.plugins.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.plugins.*
import org.koin.core.context.startKoin

fun main() {
  startKoin {
    modules(coreModule)
  }.run(::Application)
}
