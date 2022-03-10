package dev.jonaz.appsence.route

import dev.jonaz.appsence.persistence.UserPrincipal
import dev.jonaz.appsence.service.StatisticService
import dev.jonaz.appsence.util.extension.genericInject
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.util.*
import kotlinx.serialization.Serializable
import java.util.*

fun Route.statistic() {
  val statisticService by genericInject<StatisticService>()

  get("/statistic/hours-by-days") {
    val principal = call.authentication.principal<UserPrincipal>()
    val sub = UUID.fromString(principal?.sub)
    val daysParam = call.request.queryParameters.getOrFail("days")

    kotlin.runCatching { statisticService.countHoursOfLastDays(sub, daysParam.toInt()) }
      .onFailure { call.respond(HttpStatusCode.BadRequest) }
      .onSuccess { call.respond(StatisticHoursDto(it)) }
  }

  get("/statistic/all-hours") {
    val principal = call.authentication.principal<UserPrincipal>()
    val sub = UUID.fromString(principal?.sub)

    kotlin.runCatching { statisticService.countAllHours(sub) }
      .onFailure { call.respond(HttpStatusCode.BadRequest) }
      .onSuccess { call.respond(StatisticHoursDto(it)) }
  }

  get("/statistic/year-hours") {
    val principal = call.authentication.principal<UserPrincipal>()
    val sub = UUID.fromString(principal?.sub)

    kotlin.runCatching { statisticService.countAllHoursOfThisYear(sub) }
      .onFailure { call.respond(HttpStatusCode.BadRequest) }
      .onSuccess { call.respond(StatisticHoursDto(it)) }
  }
}

@Serializable
data class StatisticHoursDto(
  val hours: Int
)
