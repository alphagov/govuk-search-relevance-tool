class CreateScores < ActiveRecord::Migration[6.0]
  def change
    create_table :scores do |t|
      t.string :link, null: false
      t.string :judgement, null: false
      t.integer :link_position, null: false

      t.timestamps
    end
  end
end
