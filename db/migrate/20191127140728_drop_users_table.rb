class DropUsersTable < ActiveRecord::Migration[6.0]
  def up
    drop_table :users
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
