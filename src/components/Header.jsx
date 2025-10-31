import React from "react";
import { Form, Navbar, Container, Spinner, Alert, Nav } from "react-bootstrap";

const Header = ({
  stations,
  isLoading,
  error,
  setSelectedStationId,
  selectedStationId,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  const handleStationChange = (event) => {
    setSelectedStationId(event.target.value);
  };
  React.useEffect(() => {
    if (!selectedStationId && stations.length > 0) {
      setSelectedStationId(stations[0].id);
    }
  }, [stations, selectedStationId, setSelectedStationId]);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container fluid>
        <Navbar.Brand href="#" className="fw-bold me-4">
          Air Quality Management Portal
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Form.Group className="d-flex align-items-center me-4 my-2 my-lg-0">
              <Form.Label
                className="text-light me-2 mb-0"
                htmlFor="stationList"
              >
                İstasyon:
              </Form.Label>
              <Form.Select
                id="stationList"
                value={selectedStationId || ""}
                onChange={handleStationChange}
                disabled={isLoading}
                style={{ width: "180px" }}
              >
                {isLoading && <option>Yükleniyor...</option>}
                {error && <option disabled>Hata: Veri çekilemedi</option>}

                {!isLoading &&
                  stations.map((station) => (
                    <option key={station.id} value={station.id}>
                      {station.name}
                    </option>
                  ))}
              </Form.Select>
              {isLoading && (
                <Spinner
                  animation="border"
                  size="sm"
                  variant="light"
                  className="ms-2"
                />
              )}
            </Form.Group>

            <Form.Group className="d-flex align-items-center me-4 my-2 my-lg-0">
              <Form.Label className="text-light me-2 mb-0" htmlFor="start-date">
                Başlangıç:
              </Form.Label>
              <Form.Control
                type="datetime-local"
                id="start-date"
                name="start-date"
                value={startDate}
                onChange={(e) => onStartDateChange(e.target.value)}
                max="2020-06-19T00:00"
                style={{ width: "220px" }}
              />
            </Form.Group>

            <Form.Group className="d-flex align-items-center my-2 my-lg-0">
              <Form.Label className="text-light me-2 mb-0" htmlFor="end-date">
                Bitiş:
              </Form.Label>
              <Form.Control
                type="datetime-local"
                id="end-date"
                name="end-date"
                value={endDate}
                onChange={(e) => onEndDateChange(e.target.value)}
                max="2020-06-19T00:00"
                min={startDate}
                style={{ width: "220px" }}
              />
            </Form.Group>
          </Nav>
        </Navbar.Collapse>

        {error && (
          <Alert variant="danger" className="p-1 mb-0 ms-3">
            Veri yükleme hatası!
          </Alert>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
