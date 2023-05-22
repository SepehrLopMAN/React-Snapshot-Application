import AppComponent from "./components/AppComponent";
import UrlQueryParamsContext from "./context/UrlQueryParams";
import useURLQueryParams from "./hooks/queryParams";
import { brUrlParamHandler, dimensionsLenHandler } from "./services/handlers";

const App = () => {
  const contextValue = useURLQueryParams(
    {
      queryParam: "br",
      callback: brUrlParamHandler,
    },
    {
      queryParam: "w",
      callback: dimensionsLenHandler,
    },
    {
      queryParam: "h",
      callback: dimensionsLenHandler,
    }
  );
  return (
    <UrlQueryParamsContext.Provider value={contextValue}>
      <AppComponent />
    </UrlQueryParamsContext.Provider>
  );
};

export default App;
