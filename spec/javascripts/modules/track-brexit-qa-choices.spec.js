var $ = window.jQuery

describe('Brexit QA choices tracker', function () {
  var GOVUK = window.GOVUK || {}
  var tracker
  var $element

  beforeEach(function () {
    spyOn(GOVUK.SearchAnalytics, 'trackEvent')

    $element = $(
      '<div>' +
        '<form onsubmit="event.preventDefault()" data-question-key="question-key">' +
          '<div>' +
            '<input name="sector_business_area[]" id="construction" type="checkbox" value="construction">' +
            '<label for="construction">Construction label</label>' +
          '</div>' +
          '<div>' +
            '<input name="sector_business_area[]" id="accommodation" type="checkbox" value="accommodation">' +
            '<label for="accommodation">Accommodation label</label>' +
          '</div>' +
          '<div>' +
            '<input name="sector_business_area[]" type="checkbox" value="furniture">' +
          '</div>' +
          '<button type="submit">Next</button>' +
        '</form>' +
      '</div>'
    )

    tracker = new GOVUK.Modules.TrackBrexitQaChoices()
    tracker.start($element)
  })

  afterEach(function () {
    GOVUK.SearchAnalytics.trackEvent.calls.reset()
  })

  it('tracks checked checkboxes when clicking submit', function () {
    $element.find('input[value="accommodation"]').trigger('click')
    $element.find('input[value="construction"]').trigger('click')
    window.GOVUK.triggerEvent($element.find('form')[0], 'submit')

    expect(GOVUK.SearchAnalytics.trackEvent).toHaveBeenCalledWith(
      'brexit-checker-qa', 'question-key', { transport: 'beacon', label: 'Accommodation label' }
    )
    expect(GOVUK.SearchAnalytics.trackEvent).toHaveBeenCalledWith(
      'brexit-checker-qa', 'question-key', { transport: 'beacon', label: 'Construction label' }
    )
  })

  it('track events sends value of checkbox when no label is set', function () {
    $element.find('input[value="furniture"]').trigger('click')
    window.GOVUK.triggerEvent($element.find('form')[0], 'submit')

    expect(GOVUK.SearchAnalytics.trackEvent).toHaveBeenCalledWith(
      'brexit-checker-qa', 'question-key', { transport: 'beacon', label: 'furniture' }
    )
  })

  it('track event triggered when no choice is made', function () {
    window.GOVUK.triggerEvent($element.find('form')[0], 'submit')

    expect(GOVUK.SearchAnalytics.trackEvent).toHaveBeenCalledWith(
      'brexit-checker-qa', 'question-key', { transport: 'beacon', label: 'no choice' }
    )
  })
})
