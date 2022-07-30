import React from 'react';
import ReactWordcloud, { OptionsProp } from 'react-wordcloud';
import words from '../../shared/utils/words';

const options = {
  colors: ['#768EC8', '#EEBBC3', '#c7c7c7'],
  enableTooltip: false,
  deterministic: true,
  fontFamily: 'impact',
  fontSizes: [40, 100],
  fontWeight: 'normal',
  padding: 1,
  rotations: 2,
  rotationAngles: [0, 90],
  scale: 'sqrt',
  spiral: 'archimedean'
};

export default function WordCloud() {
  return (
    <div className="ml-4 sm:mx-12 md:mx-16">
      <ReactWordcloud options={options} words={words} />
    </div>
  );
}
