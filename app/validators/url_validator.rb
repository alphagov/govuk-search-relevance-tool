require "faraday"
require "uri"

class UrlValidator
  attr_reader :link

  def initialize(link)
    @link = link
  end

  def bad_link?
    error_codes.include?(status_code)
  end

private

  def connection
    @connection ||= Faraday.new
  end

  def status_code
    connection.get(absolute_link).status
  end

  def error_codes
    (400..599).to_a
  end

  def absolute_link
    uri = URI(link)
    uri.host ? link : File.join(Plek.new.website_root + link)
  end
end
