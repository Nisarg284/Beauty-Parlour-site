import { StudioHead } from "next-sanity/studio/head";

export default function StudioHeadPage() {
  return (
    <>
      <StudioHead title="Amara Atelier CMS Studio" />
      <link rel="icon" type="image/png" sizes="32x32" href="https://www.sanity.io/static/images/favicons/favicon-32x32.png" />
    </>
  );
}
