import { Alert, Button, Row, Col } from "react-bootstrap";
import Link from "next/link";
import Score from "../analysis/score.js";
import styles from "./style.module.scss";

export default function AnalysisPreview({ area, slug, results, results1y, title }) {
  return (
    <div className={styles['analysis-preview']}>
      <>
        <h3>
          <Link href={`/gebiete/${area}/analysen/${slug}`}>
            {title}
          </Link>
        </h3>
        <Score showMaxScore={true} score={results.score} oldScore={results1y.score} />
      </>
    </div>
  );
}
