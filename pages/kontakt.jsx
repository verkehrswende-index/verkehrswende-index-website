import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";

const Contact = () => (
  <Layout>
    <Head>
      <title>{siteTitle("Kontakt")}</title>
    </Head>
    <h1>Kontakt</h1>

    <p>
      Der Verkehrswende-Index wird entwickelt von{" "}
      <a href="https://utopicode.de" target="_blank" rel="noreferrer">
        Christian Neumann
      </a>
      . Am besten erreicht ihr mich unter meiner E-Mail-Adresse.
    </p>

    <p>
      <strong>E-Mail:</strong>
      <br />
      <a href="mailto:christian@utopicode.de">christian@utopicode.de</a>
    </p>

    <p>
      <strong>Anschrift:</strong>
      <br />
      Christian Neumann
      <br />
      Eiserne Hand 9<br />
      60318 Frankfurt am Main
      <br />
    </p>

    <p>
      <strong>Telefon:</strong>
      <br />
      (0176) 3018 3014
      <br />
      (Mo-Fr 14-16 Uhr)
    </p>
  </Layout>
);

export default Contact;
