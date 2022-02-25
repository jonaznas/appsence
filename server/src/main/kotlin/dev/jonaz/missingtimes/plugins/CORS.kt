package dev.jonaz.missingtimes.plugins

import io.ktor.http.*
import io.ktor.server.plugins.*

fun configureCors(configure: CORS.Configuration) {
  configure.header("Authorization")

  configure.method(HttpMethod.Patch)
  configure.method(HttpMethod.Get)

  configure.allowNonSimpleContentTypes = true

  configure.host(
    host = "localhost:4200",
    schemes = listOf("http")
  )

  configure.host(
    host = "jonaz.dev",
    subDomains = listOf("missing-times"),
    schemes = listOf("https")
  )

  configure.anyHost()
}
