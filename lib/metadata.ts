export const genericMetadata = {
  openGraph: {
    type: "website",
    url: "https://danieljorge.me",
    title: "Daniel Jorge",
    description: "Frontend Engineer",
    siteName: "Daniel Jorge",
    images: [
      {
        url: "https://danieljorge.me/api/og?title=Daniel+Jorge&description=Frontend+Engineer&type=home",
        width: 1200, // width: 1920,
        height: 630, // height: 1080,
        type: "image/png",
        // alt: "", //@TODO: redesign og first
      },
    ],
    locale: "en-US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@danieljpgo",
    creator: "@danieljpgo",
    title: "Daniel Jorge",
    description: "Frontend Engineer",
    images: {
      url: "https://danieljorge.me/api/og?title=Daniel+Jorge&description=Frontend+Engineer&type=home",
      type: "image/png",
      // alt: "", //@TODO: redesign og first
    },
    // creatorId: "",
    // siteId: '',
  },
};
