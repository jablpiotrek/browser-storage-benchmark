import React from 'react';
import PropTypes from 'prop-types';

function Results(props) {
  const { results, handleDeleteResult } = props;
  const resultsTable = results.map(result => (
    <tr key={result.id}>
      <td>{result.id}</td>
      <td>{result.data.driver}</td>
      <td>{result.data.size}</td>
      <td>{result.data.number}</td>
      <td>{result.data.result}</td>
      <td>
        <button
          type="button"
          onClick={() => { handleDeleteResult(result.id); }}
        >
          Delete
        </button>
      </td>
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
              <th />
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
  results: PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.shape({
      driver: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
      size: PropTypes.number.isRequired,
      result: PropTypes.number.isRequired,
    }).isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
  handleDeleteResult: PropTypes.func.isRequired,
};

export default Results;
