package dev.jonaz.appsence.route

import dev.jonaz.appsence.persistence.UserPrincipal
import dev.jonaz.appsence.service.AbsenceService
import dev.jonaz.appsence.util.extension.genericInject
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.plugins.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.util.*
import kotlinx.serialization.Serializable
import java.time.LocalDate
import java.util.*

fun Route.absence() {
  val absenceService by genericInject<AbsenceService>()

  get("/absence/{id}") {
    val principal = call.authentication.principal<UserPrincipal>()
    val sub = UUID.fromString(principal?.sub)
    val id = call.parameters["id"]?.toIntOrNull()
      ?: throw IllegalArgumentException("Cannot find absence.")

    kotlin.runCatching { absenceService.getAbsenceById(sub, id) }
      .onFailure { call.respond(HttpStatusCode.NotFound) }
      .onSuccess { call.respond(it) }
  }

  post("/absence/new/today") {
    val principal = call.authentication.principal<UserPrincipal>()
    val sub = UUID.fromString(principal?.sub)

    call.receive<AbsenceNewTodayDto>()
      .runCatching {
        val totalHoursToday = absenceService.getAbsenceHoursForDate(sub, LocalDate.now()) + hours

        if (totalHoursToday >= 24) {
          throw BadRequestException("You are trying to miss more than 24 hours today. That's not allowed.")
        }

        absenceService.newAbsenceToday(sub, hours, type, mustExcused, annotation)
      }
      .onFailure {
        call.respondText(
          status = HttpStatusCode.BadRequest,
          contentType = ContentType.Text.Plain,
          text = it.message ?: "Unknown error."
        )
      }
      .onSuccess { call.respond(HttpStatusCode.Created) }
  }

  post("/absence/new/date") {
    val principal = call.authentication.principal<UserPrincipal>()
    val sub = UUID.fromString(principal?.sub)

    call.receive<AbsenceNewDateDto>()
      .runCatching {
        val totalHoursToday = absenceService.getAbsenceHoursForDate(sub, LocalDate.now()) + hours

        if (totalHoursToday >= 24) {
          throw BadRequestException("You are trying to miss more than 24 hours today. That's not allowed.")
        }

        absenceService.newAbsence(sub, LocalDate.parse(date), hours, type, mustExcused, annotation)
      }
      .onFailure {
        call.respondText(
          status = HttpStatusCode.BadRequest,
          contentType = ContentType.Text.Plain,
          text = it.message ?: "Unknown error."
        )
      }
      .onSuccess { call.respond(HttpStatusCode.Created) }
  }

  get("/absences-for-date") {
    val principal = call.authentication.principal<UserPrincipal>()
    val sub = UUID.fromString(principal?.sub)
    val dateParam = call.request.queryParameters.getOrFail("date")

    kotlin.runCatching { return@runCatching LocalDate.parse(dateParam) }
      .onFailure { call.respond(HttpStatusCode.BadRequest) }
      .onSuccess { call.respond(absenceService.getAbsencesForDate(sub, it)) }
  }

  get("/absence/history") {
    val principal = call.authentication.principal<UserPrincipal>()
    val sub = UUID.fromString(principal?.sub)
    var limit = call.request.queryParameters["limit"]?.toIntOrNull() ?: 10

    if (limit > 1000) {
      limit = 1000
    }

    call.respond(absenceService.getAbsencesHistoryByDays(sub, limit))
  }

  put("/absence/update") {
    val principal = call.authentication.principal<UserPrincipal>()
    val sub = UUID.fromString(principal?.sub)

    call.receive<AbsenceUpdateDto>()
      .runCatching {
        absenceService.updateAbsence(sub, id, isExcused, type, mustExcused, picture)
      }
      .onFailure {
        call.respondText(
          status = HttpStatusCode.BadRequest,
          contentType = ContentType.Text.Plain,
          text = it.message ?: "Unknown error."
        )
      }
      .onSuccess { call.respond(HttpStatusCode.OK) }
  }

  get("/absence/unexcused") {
    val principal = call.authentication.principal<UserPrincipal>()
    val sub = UUID.fromString(principal?.sub)

    kotlin.runCatching { return@runCatching absenceService.countUnexcusedHours(sub) }
      .onFailure { call.respond(HttpStatusCode.BadRequest) }
      .onSuccess { call.respond(AbsenceUnexcusedDto(it)) }
  }

  post("/absence/delete") {
    val principal = call.authentication.principal<UserPrincipal>()
    val sub = UUID.fromString(principal?.sub)

    call.receive<AbsenceDeleteDto>()
      .runCatching { absenceService.deleteAbsence(sub, id) }
      .onFailure { call.respond(HttpStatusCode.BadRequest) }
      .onSuccess { call.respond(HttpStatusCode.OK) }
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
data class AbsenceNewDateDto(
  val hours: Int,
  val type: Int,
  val date: String,
  val mustExcused: Boolean,
  val annotation: String?
)

@Serializable
data class AbsenceUpdateDto(
  val id: Int,
  val isExcused: Boolean,
  val type: Int,
  val mustExcused: Boolean,
  val picture: String?
)

@Serializable
data class AbsenceUnexcusedDto(
  val unexcused: Int
)

@Serializable
data class AbsenceDeleteDto(
  val id: Int
)

@Serializable
data class AbsenceDto(
  val id: Int,
  val date: String,
  val hours: Int,
  val type: Int,
  val mustExcused: Boolean,
  val isExcused: Boolean,
  val annotation: String?,
  val picture: String?,
  val createdAt: String
)
