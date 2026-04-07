class ApplicationController < ActionController::API
  respond_to :json

  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable

  private

  def render_not_found(error)
    render json: { error: error.message }, status: :not_found
  end

  def render_unprocessable(error)
    render json: { error: error.record.errors.full_messages }, status: :unprocessable_entity
  end

end
