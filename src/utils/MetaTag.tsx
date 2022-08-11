import { Helmet } from "react-helmet-async";

export interface Tags {
  tags: {
    title: string;
    description: string;
    image: string;
    url: string;
  };
}
export default function MetaTag({ tags }: Tags) {
  const { title, description, image, url } = tags;
  return (
    <Helmet>
      <meta property="og:title" content={title} data-rh="true" />
      <meta property="og:description" content={description} data-rh="true" />
      <meta property="og:image" content={image} data-rh="true" />
      <meta property="og:url" content={url} data-rh="true" />
    </Helmet>
  );
}
