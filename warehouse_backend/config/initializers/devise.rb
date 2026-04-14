# frozen_string_literal: true

Devise.setup do |config|
  # Mailer
  config.mailer_sender = "no-reply@example.com"

  require "devise/orm/active_record"

  # API-only: skip navigational formats to avoid redirects/CSRF expectations.
  config.skip_session_storage = [:http_auth, :params_auth]
  config.navigational_formats = []

  # JWT configuration
  jwt_secret = ENV["JWT_SECRET_KEY"] || Rails.application.credentials.dig(:jwt_secret_key)
  raise "JWT_SECRET_KEY not set" unless jwt_secret

  config.jwt do |jwt|
    jwt.secret = jwt_secret
    jwt.dispatch_requests = [
      ["POST", %r{^/users/sign_in$}]
    ]
    jwt.revocation_requests = [
      ["DELETE", %r{^/users/sign_out$}]
    ]
    jwt.request_formats = { user: [:json] }
  end
end
