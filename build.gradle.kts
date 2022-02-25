subprojects {
  buildscript {
    repositories {
      mavenCentral()
      maven { url = uri("https://maven.pkg.jetbrains.space/public/p/ktor/eap") }
    }
  }
}

tasks.create("stage") {
  dependsOn("server:installDist")
}
