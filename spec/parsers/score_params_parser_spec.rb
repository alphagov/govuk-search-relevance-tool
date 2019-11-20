require "spec_helper"

describe ScoreParamsParser do
  context "external links" do
    it "#attributes" do
      params = {
        "scores" => { "3-https://www.nhs.uk/using-the-nhs/" => "perfect" },
        "org-name" => "defra",
        "query" => "ice cream",
      }
      parser = described_class.new(params)

      expect(parser.attributes).to eq([{ link: "https://www.nhs.uk/using-the-nhs/", judgement: "perfect", link_position: "3" }])
    end
  end

  context "internal links" do
    it "#attributes" do
      params =
        { "scores" =>
          {
            "0-/paye-forms-p45-p60-p11d" => "perfect",
            "1-/get-paye-forms-p45-p60" => "perfect",
            "2-/government/publications/paye-draft-forms-p45" => "perfect",
            "3-/employee-leaving" => "perfect",
            "4-/new-employee" => "perfect",
            "5-/tax-codes" => "perfect",
            "6-/guidance/eu-settlement-scheme-evidence-of-uk-residence" => "perfect",
            "7-/government/publications/paye-starter-checklist" => "perfect",
            "8-/government/statistics/p45-employment-for-offenders-tax-years-200506-to-201112" => "perfect",
            "9-/carers-allowance" => "perfect",
          },
          "org-name" => "gds",
          "query" => "p45" }

      attributes = [
        { link: "/paye-forms-p45-p60-p11d", judgement: "perfect", link_position: "0" },
        { link: "/get-paye-forms-p45-p60", judgement: "perfect", link_position: "1" },
        { link: "/government/publications/paye-draft-forms-p45", judgement: "perfect", link_position: "2" },
        { link: "/employee-leaving", judgement: "perfect", link_position: "3" },
        { link: "/new-employee", judgement: "perfect", link_position: "4" },
        { link: "/tax-codes", judgement: "perfect", link_position: "5" },
        { link: "/guidance/eu-settlement-scheme-evidence-of-uk-residence", judgement: "perfect", link_position: "6" },
        { link: "/government/publications/paye-starter-checklist", judgement: "perfect", link_position: "7" },
        { link: "/government/statistics/p45-employment-for-offenders-tax-years-200506-to-201112", judgement: "perfect", link_position: "8" },
        { link: "/carers-allowance", judgement: "perfect", link_position: "9" },
      ]

      parser = described_class.new(params)

      expect(parser.attributes).to eq(attributes)
    end
  end
end
