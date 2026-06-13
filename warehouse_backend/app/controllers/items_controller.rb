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
    Activity.create!(
      action: :created,
      quantity_change: -item.quantity,
      item_name: item.name,
      user_id: current_user.id,
      team_id: current_user.team_id
    )
    render json: item, status: :created
  end

  def update
    old_quantity = @item.quantity
    @item.update!(item_params)
     Activity.create!(
      action: :picked,
      quantity_change: @item.quantity - old_quantity,
      item_name: @item.name,
      user_id: current_user.id,
      team_id: current_user.team_id
    )
    render json: @item
  end

  def destroy
    Activity.create!(
      action: :deleted,
      quantity_change: -@item.quantity,
      item_name: @item.name,
      user_id: current_user.id,
      team_id: current_user.team_id
    )
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