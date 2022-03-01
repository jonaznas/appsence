package dev.jonaz.missingtimes.service

import dev.jonaz.missingtimes.domain.ProfilesDomain
import dev.jonaz.missingtimes.route.UserProfileDto
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.insertIgnore
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction
import java.sql.Timestamp
import java.util.*
import java.util.regex.Pattern

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

  fun createUserProfile(userProfile: UserProfileDto) = transaction {
    if (isUsernameValid(userProfile.name).not()) {
      throw IllegalArgumentException("Der Name ist ungültig.")
    }

    val insertedCount = profilesDomain.insertIgnore {
      it[profilesDomain.id] = UUID.fromString(userProfile.id)
      it[profilesDomain.name] = userProfile.name
    }.insertedCount

    if (insertedCount == 0) {
      throw IllegalArgumentException("Das Profil wurde bereits eingerichtet.")
    }
  }

  private fun isUsernameValid(username: String): Boolean {
    return Pattern.compile("^[A-z0-9_-]{3,15}\$").matcher(username).matches()
  }
}
