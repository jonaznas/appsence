package dev.jonaz.missingtimes

import dev.jonaz.missingtimes.plugins.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.netty.*
import io.ktor.server.plugins.*
import kotlinx.coroutines.runBlocking
import org.koin.core.KoinApplication

class Application(koinApplication: KoinApplication) {
  companion object {
    lateinit var koin: KoinApplication
  }

  init {
    koin = koinApplication
    start()
  }

  private fun start() = runBlocking {
    io.ktor.server.engine.embeddedServer(Netty, port = 8080, host = "0.0.0.0") {
      install(Authentication, ::configureAuthentication)
      install(CORS, ::configureCors)

      configureRouting()
      configureSerialization()
    }.start(wait = true)
  }
}
