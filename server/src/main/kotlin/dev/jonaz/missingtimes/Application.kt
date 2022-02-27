package dev.jonaz.missingtimes

import dev.jonaz.missingtimes.plugins.*
import dev.jonaz.missingtimes.util.exposed.ExposedClient
import dev.jonaz.missingtimes.util.exposed.HikariSourceConfig
import dev.jonaz.missingtimes.util.extension.genericInject
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.netty.*
import io.ktor.server.plugins.*
import kotlinx.coroutines.runBlocking
import org.koin.core.KoinApplication

class Application(koinApplication: KoinApplication) {
  private val exposedClient by genericInject<ExposedClient>()

  companion object {
    lateinit var koin: KoinApplication
  }

  init {
    koin = koinApplication

    startDatabaseClient()
    startKtor()
  }

  private fun startDatabaseClient() = HikariSourceConfig
    .createDataSource()
    .let {
      exposedClient.connect(it)
    }

  private fun startKtor() = runBlocking {
    io.ktor.server.engine.embeddedServer(
      Netty,
      port = System.getenv("PORT")?.toIntOrNull() ?: 80,
      host = "0.0.0.0"
    )
    {
      install(Authentication, ::configureAuthentication)
      install(CORS, ::configureCors)

      configureRouting()
      configureSerialization()
    }.start(wait = true)
  }
}
