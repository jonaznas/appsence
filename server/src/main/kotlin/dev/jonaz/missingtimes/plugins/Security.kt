package dev.jonaz.missingtimes.plugins

import dev.jonaz.missingtimes.persistence.UserPrincipal
import dev.jonaz.missingtimes.service.JwtService
import dev.jonaz.missingtimes.util.extension.genericInject
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
