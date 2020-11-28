class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: %i[show update destroy update_password]

  def index
    users = User.all
    render_collection users
  end

  def show
    render_resource @user
  end

  def create
    user = User.new(create_params)
    user.save!
    render_resource user, :create
  end

  def update
    @user.update(user_params)
    render_resource @user
  end

  def update_password
    @user.update_password(update_password_params)
    render_resource @user
  end

  def destroy
    @user.destroy
    head 204
  end

  private

  def create_params
    params.permit(:email, :name, :password, :phone, :address)
  end

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:name, :email, :phone, :address)
  end

  def update_password_params
    params.permit(:old_password, :new_password)
  end
end
