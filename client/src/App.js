import CountryChart from "./Components/CountryChart";
import IntensityChart from "./Components/IntensityChart";
import LikelihoodChart from "./Components/LikelihoodChart";
import LikelyIntesityRelevance from "./Components/LikelyIntesityRelevance";
import RegionChart from "./Components/RegionChart";
import TopicChart from "./Components/TopicChart";
import YearChart from "./Components/YearChart";
import "./App.css";
import StartYearChart from "./Components/StartYearChart";
import { useEffect, useState } from "react";
function App() {
  const [loading, setLoading] = useState(false);
  const [datas, setData] = useState([]);
  const [data, setDatas] = useState([]);
  const [year, setYear] = useState([]);
  const [topic, setTopic] = useState([]);
  const [sector, setSector] = useState([]);
  const [region, setRegion] = useState([]);
  const [source, setSource] = useState([]);
  const [pest, setPest] = useState([]);
  const [country, setCountry] = useState([]);

  //Filter Values
  function findSource() {
    const filteredData = data.filter((item) => item.source !== "");

    const sourceCounts = filteredData.reduce((counts, entry) => {
      const source = entry.source.toString();
      counts[source] = (counts[source] || 0) + 1;
      return counts;
    }, {});
    setSource(Object.keys(sourceCounts));
  }
  function findPest() {
    const filteredData = data.filter((item) => item.pestle !== "");

    const pestleCounts = filteredData.reduce((counts, entry) => {
      const pestle = entry.pestle.toString();
      counts[pestle] = (counts[pestle] || 0) + 1;
      return counts;
    }, {});
    setPest(Object.keys(pestleCounts));
  }
  function findYear() {
    const filteredData = data.filter((entry) => entry.end_year);
    // Count occurrences of each end_year value
    const counts = filteredData.reduce((acc, entry) => {
      const year = entry.end_year.toString();
      acc[year] = (acc[year] || 0) + 1;
      return acc;
    }, {});
    setYear(Object.keys(counts));
  }
  function findTopic() {
    const filteredData = data.filter((entry) => entry.topic !== "");

    const counts = filteredData.reduce((acc, entry) => {
      const topic = entry.topic.toString();
      acc[topic] = (acc[topic] || 0) + 1;
      return acc;
    }, {});
    setTopic(Object.keys(counts));
  }
  function findSector() {
    const filterSector = data.filter((entry) => entry.sector);
    const Intensity = filterSector.reduce((max, item) => {
      const sector = item.sector;
      max[sector] = (max[sector] || 0) + 1;
      return max;
    }, {});
    setSector(Object.keys(Intensity));
  }
  function findRegion() {
    const filteredData = data.filter((item) => item.region !== "");

    const regionCounts = filteredData.reduce((counts, entry) => {
      const region = entry.region.toString();
      counts[region] = (counts[region] || 0) + 1;
      return counts;
    }, {});
    setRegion(Object.keys(regionCounts));
  }
  function findCountry() {
    const filteredData = data.filter((item) => item.country !== "");

    const countryCounts = filteredData.reduce((counts, entry) => {
      const country = entry.country.toString();
      counts[country] = (counts[country] || 0) + 1;
      return counts;
    }, {});
    setCountry(Object.keys(countryCounts));
  }

  // Filters
  function filterEndYear(year) {
    if (year === "") {
      setData(data);
    } else {
      const filteredData = data.filter((item) => item.end_year == year);
      setData(filteredData);
    }
  }
  function filterTopic(topic) {
    if (topic === "") {
      setData(data);
    } else {
      const filteredData = data.filter((item) => item.topic === topic);
      setData(filteredData);
    }
  }
  function filterSector(sector) {
    if (sector === "") {
      setData(data);
    } else {
      const filteredData = data.filter((item) => item.sector === sector);
      setData(filteredData);
    }
  }
  function filterRegion(region) {
    if (region === "") {
      setData(data);
    } else {
      const filteredData = data.filter((item) => item.region === region);
      setData(filteredData);
    }
  }
  function filterSource(source) {
    if (source === "") {
      setData(data);
    } else {
      const filteredData = data.filter((item) => item.source === source);
      setData(filteredData);
    }
  }
  function filterPEST(pest) {
    if (pest === "") {
      setData(data);
    } else {
      const filteredData = data.filter((item) => item.pestle === pest);
      console.log("pest", filteredData);
      setData(filteredData);
    }
  }
  function filterCountry(country) {
    if (country === "") {
      setData(data);
    } else {
      const filteredData = data.filter((item) => item.country === country);
      setData(filteredData);
    }
  }

  function getJsonData() {
    setLoading(true);
    fetch("https://chartjs-data.onrender.com/")
      // fetch("http://localhost:8080/")
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        setData(res);
        setDatas(res);
        
      })
      .catch((error) => {
        setLoading(false);
        console.log("server error", error);
      });
  }

  useEffect(() => {
    getJsonData();
  }, []);

  useEffect(()=>{
    findSource();
    findPest();
    findYear();
    findTopic();
    findSector();
    findRegion();
    findCountry();
  },[data])

  return (
    <div>
      <nav className="nav">
        <span id="year">
          <label>End Year: </label>
          <select
            name="end year"
            onChange={(e) => filterEndYear(e.target.value)}
          >
            <option value="">All</option>
            {year.map((ele, i) => (
              <option key={i} value={ele}>
                {ele}
              </option>
            ))}
          </select>
        </span>

        <span id="topic">
          <label>Topic: </label>
          <select name="topic" onChange={(e) => filterTopic(e.target.value)}>
            <option value="">All</option>
            {topic.map((ele, i) => (
              <option key={i} value={ele}>
                {ele}
              </option>
            ))}
          </select>
        </span>

        <span id="sector">
          <label>Sector: </label>
          <select name="sector" onChange={(e) => filterSector(e.target.value)}>
            <option value="">All</option>
            {sector.map((ele, i) => (
              <option key={i} value={ele}>
                {ele}
              </option>
            ))}
          </select>
        </span>

        <span id="region ">
          <label>Region : </label>
          <select name="region " onChange={(e) => filterRegion(e.target.value)}>
            <option value="">All</option>
            {region.map((ele, i) => (
              <option key={i} value={ele}>
                {ele}
              </option>
            ))}
          </select>
        </span>

        <span id="pest">
          <label>PEST : </label>
          <select name="pest" onChange={(e) => filterPEST(e.target.value)}>
            <option value="">All</option>
            {pest.map((ele, i) => (
              <option key={i} value={ele}>
                {ele}
              </option>
            ))}
          </select>
        </span>

        <span id="country">
          <label>Country : </label>
          <select
            name="country"
            onChange={(e) => filterCountry(e.target.value)}
          >
            <option value="">All</option>
            {country.map((ele, i) => (
              <option key={i} value={ele}>
                {ele}
              </option>
            ))}
          </select>
        </span>
        <span id="source">
          <label>Source : </label>
          <select name="source" onChange={(e) => filterSource(e.target.value)}>
            <option value="">All</option>
            {source.map((ele, i) => (
              <option key={i} value={ele}>
                {ele}
              </option>
            ))}
          </select>
        </span>
      </nav>
      {loading ? (
        <div style={{ textAlign: "center" }}>
          <h2>Loading...</h2>
        </div>
      ) : (
        <div className="App">
          <div>
            <IntensityChart jsonData={datas} />
          </div>
          <div>
            <YearChart jsonData={datas} />
          </div>
          <div>
            <StartYearChart jsonData={datas} />
          </div>
          <div>
            <LikelihoodChart jsonData={datas} />
          </div>
          <div>
            <LikelyIntesityRelevance jsonData={datas} />
          </div>
          <div>
            <TopicChart jsonData={datas} />
          </div>
          <div>
            <CountryChart jsonData={datas} />
          </div>
          <div>
            <RegionChart jsonData={datas} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
