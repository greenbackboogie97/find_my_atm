import axios from 'axios';

const getAllATMS = async (page) => {
  const data = await axios.post(
    `https://data.gov.il/api/3/action/datastore_search?resource_id=b9d690de-0a9c-45ef-9ced-3e5957776b26&offset=${
      page * 100
    }`
  );

  return data.data.result.records;
};

const getATMsByCity = async (city) => {
  const data = await axios.post(
    `https://data.gov.il/api/3/action/datastore_search?resource_id=b9d690de-0a9c-45ef-9ced-3e5957776b26&q=${city}&limit=500`
  );

  return data.data.result.records;
};

export { getAllATMS, getATMsByCity };
