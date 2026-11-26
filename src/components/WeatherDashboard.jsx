import { Container, Row, Col } from "react-bootstrap";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import CurrentWeather from "./CurrentWeather";
import HourlyForecast from "./HourlyForecast";
import AirQuality from "./AirQuality";
import WindPressure from "./WindPressure";
import HumidityUV from "./HumidityUV";
import WeatherMap from "./WeatherMap";
import LoadingSpinner from "./LoadingSpinner";
import ErrorCard from "./ErrorCard";
import { useSelector } from "react-redux";

export default function WeatherDashboard() {
  const loading = useSelector((state) => state.weather.loading);
  const error = useSelector((state) => state.weather.error);
  const isOpen = useSelector((state) => state.sidebar.isOpen);

  return (
    <Container fluid className="py-4">
      <TopBar />

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorCard message={error} />
      ) : (
        <Row className="g-3 align-items-stretch">
          {/* 1. القائمة الجانبية SideBar */}
          {isOpen && (
            <Col sm={12} md={3} lg={3}>
              <div style={{ position: "sticky", top: "20px" }}>
                <SideBar />
              </div>
            </Col>
          )}

          {/* 2. قسم المحتوى الرئيسي Content */}
          <Col sm={12} md={isOpen ? 9 : 12} lg={isOpen ? 9 : 12}>
            <Row className="g-3">
              {/* العمود الأيسر للمحتوى (الطقس الحالي + توقعات الساعات) */}
              <Col xs={12} lg={6} className="d-flex flex-column gap-3">
                <CurrentWeather />
                <div className="flex-grow-1">
                  <HourlyForecast />
                </div>
              </Col>

              {/* العمود الأيمن للمحتوى (مؤشرات الهواء + الرياح والضغط + الخريطة) */}
              <Col xs={12} lg={6} className="d-flex flex-column gap-3">
                <Row className="g-3">
                  <Col xs={12} sm={6}>
                    <AirQuality />
                  </Col>
                  <Col
                    xs={12}
                    sm={6}
                    className="d-flex flex-column justify-content-between gap-3"
                  >
                    <WindPressure />
                    <HumidityUV />
                  </Col>
                </Row>

                {/* الخريطة تأخذ المساحة المتبقية من العمود الأيمن */}
                <div className="flex-grow-1" style={{ minHeight: "260px" }}>
                  <WeatherMap />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </Container>
  );
}
