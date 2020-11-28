class ApplicationController < ActionController::API
  include ExceptionHandler
  include JsonResponseHandler
end
