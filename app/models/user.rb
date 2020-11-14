class User < ApplicationRecord
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i.freeze
  validates :email, presence: true, length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: false }
  validates :name, presence: true, length: { in: 2..30 }
  VALID_PHONE_NUMBER_REGEX = /\d[0-9]\)*\z/.freeze
  validates :phone, presence: true, allow_nil: true, length: { maximum: 25 },
                            format: { with: VALID_PHONE_NUMBER_REGEX }
  attr_accessor :password

  PASSWORD_FORMAT = /\A(?!.*\s)/x.freeze
  validates :password, presence: true, length: { in: 6..40 },
                            format: { with: PASSWORD_FORMAT }, on: %i[create account_setup]
  before_create :encrypt_password

  def update_password(password_params)
    raise(ArgumentError, 'Your password was incorrect.') unless check_valid_password(password_params[:old_password])

    self.password = password_params[:new_password]
    raise(ArgumentError, errors.messages) unless valid?(:account_setup)

    encrypt_password
    save!
  end

  def encrypt_password
    self.encrypted_password = User.generate_encrypted_password(password)
  end

  def self.generate_encrypted_password(password, password_salt = BCrypt::Engine.generate_salt)
    BCrypt::Engine.hash_secret(password, password_salt)
  end

  def check_valid_password(password)
    encrypted_password == User.generate_encrypted_password(password, encrypted_password.first(29))
  end
end
