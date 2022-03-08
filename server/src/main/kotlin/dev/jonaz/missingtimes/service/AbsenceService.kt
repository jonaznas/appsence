package dev.jonaz.missingtimes.service

import dev.jonaz.missingtimes.domain.AbsenceDomain
import dev.jonaz.missingtimes.route.AbsenceDto
import io.ktor.server.http.*
import org.jetbrains.exposed.sql.and
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.update
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

  fun getAbsencesForDate(user: UUID, date: LocalDate) = transaction {
    absenceDomain.select {
      absenceDomain.user eq user and (absenceDomain.date eq date)
    }.map {
      AbsenceDto(
        id = it[absenceDomain.id],
        date = it[absenceDomain.date].toString(),
        hours = it[absenceDomain.hours],
        type = it[absenceDomain.type],
        mustExcused = it[absenceDomain.mustExcused],
        isExcused = it[absenceDomain.isExcused],
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

  fun getAbsencesHistoryByDays(user: UUID, limit: Int) = transaction {
    absenceDomain.select {
      absenceDomain.user eq user
    }.limit(limit)
      .groupBy { it[absenceDomain.date] }.map { entry ->
        AbsenceDto(
          id = entry.value.first()[absenceDomain.id],
          date = entry.key.toString(),
          hours = entry.value.sumOf { it[absenceDomain.hours] },
          type = entry.value.first()[absenceDomain.type],
          mustExcused = entry.value.first()[absenceDomain.mustExcused],
          isExcused = entry.value.first()[absenceDomain.isExcused],
          annotation = entry.value.first()[absenceDomain.annotation],
          createdAt = entry.value.first()[absenceDomain.createdAt].toString()
        )
      }.sortedByDescending {
        it.date
      }
  }

  fun updateAbsence(user: UUID, id: Int, isExcused: Boolean) = transaction {
    absenceDomain.update({ absenceDomain.user eq user and (absenceDomain.id eq id) }) {
      it[absenceDomain.isExcused] = isExcused
    }
  }
}
