class AddOrganisationToJudgementSet < ActiveRecord::Migration[6.0]
  def change
    add_column :judgement_sets, :organisation, :string
  end
end
