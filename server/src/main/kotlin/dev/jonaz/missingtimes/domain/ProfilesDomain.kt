package dev.jonaz.missingtimes.domain

import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.javatime.timestamp

class ProfilesDomain : Table("profiles") {
  val id = uuid("id")

  val updatedAt = timestamp("updated_at")
  val name = text("name")
  val avatarUrl = text("avatar_url")

  override val primaryKey = PrimaryKey(id)
}
