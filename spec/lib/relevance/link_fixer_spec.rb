require "spec_helper"

RSpec.describe Relevance::LinkFixer do
  context "with bad links in the database" do
    let(:link_fixer) { described_class.new }

    it "#fix" do
      j = JudgementSet.new(query: "p45")
      truncated_link = "/get-paye-forms-p45"
      corrected_link = "/get-paye-forms-p45-p60"
      valid_link = "/paye-forms-p45-p60-p11d"

      s = Score.new(link: truncated_link, link_position: "2", judgement: "bad")
      ss = Score.new(link: valid_link, link_position: "2", judgement: "bad")
      j.scores << s
      j.scores << ss
      j.save!

      url = File.join(Plek.new.website_root + truncated_link)
      stub_request(:get, url)
        .to_return(status: 400)

      url = File.join(Plek.new.website_root + valid_link)
      stub_request(:get, url)
        .to_return(status: 200)

      url = File.join(Plek.new.website_root + corrected_link)
      stub_request(:get, url)
        .to_return(status: 200)

      stub_request(:get, "https://www.gov.uk/api/search.json?q=#{j.query}")
        .to_return(
          status: 200,
          body: "{\"results\":[{\"link\":\"#{corrected_link}\"}]}",
        )
      expect(Score.select(&:invalid_link?).count).to be 1
      expect { link_fixer.fix }.to change { Score.select(&:invalid_link?).count }.by(-1)
    end
  end
end
