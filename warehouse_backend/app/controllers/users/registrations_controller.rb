# frozen_string_literal: true

module Users
  class RegistrationsController < Devise::RegistrationsController
    before_action :configure_sign_up_params
    respond_to :json

    private

    def sign_up(*)

    end

    def configure_sign_up_params
      devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
    end

    def respond_with(resource, _opts = {})
      if resource.persisted?
        render json: { user: user_payload(resource) }, status: :created
      else
        render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def user_payload(user)
      { id: user.id, email: user.email }
    end
  end
end