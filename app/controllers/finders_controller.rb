class FindersController < ApplicationController
  layout "finder_layout"

  before_action do
    set_expiry(content_item)
  end

  def show
    slimmer_template "gem_layout_full_width" if i_am_a_topic_page_finder

    respond_to do |format|
      format.html do
        raise UnsupportedContentItem unless content_item.is_finder?

        show_page_variables
      end
      unless Rails.configuration.relevancy_prototype
        format.json do
          @search_query = initialize_search_query
          if content_item.is_search? || content_item.is_finder?
            @spelling_suggestion_presenter = spelling_suggestion_presenter
            render json: json_response
          else
            render json: {}, status: :not_found
          end
        end
      end
      format.atom do
        if content_item.is_redirect?
          redirect_to_destination
        else
          @search_query = initialize_search_query(is_for_feed: true)
          @feed = AtomPresenter.new(content_item, results, facet_tags)
        end
      end
    end
  rescue ActionController::UnknownFormat
    render plain: "Not acceptable", status: :not_acceptable
  rescue UnsupportedContentItem
    render plain: "Not found", status: :not_found
  end

  def show_page_variables
    @search_query = initialize_search_query
    @breadcrumbs = fetch_breadcrumbs
    @parent = parent
    @sort_presenter = sort_presenter
    @pagination = pagination_presenter
    @spelling_suggestion_presenter = spelling_suggestion_presenter
  end

private

  class UnsupportedContentItem < StandardError; end

  attr_reader :search_query

  helper_method :facet_tags, :i_am_a_topic_page_finder, :result_set_presenter, :content_item, :signup_links, :filter_params, :facets

  def redirect_to_destination
    @redirect = content_item.redirect
    @finder_slug = finder_slug
    render "finders/show_redirect"
  end

  def json_response
    {
      total: result_set_presenter.total_count,
      display_total: result_set_presenter.displayed_total,
      facet_tags: render_component("finders/facet_tags", facet_tags.present),
      search_results: render_component("finders/search_results", result_set_presenter.search_results_content),
      display_selected_facets_count: facet_tags.display_total_selected_filters,
      sort_options_markup: render_component("finders/sort_options", sort_presenter.to_hash),
      next_and_prev_links: render_component("govuk_publishing_components/components/previous_and_next_navigation", pagination_presenter.next_and_prev_links),
      suggestions: render_component("finders/spelling_suggestion", suggestions: spelling_suggestion_presenter.suggestions),
      errors: search_query.errors_hash,
    }
  end

  def render_component(partial, locals)
    (render_to_string(formats: %i[html], partial: partial, locals: locals) || "").squish
  end

  def result_set_presenter
    @result_set_presenter ||= ResultSetPresenter.new(
      content_item,
      facets,
      results,
      filter_params,
      sort_presenter,
      content_item.metadata_class,
      debug_score: debug_score?,
      include_ecommerce: include_ecommerce?,
    )
  end

  def results
    @results ||= ResultSetParser.parse(search_results)
  end

  def facets
    @facets ||= FacetsBuilder.new(content_item: content_item, search_results: search_results, value_hash: filter_params).facets
  end

  def signup_links
    @signup_links ||= SignupLinksPresenter.new(content_item, facets, keywords).signup_links
  end

  def initialize_search_query(is_for_feed: false)
    Search::Query.new(
      content_item,
      filter_params,
      override_sort_for_feed: is_for_feed,
      ab_params: {},
    )
  end

  def content_item_with_search_results
    @content_item_with_search_results ||= search_query.content_item_with_search_results
  end

  def fetch_breadcrumbs
    parent_slug = params["parent"]
    org_info = organisation_registry[parent_slug] if parent_slug.present?
    FinderBreadcrumbsPresenter.new(org_info, content_item)
  end

  def sort_presenter
    @sort_presenter ||= content_item.sorter_class.new(content_item, filter_params)
  end

  def pagination_presenter
    PaginationPresenter.new(
      per_page: content_item.default_documents_per_page,
      start_offset: search_results["start"],
      total_results: search_results["total"],
      url_builder: finder_url_builder,
    )
  end

  def search_results
    search_query.search_results
  end

  def spelling_suggestion_presenter
    suggested_queries = search_results.fetch("suggested_queries", [])
    SpellingSuggestionPresenter.new(
      suggested_queries,
      finder_url_builder.url(keywords: (suggested_queries.first || {})["text"]),
      # Search api is set to always return an array with one item
      content_item.as_hash["base_path"],
    )
  end

  def finder_url_builder
    UrlBuilder.new(content_item.base_path, filter_params)
  end

  def parent
    params.fetch(:parent, "")
  end

  def keywords
    filter_params["keywords"].presence
  end

  def facet_tags
    @facet_tags ||= FacetTagsPresenter.new(
      facets.select(&:filterable?),
      sort_presenter,
      i_am_a_topic_page_finder: i_am_a_topic_page_finder,
    )
  end

  def i_am_a_topic_page_finder
    @i_am_a_topic_page_finder ||= taxonomy_registry.taxonomy.key? params[:topic]
  end

  def taxonomy_registry
    Services.registries.all["full_topic_taxonomy"]
  end

  def organisation_registry
    Services.registries.all["organisations"]
  end

  def debug_score?
    params[:debug_score]
  end

  def include_ecommerce?
    # these pages cause a javascript error because of the number of
    # results, so disable ecommerce until we have a proper solution to
    # splitting big GA requests.
    %w[
      /government/groups
      /world/organisations
      /government/organisations/hm-revenue-customs/contact
    ].exclude?(content_item.base_path)
  end
end
