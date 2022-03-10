package dev.jonaz.appsence.plugins

import dev.jonaz.appsence.persistence.UserPrincipal
import dev.jonaz.appsence.service.JwtService
import dev.jonaz.appsence.util.extension.genericInject
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*

fun configureAuthentication(configure: Authentication.Configuration) {
  val jwtService by genericInject<JwtService>()

  configure.jwt {
    verifier(jwtService.getVerifier())
    validate {
      UserPrincipal(
        it.payload.getClaim("email").asString(),
        it.payload.getClaim("sub").asString()
      )
    }
  }
}
