require "spec_helper"

describe Score do
  let(:judgement) { double("judgement") }
  let(:params) { { link: "/govuk/nhs-spending", judgement: "perfect", link_position: 0 } }
  let(:invalid_link_params) { { link: "/bad_link", judgement: "perfect", link_position: 0 } }

  it "#judgement" do
    expect(Score.new(params).judgement).to eq "3"
  end

  it "#invalid_link?" do
    url = File.join(Plek.new.website_root + invalid_link_params[:link])
    stub_request(:get, url).
      to_return(status: 400)

    expect(Score.new(invalid_link_params).invalid_link?).to be true
  end
end
