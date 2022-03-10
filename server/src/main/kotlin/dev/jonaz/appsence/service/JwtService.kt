package dev.jonaz.appsence.service

import com.auth0.jwt.JWT
import com.auth0.jwt.JWTVerifier
import com.auth0.jwt.algorithms.Algorithm

class JwtService {
  private var secret: String = System.getenv("JWT_SECRET")

  fun getVerifier(): JWTVerifier = JWT
    .require(
      Algorithm.HMAC256(secret)
    )
    .build()
}
