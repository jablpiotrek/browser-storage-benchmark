import React from 'react';
import PropTypes from 'prop-types';

function Results(props) {
  const { results, handleDeleteResult } = props;
  const resultsTable = results.map(result => (
    <tr
      key={result.id}
      className="results__table-row"
    >
      <td className="results__table-cell">{result.id}</td>
      <td className="results__table-cell">{result.data.driver}</td>
      <td className="results__table-cell">{result.data.size}</td>
      <td className="results__table-cell">{result.data.number}</td>
      <td className="results__table-cell">{result.data.result}</td>
      <td className="results__table-cell">
        <button
          type="button"
          onClick={() => { handleDeleteResult(result.id); }}
          className="results__delete-button"
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  function content() {
    if (results.length) {
      return (
        <table className="results__table">
          <thead className="results__table-header">
            <tr className="results__table-row">
              <th className="results__table-cell">ID</th>
              <th className="results__table-cell">Storage provider</th>
              <th className="results__table-cell">Single write/read length</th>
              <th className="results__table-cell">Number of writes/reads</th>
              <th className="results__table-cell">Delay time [ms]</th>
              <th className="results__table-cell" />
            </tr>
          </thead>
          <tbody>
            {resultsTable}
          </tbody>
        </table>
      );
    }
    return (
      <p>No results</p>
    );
  }
  return (
    <div className="results">
      <h3>Results</h3>
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
