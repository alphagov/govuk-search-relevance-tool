class Score < ApplicationRecord
  belongs_to :judgement_set
  validates :link, :judgement, :link_position, presence: true
  SCORES = { "perfect" => 3, "good" => 2, "ok" => 1, "bad" => 0 }.freeze

  def judgement=(user_input)
    write_attribute :judgement, SCORES[user_input]
  end

  def invalid_link?
    UrlValidator.new(self.link).bad_link?
  end
end
