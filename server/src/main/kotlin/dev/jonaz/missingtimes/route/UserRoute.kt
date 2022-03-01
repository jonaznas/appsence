package dev.jonaz.missingtimes.route

import dev.jonaz.missingtimes.persistence.UserPrincipal
import dev.jonaz.missingtimes.service.UserService
import dev.jonaz.missingtimes.util.extension.genericInject
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable
import java.util.*

fun Route.user() {
  val userService by genericInject<UserService>()

  get("/user/profile") {
    val principal = call.authentication.principal<UserPrincipal>()
    val sub = UUID.fromString(principal?.sub)
    val profile = userService.getUserProfile(sub)

    if (profile.isNotEmpty()) {
      call.respond(profile.first())
    } else {
      call.respond(HttpStatusCode.NotFound)
    }
  }

  post("/user/profile") {
    call.receive<UserProfileDto>()
      .runCatching { userService.createUserProfile(this) }
      .onFailure {
        call.respondText(
          status = HttpStatusCode.BadRequest,
          contentType = ContentType.Text.Plain,
          text = it.message.toString()
        )
      }
      .onSuccess { call.respond(HttpStatusCode.Created) }
  }
}

@Serializable
data class UserProfileDto(
  val id: String?,
  val name: String
)
