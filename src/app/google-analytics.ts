export class GoogleAnalytics {

  private static googleAnalytics(...fields: any[]): void {
    (window as any).ga(...fields);
  }

  public static sendPageViewForPage(nomePage: string): void {
    // https://developers.google.com/analytics/devguides/collection/analyticsjs/single-page-applications?hl=pt-br
    GoogleAnalytics.googleAnalytics('set', 'page', nomePage);
    GoogleAnalytics.googleAnalytics('send', 'pageview');
  }

  public static sendEvent(eventCategory: string, eventAction: string, eventLabel: string): void {
    console.log('evento', eventCategory, eventAction, eventLabel);
    // https://developers.google.com/analytics/devguides/collection/analyticsjs/events?hl=pt-br
    GoogleAnalytics.googleAnalytics('send', {
      hitType: 'event',
      eventCategory: eventCategory, // 'Videos'
      eventAction: eventAction, // 'Play'
      eventLabel: eventLabel // 'Fall Campaign'
    });
  }

}

