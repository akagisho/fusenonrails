class CreateStickies < ActiveRecord::Migration
  def change
    create_table :stickies do |t|
      t.integer :top
      t.integer :left
      t.string :comment

      t.timestamps
    end
  end
end
