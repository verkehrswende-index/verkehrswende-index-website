import React from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import ProgressProvider from './ProgressProvider';
import 'react-circular-progressbar/dist/styles.css';

export default function Score( { score } ) {
  const percentage = Math.round( score * 100 );
  const color = percentage < 25
  ? 'red'
  : percentage < 50
  ? 'orange'
  : 'green';
  return (
    <div className="analysis-score">
      <ProgressProvider valueStart={0} valueEnd={percentage}>
        {(value) => <CircularProgressbar value={value} text={`${percentage}%`}
                      styles={buildStyles({
                        // Colors
                        pathColor: color,
                      })}
        />}
      </ProgressProvider>
    </div>
  );
};
