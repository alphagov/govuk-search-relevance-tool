class SearchController < ApplicationController
  layout "search_layout"

  def index
    search_params = SearchParameters.new(params)

    @content_item = ContentItem.from_content_store("/search")
    set_expiry(@content_item)

    # Redirect all requests to all content finder, where either search params have been supplied or the user is
    # requesting the JSON endpoint.
    if !search_params.no_search? || params[:format] == "json"
      redirect_to_all_content_finder(search_params) && return
    end
    if Rails.configuration.relevancy_prototype
      session[:first_view] ||= "true"
      if params.has_key?(:q) && params[:q].blank?
        flash.now[:alert] = "no-term"
        render(action: "no_search_term")
      else
        render(action: "no_search_term") && return
      end
    else
      render(action: "no_search_term") && return
    end
  end

protected

  def fill_in_slimmer_headers(result_count)
    set_slimmer_headers(
      result_count: result_count,
      section: "search",
    )
  end

  def redirect_to_all_content_finder(search_params)
    all_content_params = {
      keywords: search_params.search_term,
      organisations: params["filter_organisations"],
      manual: params["filter_manual"],
      format: params["format"],
      order: "relevance",
    }.compact

    redirect_to(finder_path("search/all", params: all_content_params), status: :moved_permanently)
  end
end
