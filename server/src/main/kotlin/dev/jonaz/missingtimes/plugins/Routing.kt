package dev.jonaz.missingtimes.plugins

import dev.jonaz.missingtimes.route.absence
import dev.jonaz.missingtimes.route.statistic
import dev.jonaz.missingtimes.route.user
import io.ktor.server.routing.*
import io.ktor.server.application.*
import io.ktor.server.auth.*

fun Application.configureRouting() = routing {
  route("/v1") {

    authenticate {
      user()
      absence()
      statistic()
    }

  }
}
