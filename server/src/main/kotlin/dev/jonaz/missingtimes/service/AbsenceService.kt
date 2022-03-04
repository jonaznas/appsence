package dev.jonaz.missingtimes.service

import dev.jonaz.missingtimes.domain.AbsenceDomain
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.transactions.transaction
import java.time.LocalDate
import java.util.*

class AbsenceService {
  private val absenceDomain = AbsenceDomain()

  fun newAbsenceToday(user: UUID, hours: Int, type: Int, mustExcused: Boolean, annotation: String?) = newAbsence(
    user = user,
    date = LocalDate.now(),
    hours = hours,
    type = type,
    mustExcused = mustExcused,
    annotation = annotation
  )

  fun newAbsence(user: UUID, date: LocalDate, hours: Int, type: Int, mustExcused: Boolean, annotation: String?) = transaction {
    absenceDomain.insert {
      it[absenceDomain.user] = user
      it[absenceDomain.hours] = hours
      it[absenceDomain.type] = type
      it[absenceDomain.mustExcused] = mustExcused
      it[absenceDomain.date] = date
      it[absenceDomain.annotation] = annotation
    }
  }


}
