import Head from "next/head";
import Layout, { siteTitle } from "../../../../components/layout";

const __ = (x, y) => x;

import Analysis from "../../../../components/analysis";
import registeredAnalysis from "lib/analysis/registered.ts";

import config from "../../../../config.json5";

import { fetchIndex, fetchArea } from "lib/data.ts";

const Contact = ({ data, area, analysis }) => {
  return (
    <Layout>
      <Head>
        <title>{`${registeredAnalysis[analysis.slug].title} in ${siteTitle(
          data.name
        )}`}</title>
      </Head>
      <Analysis
        id={analysis.slug}
        data={analysis.data}
        areaId={area}
        areaConfig={data}
        className="mb-5"
      />
    </Layout>
  );
};

export default Contact;

export async function getStaticPaths() {
  const data = await fetchIndex();
  const paths = data.areas
    .map((area) => {
      return Object.keys(registeredAnalysis).map((slug) => ({
        params: {
          area: area.slug,
          slug,
        },
      }));
    })
    .flat(1);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const data = await fetchArea(params.area);
  return {
    props: {
      data,
      area: params.area,
      analysis: {
        slug: params.slug,
        data: data.analysis[params.slug],
      },
    },
  };
}
