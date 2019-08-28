class Checklists::Action
  attr_accessor :title,
                :consequence,
                :path,
                :lead_time,
                :applicable_criteria,
                :section,
                :guidance_text,
                :guidance_url,
                :guidance_prompt

  def initialize(params)
    @title = params['title']
    @consequence = params['consequence']
    @path = params['path']
    @lead_time = params['lead_time']
    @applicable_criteria = params['applicable_criteria']
    @section = params['section']
    @guidance_text = params['guidance_text']
    @guidance_url = params['guidance_url']
    @guidance_prompt = params['guidance_prompt']
  end

  def applies_to?(criteria_keys)
    applicable_criteria.any? do |key|
      criteria_keys.include?(key)
    end
  end

  def self.find_by_title(title)
    load_all.find { |a| a.title.match(title) }
  end

  def self.load_all
    CHECKLISTS_ACTIONS.map { |a| new(a) }
  end
end
