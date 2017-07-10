export class GoogleAnalytics {

  private static googleAnalytics(...fields: any[]): void {
    (window as any).ga(...fields);
  }

  public static sendPageViewForPage(nomePage: string): void {
    // https://developers.google.com/analytics/devguides/collection/analyticsjs/single-page-applications?hl=pt-br
    GoogleAnalytics.googleAnalytics('set', 'page', nomePage);
    GoogleAnalytics.googleAnalytics('send', 'pageview');
  }

}

