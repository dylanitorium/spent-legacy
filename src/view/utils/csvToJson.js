const csvToJson = (string, headerConfig = {}) => {
  const filterEmptyRows = r => !!r;
  const replaceHeaders = header => headerConfig[header] || header;

  const rows = string.split('\n').filter(filterEmptyRows);
  const headers = rows.shift().split(',').map(replaceHeaders);

  return rows.map((row) => {
    const columns = row.split(',');
    const record = {};

    columns.forEach((column, index) => {
      record[headers[index]] = column;
    });

    return record;
  });
};