import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css'; 

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={6} className="text-center text-md-left">
            <p>&copy; {new Date().getFullYear()} CarTalogo. Todos os direitos reservados.</p>
          </Col>
          <Col md={6} className="text-center text-md-right">
            <a href="/politica-privacidade">Política de Privacidade</a> | <a href="/termos-uso">Termos de Uso</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;