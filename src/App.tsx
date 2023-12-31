import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ThemeProvider from "./components/darkmode/themeprovider";
import { NavigationBar } from "./components/navigationbar/navigationbar";
import { ROUTES } from "./config";
import { CaseInfo } from "./pages/caseinfo/caseinfo";
import { Charts } from "./pages/charts/charts";
import { Dashboard } from "./pages/dashboard/dashboard";
import { NewCase } from "./pages/newcase/newcase";

export const App: React.FC = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const NavigationColStyle: React.CSSProperties = {
    backgroundColor: "#00205B",
    overflowY: isMobile ? "auto" : "initial",
    position: isMobile ? "static" : "fixed",
    top: isMobile ? "auto" : 0,
    bottom: isMobile ? "auto" : 0,
  };

  const PageColStyle: React.CSSProperties = {
    marginLeft: isMobile ? 0 : "8%",
    overflowY: "auto",
  };

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Container fluid>
          <Row>
            <Col sm={1} style={NavigationColStyle}>
              <NavigationBar />
            </Col>
            <Col sm={11} style={PageColStyle}>
              <Routes>
                <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
                <Route path={ROUTES.NEWCASE} element={<NewCase />} />
                <Route path={ROUTES.CASEINFO} element={<CaseInfo />} />
                <Route path={ROUTES.CHARTS} element={<Charts />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
};
