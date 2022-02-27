package dev.jonaz.missingtimes.util.exposed

import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource

class HikariSourceConfig {
  companion object {
    private val dbHost: String? = System.getenv("DATABASE_HOST")
    private val dbPort: String? = System.getenv("DATABASE_PORT")
    private val dbName: String? = System.getenv("DATABASE_NAME")
    private val dbUser: String? = System.getenv("DATABASE_USER")
    private val dbPass: String? = System.getenv("DATABASE_PASS")
    private val url = "jdbc:postgresql://$dbHost:$dbPort/$dbName"

    private lateinit var config: HikariConfig

    fun createDataSource(): HikariDataSource {

      config = HikariConfig()
      config.jdbcUrl = url
      config.username = dbUser
      config.password = dbPass
      config.driverClassName = "org.postgresql.Driver"
      config.maximumPoolSize = 10

      return HikariDataSource(config)
    }
  }
}
