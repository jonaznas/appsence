package dev.jonaz.missingtimes.service

import dev.jonaz.missingtimes.domain.AbsenceDomain
import dev.jonaz.missingtimes.route.AbsenceDto
import org.jetbrains.exposed.sql.and
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.select
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

  fun newAbsence(user: UUID, date: LocalDate, hours: Int, type: Int, mustExcused: Boolean, annotation: String?) =
    transaction {
      absenceDomain.insert {
        it[absenceDomain.user] = user
        it[absenceDomain.hours] = hours
        it[absenceDomain.type] = type
        it[absenceDomain.mustExcused] = mustExcused
        it[absenceDomain.date] = date
        it[absenceDomain.annotation] = annotation
      }
    }

  fun getAbsences(user: UUID, date: LocalDate) = transaction {
    absenceDomain.select {
      absenceDomain.user eq user and (absenceDomain.date eq date)
    }.map {
      AbsenceDto(
        date = it[absenceDomain.date].toString(),
        hours = it[absenceDomain.hours],
        type = it[absenceDomain.type],
        mustExcused = it[absenceDomain.mustExcused],
        annotation = it[absenceDomain.annotation],
        createdAt = it[absenceDomain.createdAt].toString()
      )
    }
  }

  fun getAbsenceHoursForDate(user: UUID, date: LocalDate) = transaction {
    absenceDomain.select {
      absenceDomain.user eq user and (absenceDomain.date eq date)
    }.sumOf {
      it[absenceDomain.hours]
    }
  }
}
