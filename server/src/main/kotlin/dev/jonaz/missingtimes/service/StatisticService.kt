package dev.jonaz.missingtimes.service

import dev.jonaz.missingtimes.domain.AbsenceDomain
import org.jetbrains.exposed.sql.SortOrder
import org.jetbrains.exposed.sql.and
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction
import java.time.LocalDate
import java.time.chrono.ChronoLocalDate
import java.util.*

class StatisticService {
  private val absenceDomain = AbsenceDomain()

  fun countHoursOfLastDays(user: UUID, days: Int) = transaction {
    absenceDomain.select {
      absenceDomain.user eq user
    }.orderBy(absenceDomain.date, SortOrder.DESC)
      .filter { it[absenceDomain.date] >= LocalDate.now().minusDays(days.toLong()) }
      .sumOf {
        it[absenceDomain.hours]
      }
  }

  fun countAllHours(user: UUID) = transaction {
    absenceDomain.select {
      absenceDomain.user eq user
    }.sumOf {
      it[absenceDomain.hours]
    }
  }

  fun countAllHoursOfThisYear(user: UUID) = transaction {
    absenceDomain.select {
      absenceDomain.user eq user
    }.filter {
      it[absenceDomain.date].year == Calendar.getInstance().get(Calendar.YEAR)
    }.sumOf {
      it[absenceDomain.hours]
    }
  }
}
