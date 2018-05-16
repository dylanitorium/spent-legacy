const defaultHeaderConfig = {
  row: 0,
  schema: {}
};

const csvToJson = (string, headerConfig = defaultHeaderConfig) => {
  const whereNotEmpty = r => !!r;
  const replaceHeaders = header => headerConfig.schema[header];

  const rows = string.split('\n').filter(whereNotEmpty).slice(headerConfig.row);
  const headers = rows.shift().split(',').map(replaceHeaders);

  return rows.map((row) => {
    const columns = row.split(',');
    const record = {};

    columns.forEach((column, index) => {
      const key = headers[index];
      if (key) record[key] = column;
    });

    return record;
  });
};

export default csvToJson;