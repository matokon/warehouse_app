class ItemsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_item, only: %i[show update destroy]

  def index
    render json: Item.order(:created_at)
  end

  def show
    render json: @item
  end

  def create
    item = Item.create!(item_params)
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
    @item = Item.find(params[:id])
  end

  def item_params
    params.require(:item)
          .permit(:sku, :name, :description, :unit, :quantity)
  end
end