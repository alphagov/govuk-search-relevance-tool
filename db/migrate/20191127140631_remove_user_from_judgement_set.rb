class RemoveUserFromJudgementSet < ActiveRecord::Migration[6.0]
  def change
    remove_reference :judgement_sets, :user, null: false, foreign_key: true
  end
end
