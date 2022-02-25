package dev.jonaz.missingtimes.route

import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.test() {
  get("/test") {
    call.respondText("Hey there!")
  }
}
