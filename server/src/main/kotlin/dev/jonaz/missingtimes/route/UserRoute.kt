package dev.jonaz.missingtimes.route

import dev.jonaz.missingtimes.domain.ProfilesDomain
import dev.jonaz.missingtimes.persistence.UserPrincipal
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.coroutines.runBlocking
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction
import java.util.*

fun Route.user() {
  val profilesDomain = ProfilesDomain()

  get("/user/profile") {
    val principal = call.authentication.principal<UserPrincipal>()
    val sub = UUID.fromString(principal?.sub)

    transaction {
      runBlocking {
        val query = profilesDomain
          .select { profilesDomain.id eq sub }
          .map {
            mapOf(
              "id" to it[profilesDomain.id].toString(),
              "name" to it[profilesDomain.name]
            )
          }

        if (query.isNotEmpty()) {
          call.respond(query.first())
        } else {
          call.respond(HttpStatusCode.NotFound)
        }
      }
    }
  }
}
