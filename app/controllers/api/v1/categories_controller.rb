module Api::V1
  class CategoriesController < ApplicationController
    before_action :set_category, only: [:show, :update, :destroy]

    def index
      categories = Category.all
      render_collection categories
    end

    def show
      render_resource @category
    end

    def create
      category = Category.new(category_params)
      category.save!
      render_resource(category, :created)
    end

    def update
      @category.update!(category_params)
      render_resource @category
    end

    def destroy
      @category.destroy!
    end

    private
      def set_category
        @category = Category.find(params[:id])
      end

      def category_params
        params.permit(:name, :description)
      end
  end
end
