web: bundle exec unicorn -c ./config/unicorn.rb -p ${PORT:-3062}
web: rake db:migrate && bin/rails server
