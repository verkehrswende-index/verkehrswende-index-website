import React from "react";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import ProgressProvider from "./ProgressProvider";
import Trend from "../trend";
import "react-circular-progressbar/dist/styles.css";

export default function Score({ score, oldScore }) {
  const percentage = Math.round(score * 100);
  const color = percentage < 45 ? "red" : percentage < 55 ? "orange" : "green";

  return (
    <div className="analysis-score">
      <ProgressProvider valueStart={0} valueEnd={percentage}>
        {(value) => (
          <CircularProgressbarWithChildren
            value={value}
            styles={buildStyles({
              // Colors
              pathColor: color,
            })}
          >
            <span className="font-weight-bold">{`${percentage}%`}</span>
            { oldScore && (
                <>
                  <br />
                  <Trend oldValue={oldScore} value={score} />
                </>
            ) }
          </CircularProgressbarWithChildren>
        )}
      </ProgressProvider>
    </div>
  );
}
