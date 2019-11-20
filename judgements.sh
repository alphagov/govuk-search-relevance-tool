#!/bin/bash
LOCAL_DATABASE="`date +%d_%m_%y_%H%M%S`"
heroku pg:pull postgresql-triangular-56729 $LOCAL_DATABASE --app search-result-relevancy
echo '... database dump complete'
`mkdir -p ~/tmp/relevancy_judgements`
echo '... exporting pg database to csv'
QUERY="SELECT judgement_sets.id, query, link, link_position, judgement, judgement_sets.created_at FROM scores, judgement_sets WHERE judgement_set_id = judgement_sets.id;"
psql -d"$LOCAL_DATABASE" -A -F"," -c"$QUERY" > ~/tmp/relevancy_judgements/$LOCAL_DATABASE.csv
echo '... complete!'
