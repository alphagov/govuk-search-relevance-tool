require "spec_helper"

describe BrexitChecker::ResultsAudiences do
  describe "#populate_citizen_groups" do
    living_uk = FactoryBot.build(:brexit_checker_criterion, key: "living-uk")
    visiting_driving = FactoryBot.build(:brexit_checker_criterion, key: "visiting-driving")
    visiting_bring_pet = FactoryBot.build(:brexit_checker_criterion, key: "visiting-bring-pet")
    visiting_eu = FactoryBot.build(:brexit_checker_criterion, key: "visiting-eu")
    visiting_ie = FactoryBot.build(:brexit_checker_criterion, key: "visiting-ie")

    action1_criteria = [{ "all_of" => [living_uk.key] }]
    action1 = FactoryBot.build(:brexit_checker_action, :citizen, title: "action 1", criteria: action1_criteria, grouping_criteria: %w[living-uk])

    action2_criteria = [{ "all_of" => [visiting_driving.key] }]
    action2 = FactoryBot.build(:brexit_checker_action, :citizen, title: "action 2", criteria: action2_criteria, grouping_criteria: %w[visiting-eu])

    action3_criteria = [{ "all_of" => [living_uk.key, visiting_bring_pet.key, { "any_of" => [visiting_eu.key, visiting_ie.key] }] }]
    action3 = FactoryBot.build(:brexit_checker_action, :citizen, title: "action 3", criteria: action3_criteria, grouping_criteria: %w[visiting-eu visiting-ie])

    group_visiting_eu = FactoryBot.build(:brexit_checker_group, key: "visiting-eu", heading: "Visiting the EU", priority: 9)
    group_visiting_ie = FactoryBot.build(:brexit_checker_group, key: "visiting-ie", heading: "Visiting Ireland", priority: 7)
    group_living_uk = FactoryBot.build(:brexit_checker_group, key: "living-uk", heading: "Living in the UK", priority: 6)

    all_actions = [action1, action2, action3]
    all_criteria = [living_uk, visiting_driving, visiting_bring_pet, visiting_eu, visiting_ie]
    all_groups = [group_visiting_eu, group_visiting_ie, group_living_uk]

    before :each do
      allow(BrexitChecker::Action).to receive(:load_all).and_return(all_actions)
      allow(BrexitChecker::Criterion).to receive(:load_all).and_return(all_criteria)
      allow(BrexitChecker::Group).to receive(:load_all).and_return(all_groups)
    end

    context "when actions are provided but there are no criteria" do
      let(:grouped_citizen_actions) { described_class.populate_citizen_groups(all_actions, []) }
      it "returns an empty array" do
        expect(grouped_citizen_actions).to be_empty
      end
    end

    context "when criteria are provided but there are no actions" do
      let(:grouped_citizen_actions) { described_class.populate_citizen_groups([], all_criteria) }
      it "returns an empty array" do
        expect(grouped_citizen_actions).to be_empty
      end
    end

    context "when actions are provided that only have a single grouping criterion" do
      let(:selected_criteria) { [living_uk, visiting_driving] }
      let(:filtered_actions) { [action1, action2] }
      let(:grouped_citizen_actions) { described_class.populate_citizen_groups(filtered_actions, selected_criteria) }
      it "produces an array of group hashes, ordered by priority" do
        grouped_actions_fixture = [
          {
            group: group_visiting_eu,
            actions: [action2],
            criteria: [visiting_driving],
          },
          {
            group: group_living_uk,
            actions: [action1],
            criteria: [living_uk],
          },
        ]
        expect(grouped_citizen_actions).to eq grouped_actions_fixture
      end
    end

    context "when actions have multiple grouping criteria" do
      context "when the user selects ONE of the action's ANY OF criteria" do
        let(:selected_criteria) { [living_uk, visiting_eu, visiting_bring_pet] }
        let(:filtered_actions) { [action1, action3] }
        let(:grouped_citizen_actions) { described_class.populate_citizen_groups(filtered_actions, selected_criteria) }

        it "only shows the groups matching the selected criteria, ordered by priority" do
          grouped_actions_fixture = [
            {
              group: group_visiting_eu,
              actions: [action3],
              criteria: [living_uk, visiting_bring_pet, visiting_eu],
            },
            {
              group: group_living_uk,
              actions: [action1],
              criteria: [living_uk],
            },
          ]
          expect(grouped_citizen_actions).to eq grouped_actions_fixture
        end
      end

      context "when the user selects ALL of the action's ANY OF criteria" do
        let(:selected_criteria) { [living_uk, visiting_eu, visiting_ie, visiting_bring_pet] }
        let(:filtered_actions) { [action1, action3] }
        let(:grouped_citizen_actions) { described_class.populate_citizen_groups(filtered_actions, selected_criteria) }

        it "shows all of the groups that have matching criteria, ordered by priority, and duplicates actions " do
          grouped_actions_fixture = [
            {
              group: group_visiting_eu,
              actions: [action3],
              criteria: [living_uk, visiting_bring_pet, visiting_eu, visiting_ie],
            },
            {
              group: group_visiting_ie,
              actions: [action3],
              criteria: [living_uk, visiting_bring_pet, visiting_eu, visiting_ie],
            },
            {
              group: group_living_uk,
              actions: [action1],
              criteria: [living_uk],
            },
          ]
          expect(grouped_citizen_actions).to eq grouped_actions_fixture
        end
      end
    end
  end
  describe "#populate_business_groups" do
    let(:action1) { FactoryBot.build(:brexit_checker_action, criteria: %w[owns-operates-business-organisation automotive]) }
    let(:action2) { FactoryBot.build(:brexit_checker_action, criteria: %w[aero-space]) }
    let(:action3) { FactoryBot.build(:brexit_checker_action, criteria: %w[forestry]) }
    let(:criteria1) { FactoryBot.build(:brexit_checker_criterion, key: "owns-operates-business-organisation", text: "You own or operate a business or organisation") }
    let(:criteria2) { FactoryBot.build(:brexit_checker_criterion, key: "aero-space", text: "You work in the aerospace and space industry") }
    let(:criteria3) { FactoryBot.build(:brexit_checker_criterion, key: "forestry", text: "You work in plants and forestry") }
    let(:criteria4) { FactoryBot.build(:brexit_checker_criterion, key: "exports-enchanted-goods", text: "You export enchanted amulets") }
    let(:criteria5) { FactoryBot.build(:brexit_checker_criterion, key: "automotive", text: "You work in the automotive industry") }

    let(:selected_criteria) { [criteria1, criteria2, criteria3, criteria4] }
    let(:actions) { [action1, action2, action3] }

    before :each do
      allow(BrexitChecker::Action).to receive(:load_all).and_return([action1, action2, action3])
      allow(BrexitChecker::Criterion).to receive(:load_all).and_return([criteria1, criteria2, criteria3, criteria4, criteria5])
    end

    context "actions are provided but there are no criteria" do
      let(:result) { described_class.populate_business_groups(actions, []) }
      it "returns an empty array" do
        expect(result).to be_empty
      end
    end

    context "criteria are provided but there are no actions" do
      let(:result) { described_class.populate_business_groups([], selected_criteria) }
      it "returns an empty array" do
        expect(result).to be_empty
      end
    end

    context "actions and criteria are provided" do
      let(:result) { described_class.populate_business_groups(actions, selected_criteria) }

      it "produces an hash of actions and criteria" do
        expect(result[:actions]).to eq(actions)
        expect(result[:criteria]).to match_array([criteria1, criteria2, criteria3])
      end
    end
  end
end
