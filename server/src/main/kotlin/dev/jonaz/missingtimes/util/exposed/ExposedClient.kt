package dev.jonaz.missingtimes.util.exposed

import com.zaxxer.hikari.HikariDataSource
import org.jetbrains.exposed.sql.Database
import java.sql.Connection

class ExposedClient {
  companion object {
    private lateinit var connection: Connection
  }

  fun connect(dataSource: HikariDataSource) = Database
    .connect(dataSource)
    .let {
      connection = dataSource.connection
    }
}
