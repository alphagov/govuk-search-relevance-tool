class JudgementSet < ApplicationRecord
  has_many :scores, dependent: :destroy
  validates_presence_of :scores
end
