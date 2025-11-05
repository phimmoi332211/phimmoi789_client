// import { fetchMetaDomain } from "@/help/helper";
import Script from "next/script";

export default async function Head() {
  // const domain = process.env.NEXT_PUBLIC_DOMAIN;
  // const meta: any = await fetchMetaDomain(domain); // SSR call API here

  return (
    <head>
      <link rel="stylesheet" href="/css/cfb18acb3accb3c3.css" />
      <link rel="stylesheet" href="/css/b7b3b81f46f2a6c5.css" />
      <link rel="stylesheet" href="/css/9ae45487d06bebbd.css?t=1" />
      <link rel="stylesheet" href="/css/f1f472f6289354a3.css" />
      <link rel="stylesheet" href="/css/3492437ba4e38966.css" />
      <link rel="stylesheet" href="/css/3e0843a06d16a658.css" />
      <link rel="stylesheet" href="/css/2f1550876c0c97ad.css" />
      <link rel="stylesheet" href="/css/5c4826c56b72a529.css" />
      <link rel="stylesheet" href="/css/all.min.css" />
      <link rel="stylesheet" href="/css/global.css" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
      />

      {/* <title>{meta?.data?.title}</title>
            <meta name="description" content={meta?.data?.description} />
            <meta name="keywords" content={`${meta?.data?.title}`} />
            <meta property="og:title" content={meta?.data?.title} />
            <meta property="og:description" content={meta?.data?.description || ""} />
            <meta property="og:type" content="video.movie" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={meta?.data?.title} />
            <meta name="twitter:description" content={meta?.data?.description || ""} />
            <meta name="google-site-verification" content={meta?.data?.googleSiteVerification || ""}></meta> */}
      <Script id="swg-init" strategy="afterInteractive">
        {`(self.SWG_BASIC = self.SWG_BASIC || []).push(function(basicSubscriptions) {
              basicSubscriptions.init({
                type: "NewsArticle",
                isPartOfType: ["Product"],
                isPartOfProductId: "CAow1pa6DA:openaccess",
                clientOptions: { theme: "light", lang: "vi" }
              });
          });`}
      </Script>
    </head>
  );
}
