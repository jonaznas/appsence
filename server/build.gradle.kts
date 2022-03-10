val ktor_version: String by project
val kotlin_version: String by project
val logback_version: String by project
val gotrue_version: String by project
val koin_version: String by project
val exposed_version: String by project
val hikari_version: String by project
val classindex_version: String by project
val postgresql_version: String by project

plugins {
    application
    kotlin("jvm") version "1.6.10"
    id("org.jetbrains.kotlin.plugin.serialization") version "1.6.10"
}

group = "dev.jonaz.appsence"
version = "0.0.1"

setBuildDir("../build")

application {
    mainClass.set("dev.jonaz.appsence.AppsenceKt")
}

repositories {
    mavenCentral()
    maven { url = uri("https://maven.pkg.jetbrains.space/public/p/ktor/eap") }
}

dependencies {
    implementation("io.ktor", "ktor-server-core-jvm", ktor_version)
    implementation("io.ktor", "ktor-server-locations-jvm", ktor_version)
    implementation("io.ktor", "ktor-server-cors-jvm", ktor_version)
    implementation("io.ktor", "ktor-server-content-negotiation-jvm", ktor_version)
    implementation("io.ktor", "ktor-serialization-kotlinx-json-jvm", ktor_version)
    implementation("io.ktor", "ktor-server-netty-jvm", ktor_version)
    implementation("io.ktor", "ktor-server-auth-jvm", ktor_version)
    implementation("io.ktor", "ktor-server-auth-jwt-jvm", ktor_version)

    implementation("io.insert-koin", "koin-core", koin_version)

    implementation("org.jetbrains.exposed", "exposed-core", exposed_version)
    implementation("org.jetbrains.exposed", "exposed-dao", exposed_version)
    implementation("org.jetbrains.exposed", "exposed-jdbc", exposed_version)
    implementation("org.jetbrains.exposed", "exposed-java-time", exposed_version)
    implementation("com.zaxxer", "HikariCP", hikari_version)
    implementation("org.postgresql", "postgresql", postgresql_version)

    implementation("org.atteo.classindex", "classindex", classindex_version)
    implementation("ch.qos.logback", "logback-classic", logback_version)

    testImplementation("io.ktor", "ktor-server-tests-jvm", ktor_version)
    testImplementation("org.jetbrains.kotlin", "kotlin-test-junit", kotlin_version)
}
