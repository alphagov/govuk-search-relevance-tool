require "spec_helper"

describe RelevancyController, type: :controller do
  it "it creates judgements" do
    params = {
      "scores" => { "0-/government/publications/code-of-practice-on-noise-from-ice-cream-van-chimes" => "perfect",
                  "1-/government/publications/impulse-ice-cream-undertakings" => "good",
                  "2-/paye-forms-p45-p60-p11d" => "bad",
                  "3-https://www.nhs.uk/using-the-nhs/" => "perfect" },
      "org-name" => "defra",
      "query" => "ice cream",
    }

    expect { post :create, params: params }.to change(JudgementSet, :count).by(1)
    expect(JudgementSet.last.scores.count).to eq 4
  end

  it "doesn't create judgements with empty params" do
    expect { post :create, params: {} }.to_not(change { Score.count })
    expect { post :create, params: {} }.to_not(change { JudgementSet.count })
  end
end
