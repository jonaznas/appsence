package dev.jonaz.appsence.plugins

import io.ktor.http.*
import io.ktor.server.plugins.*

fun configureCors(configure: CORS.Configuration) {
  configure.header("Authorization")

  configure.method(HttpMethod.Post)
  configure.method(HttpMethod.Patch)
  configure.method(HttpMethod.Get)
  configure.method(HttpMethod.Put)

  configure.allowNonSimpleContentTypes = true

  configure.host(
    host = "localhost:4200",
    schemes = listOf("http")
  )

  configure.host(
    host = "appsence.tech",
    schemes = listOf("https")
  )

  configure.anyHost()
}
