package dev.jonaz.missingtimes.plugins

import dev.jonaz.missingtimes.route.test
import io.ktor.server.routing.*
import io.ktor.server.locations.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.response.*

fun Application.configureRouting() = routing {
  authenticate {
    test()
  }
}
