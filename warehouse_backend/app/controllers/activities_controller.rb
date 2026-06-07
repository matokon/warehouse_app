class ActivitiesController < ApplicationController
    before_action :authenticate_user!
    
    def index
        activities = current_user.team.activities.order(created_at: :desc)
        render json: activities.as_json(methods: :user_name)
    end
end
