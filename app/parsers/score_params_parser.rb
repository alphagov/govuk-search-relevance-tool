class ScoreParamsParser
  attr_reader :score_params

  def initialize(params)
    @score_params = params["scores"]
  end

  def attributes
    score_params.each_with_object([]) do |(link_with_index, judgement), scores|
      attrs = link_with_index.split(/(?<=^\d)-/)
      index = attrs[0]
      link = attrs[1]
      scores << { link: link, judgement: judgement, link_position: index }
    end
  end
end
