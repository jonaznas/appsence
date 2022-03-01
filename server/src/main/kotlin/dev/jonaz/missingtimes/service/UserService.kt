package dev.jonaz.missingtimes.service

import dev.jonaz.missingtimes.domain.ProfilesDomain
import dev.jonaz.missingtimes.route.UserProfileDto
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction
import java.util.*

class UserService {
  private val profilesDomain = ProfilesDomain()

  fun getUserProfile(id: UUID) = transaction {
    return@transaction profilesDomain
      .select { profilesDomain.id eq id }
      .map {
        UserProfileDto(
          id = it[profilesDomain.id].toString(),
          name = it[profilesDomain.name]
        )
      }
  }
}
