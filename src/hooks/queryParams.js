function useURLQueryParams(...params) {
  const paramsObj = {};
  const UrlQueryParams = new URLSearchParams(document.location.search);
  params.forEach(({ queryParam, callback }) => {
    paramsObj[`${queryParam}`] =
      (callback && callback(UrlQueryParams?.get(queryParam))) || null;
  });

  return paramsObj;
}

export default useURLQueryParams;
