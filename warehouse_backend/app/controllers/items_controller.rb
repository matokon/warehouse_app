class ItemsController < ApplicationController
  before_action :authenticate_user!
  before_action :require_team
  before_action :set_item, only: %i[show update destroy]

  def index
    render json: current_user.team.items
  end

  def show
    render json: @item
  end

  def create
    item = current_user.team.items.create!(item_params)
    render json: item, status: :created
  end

  def update
    @item.update!(item_params)
    render json: @item
  end

  def destroy
    @item.destroy!
    head :no_content
  end

  private

  def set_item
    @item = current_user.team.items.find(params[:id])
  end

  def require_team
    unless current_user.team
      render json: {error: "You had to join a team first."}, status: :forbidden
    end 
  end

  def item_params
    params.require(:item)
          .permit(:name, :description, :unit, :quantity)
  end
end