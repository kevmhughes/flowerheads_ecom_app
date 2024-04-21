import createClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  //to inform sanity which project it needs to connect to
  projectId: "4db8s61y",
  //to know if we are in development or production
  dataset: "production",
  //current date
  apiVersion: "2023-09-03",
  useCdn: true,
  //created by me in sanity
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  ignoreBrowserTokenWarning: true,
});

const builder = ImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
