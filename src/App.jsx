import { useState, useCallback, useEffect } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { useAirQualityData } from "./hooks/useAirQualityData";
import { useStationMetrics } from "./hooks/useStationMetrics";
import { useLinkCreator } from "./hooks/useLinkCreator";
import AirQualityMap from "./components/AirQualityMap";
import DoughnutChart from "./components/charts/DoughnutChart";
import LineChart from "./components/charts/LineChart";
import BarChart from "./components/charts/BarChart";
import Header from "./components/Header";
import "./App.css";

function App() {
  const { stations, isLoading, error } = useAirQualityData();
  const [selectedStationId, setSelectedStationId] = useState(null);
  const [startDate, setStartDate] = useState("2020-06-18T00:00");
  const [endDate, setEndDate] = useState("2020-06-19T00:00");
  const { apiUrl } = useLinkCreator(selectedStationId, startDate, endDate);
  const { metrics, isLoadingMetrics, errorMetrics } = useStationMetrics(apiUrl);

  const handleStartDateChange = useCallback(
    (newDate) => {
      setStartDate(newDate);
      if (newDate > endDate) {
        setEndDate(newDate);
      }
    },
    [endDate]
  );

  const handleEndDateChange = useCallback((newDate) => {
    setEndDate(newDate);
  }, []);

  return (
    <div className="d-flex flex-column vh-100 p-0">
      <Header
        stations={stations}
        isLoading={isLoading}
        error={error}
        setSelectedStationId={setSelectedStationId}
        selectedStationId={selectedStationId}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
      />
      <Container fluid className="flex-grow-1 p-2">
        <Row className="h-100">
          <Col md={8} className="h-100 d-flex flex-column">
            <div
              id="map"
              className="flex-grow-1 border rounded shadow-sm p-0 mb-2"
              style={{ minHeight: "30vh" }}
            >
              <AirQualityMap
                stations={stations}
                selectedStationId={selectedStationId}
                setSelectedStationId={setSelectedStationId}
              />
            </div>
          </Col>

          <Col md={4} className="h-100 d-flex flex-column">
            <div className="d-flex flex-column h-100">
              {isLoadingMetrics && (
                <div className="flex-fill border rounded shadow-sm p-2 mb-2 text-center">
                  <Spinner animation="border" size="sm" /> Veriler Yükleniyor...
                </div>
              )}
              {errorMetrics && (
                <Alert variant="danger" className="flex-fill">
                  Grafik Verisi Hatası: {errorMetrics.message}
                </Alert>
              )}
              {!isLoadingMetrics && !errorMetrics && metrics && (
                <>
                  {/* Grafik 1: Bar Chart */}
                  <div className="flex-fill border rounded shadow-sm p-2 mb-2 bg-white">
                    <BarChart averageMetrics={metrics.averageMetrics} />
                  </div>

                  {/* Grafik 2: Doughnut Chart */}
                  <div className="flex-fill border rounded shadow-sm p-2 mb-2 bg-white">
                    <DoughnutChart
                      contaminantCounts={metrics.contaminantCounts}
                    />
                  </div>

                  {/* Grafik 3: Line Chart */}
                  <div className="flex-fill border rounded shadow-sm p-2 bg-white">
                    <LineChart timeSeries={metrics.timeSeries} />
                  </div>
                </>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
