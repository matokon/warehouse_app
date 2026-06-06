class TeamsController < ApplicationController
  before_action :authenticate_user!

  def show
    render json: current_user.team
  end

  def create
    team = Team.create!(
        name: params[:name],
        access_code: SecureRandom.alphanumeric(6).upcase,
        owner: current_user
    )
    current_user.update!(team: team)
    render json: team, status: :created
  end

  def join
    team = Team.find_by!(access_code: params[:access_code])
    current_user.update!(team: team)
    render json: team
  end
  
  def leave
    current_user.update!(team: nil)
    head :no_content
  end
end