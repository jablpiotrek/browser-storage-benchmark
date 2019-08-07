import React from 'react';
import PropTypes from 'prop-types';

function Results(props) {
  const { results } = props;
  const resultsTable = results.map(result => (
    <tr key={result.id}>
      <td>{result.id}</td>
      <td>{result.data.driver}</td>
      <td>{result.data.size}</td>
      <td>{result.data.number}</td>
      <td>{result.data.result}</td>
    </tr>
  ));

  function content() {
    if (results.length) {
      return (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Storage provider</th>
              <th>Write/read size</th>
              <th>Number of writes/reads</th>
              <th>Delay</th>
            </tr>
          </thead>
          <tbody>
            {resultsTable}
          </tbody>
        </table>
      );
    }
    return 'No results yet...';
  }
  return (
    <div className="Results">
      {content()}
    </div>
  );
}

Results.propTypes = {
  results: PropTypes.any.isRequired,
};

export default Results;
