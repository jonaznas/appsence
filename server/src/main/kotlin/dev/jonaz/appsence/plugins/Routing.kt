package dev.jonaz.appsence.plugins

import dev.jonaz.appsence.route.absence
import dev.jonaz.appsence.route.statistic
import dev.jonaz.appsence.route.user
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
