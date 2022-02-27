package dev.jonaz.missingtimes.route

import dev.jonaz.missingtimes.domain.ProfilesDomain
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.coroutines.runBlocking
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction

fun Route.test() {
  val profilesDomain = ProfilesDomain()

  get("/test") {
    transaction {
      runBlocking {
        val query = profilesDomain.select { profilesDomain.name eq "Jonas" }

        if (query.count() > 0) {
          call.respondText("Found")
        } else {
          call.respondText("Not found")
        }
      }
    }
  }
}
