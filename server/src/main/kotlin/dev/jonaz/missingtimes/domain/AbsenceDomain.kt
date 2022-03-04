package dev.jonaz.missingtimes.domain

import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.javatime.date
import org.jetbrains.exposed.sql.javatime.timestamp

class AbsenceDomain : Table("absence") {
  val id = integer("id")

  val user = uuid("user")
  val hours = integer("hours")
  val type = integer("type")
  val mustExcused = bool("must_excused")
  val date = date("date")
  val annotation = text("annotation").nullable()
  val createdAt = timestamp("created_at")

  override val primaryKey = PrimaryKey(id)
}
