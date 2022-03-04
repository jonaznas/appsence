package dev.jonaz.missingtimes.route

import dev.jonaz.missingtimes.persistence.UserPrincipal
import dev.jonaz.missingtimes.service.AbsenceService
import dev.jonaz.missingtimes.util.extension.genericInject
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable
import java.util.*

fun Route.absence() {
  val absenceService by genericInject<AbsenceService>()

  post("/absence/new/today") {
    val principal = call.authentication.principal<UserPrincipal>()
    val sub = UUID.fromString(principal?.sub)

    call.receive<AbsenceNewTodayDto>()
      .runCatching { absenceService.newAbsenceToday(sub, hours, type, mustExcused, annotation) }
      .onFailure {
        call.respondText(
          status = HttpStatusCode.BadRequest,
          contentType = ContentType.Text.Plain,
          text = it.message ?: "Unbekannter Fehler"
        )
      }
      .onSuccess { call.respond(HttpStatusCode.Created) }
  }
}

@Serializable
data class AbsenceNewTodayDto(
  val hours: Int,
  val type: Int,
  val mustExcused: Boolean,
  val annotation: String?
)
