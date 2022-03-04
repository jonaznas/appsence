package dev.jonaz.missingtimes.route

import dev.jonaz.missingtimes.persistence.UserPrincipal
import dev.jonaz.missingtimes.service.AbsenceService
import dev.jonaz.missingtimes.util.extension.genericInject
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.plugins.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.util.*
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.Serializable
import java.time.LocalDate
import java.util.*

fun Route.absence() {
  val absenceService by genericInject<AbsenceService>()

  post("/absence/new/today") {
    val principal = call.authentication.principal<UserPrincipal>()
    val sub = UUID.fromString(principal?.sub)

    call.receive<AbsenceNewTodayDto>()
      .runCatching {
        val totalHoursToday = absenceService.getAbsenceHoursForDate(sub, LocalDate.now()) + hours

        if (totalHoursToday >= 24) {
          throw BadRequestException("Du kannst an einem Tag nicht mehr als 24 Stunden fehlen.")
        }

        absenceService.newAbsenceToday(sub, hours, type, mustExcused, annotation)
      }
      .onFailure {
        call.respondText(
          status = HttpStatusCode.BadRequest,
          contentType = ContentType.Text.Plain,
          text = it.message ?: "Unbekannter Fehler"
        )
      }
      .onSuccess { call.respond(HttpStatusCode.Created) }
  }

  get("/absences") {
    val principal = call.authentication.principal<UserPrincipal>()
    val sub = UUID.fromString(principal?.sub)
    val dateParam = call.request.queryParameters.getOrFail("date")

    kotlin.runCatching { return@runCatching LocalDate.parse(dateParam) }
      .onFailure { call.respond(HttpStatusCode.BadRequest) }
      .onSuccess { call.respond(absenceService.getAbsences(sub, it)) }
  }
}

@Serializable
data class AbsenceNewTodayDto(
  val hours: Int,
  val type: Int,
  val mustExcused: Boolean,
  val annotation: String?
)

@Serializable
data class AbsenceDto(
  val date: String,
  val hours: Int,
  val type: Int,
  val mustExcused: Boolean,
  val annotation: String?,
  val createdAt: String
)