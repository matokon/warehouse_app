# frozen_string_literal: true

module Users
  class SessionsController < Devise::SessionsController
    respond_to :json

    private

    def respond_with(resource, _opts = {})
      render json: { user: user_payload(resource) }, status: :ok
    end

    def respond_to_on_destroy(*)
      if current_user
        render json: { message: "Signed out" }, status: :ok
      else
        render json: { message: "Signed out" }, status: :unauthorized
      end
    end

    def user_payload(user)
      { id: user.id, email: user.email, team_id: user.team_id }
    end
  end
end
