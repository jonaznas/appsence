package dev.jonaz.appsence.persistence

import io.ktor.server.auth.*
import kotlinx.serialization.Serializable

@Serializable
data class UserPrincipal(
    val email: String,
    val sub: String
): Principal
