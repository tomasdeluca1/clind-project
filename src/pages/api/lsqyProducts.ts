const api_key = process.env.LEMON_SQUEEZY_API_KEY;
const test_api_key = process.env.LEMON_SQUEEZY_TEST_API_KEY;

let lsqyConfig = {
  API_KEY:
    process.env.NEXT_PUBLIC_NODE_ENV === "development" ? test_api_key : api_key,
  URL: "https://api.lemonsqueezy.com/v1",
};

const headers = {
  Accept: "application/vnd.api+json",
  "Content-Type": "application/vnd.api+json",
  Authorization: `Bearer ${lsqyConfig.API_KEY}`,
};

const getProducts = async () => {
  const response = await fetch(`${lsqyConfig.URL}/products`, { headers });
  const data = await response.json();
  return data;
};

export default getProducts;
