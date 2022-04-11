import React, { useState } from 'react';

const Question = (props) => {

  const { questiontext, varname, onSubmit } = props;

  const options = JSON.parse(JSON.stringify(props));
  delete options.questiontext;
  delete options.scaletype;
  delete options.surveyname;
  delete options.varname;

  const [opt, setOpt] = useState('');
  const [startTime, setTime] = useState(new Date().getTime());

  const onClick = () => {
    if(opt) {
      const duration = Math.round((new Date().getTime() - startTime) / 1000);
      onSubmit(questiontext, varname, options[opt], duration);
    }
  }

  return (
    <div className="container">
      <div className='mb-3'>{questiontext}</div>
      {
        options && Object.keys(options).map((v, idx) => <div key={options[v]}>
          <label className="form-check-label" htmlFor={`question-${varname}-${idx}`}>
            <input className="form-check-input" type="radio" id={`question-${varname}-${idx}`} checked={opt == v} onChange={() => setOpt(v)} />&nbsp;
            {options[v]}
          </label>
        </div>
        )
      }
      <button className='btn btn-secondary mt-3' onClick={onClick}>Submit</button>
    </div>
  );
};

export default Question;