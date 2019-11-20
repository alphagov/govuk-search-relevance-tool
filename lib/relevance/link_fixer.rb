module Relevance
  class LinkFixer
    def fix
      i = 0
      fixed = []
      dups = []
      not_fixed = []
      puts "#{Score.count} scores in the database."
      puts "Counting truncated links..."
      puts "#{scores_with_invalid_links.count} are truncated"
      puts "------"
      scores_with_invalid_links.each do |score|
        q = JudgementSet.find(score.judgement_set_id).query
        fresh_links = search_results(q)
        candidate_link = fresh_links.select { |link| link.match(score.link) }
        if candidate_link.count == 1
          puts "updating score with id: #{score.id}"
          puts "bad link: #{score.link}"
          score.update(link: candidate_link[0])
          fixed << score
          puts "fixed link: #{score.link}"
          puts "---"
        elsif candidate_link.count > 1
          dups << score
          puts "score with id: #{score.id} has duplicate candidate links, not updated"
          puts "---"
        else
          not_fixed << score
          i += 1
        end
      end
      puts "#{fixed.count} scores fixed. ID's: #{fixed.pluck(:id)}"
      puts "#{dups.count} scores had duplicate links. ID's: #{dups.pluck(:id)}"
      puts "#{i} scores had no candidate links. ID's: #{not_fixed.pluck(:id)}"
    end

  private

    def search_results(query)
      response = Faraday.get "https://www.gov.uk/api/search.json?q=#{query}"
      body = JSON.parse(response.body)
      body["results"].map do |result|
        result["link"]
      end
    end

    def scores_with_invalid_links
      @scores_with_invalid_links ||= Score.select(&:invalid_link?)
    end
  end
end
